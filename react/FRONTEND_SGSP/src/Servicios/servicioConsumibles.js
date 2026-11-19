import {
    dbTareas,
    dbProyectos,
    dbUsuarios,
    dbEstadoTareas,
    generarSiguienteId,
    obtenerFechaHoy
} from "./almacenMemoria";

/**
 * Enriquecimiento interno de una tarea con los nombres del proyecto,
 * empleado responsable y estado.
 *
 * @param {Object} tarea - Registro crudo de dbTareas.
 * @returns {Object} Tarea formateada.
 */
const formatearTarea = (tarea) => {
    const proyecto = dbProyectos.find((p) => p.id === tarea.proyectoId);
    const empleado = dbUsuarios.find((u) => u.id === tarea.empleadoId);
    const estado = dbEstadoTareas.find((est) => est.id === tarea.estadoId);

    return {
        ...tarea,
        nombreProyecto: proyecto ? proyecto.nombre : "Sin proyecto",
        nombreEmpleado: empleado ? empleado.nombre : "Sin asignar",
        nombreEstado: estado ? estado.nombre : "Sin estado"
    };
};

/**
 * Retorna todas las tareas registradas.
 *
 * @returns {Array<Object>} Lista de tareas enriquecidas.
 */
export const obtenerTareas = () => {
    return dbTareas.map((tarea) => formatearTarea(tarea));
};

/**
 * Filtra las tareas pertenecientes a un proyecto específico.
 *
 * @param {string} proyectoId - ID del proyecto (ej. "pro_1").
 * @returns {Array<Object>} Tareas del proyecto.
 */
export const obtenerTareasPorProyecto = (proyectoId) => {
    return dbTareas
        .filter((t) => t.proyectoId === proyectoId)
        .map((tarea) => formatearTarea(tarea));
};

/**
 * Filtra las tareas asignadas a un empleado específico.
 *
 * @param {string} empleadoId - ID del empleado (ej. "Usr_3").
 * @returns {Array<Object>} Tareas del empleado.
 */
export const obtenerTareasPorEmpleado = (empleadoId) => {
    return dbTareas
        .filter((t) => t.empleadoId === empleadoId)
        .map((tarea) => formatearTarea(tarea));
};

/**
 * Crea una nueva tarea con fecha de creación automática y estado inicial Pendiente ("EstTar_3").
 *
 * @param {Object} datos - Datos de la tarea.
 * @returns {Object} Resultado { exito, tarea, mensaje }.
 */
export const crearTarea = (datos) => {
    const nombreLimpio = datos.nombre ? datos.nombre.trim() : "";

    if (!nombreLimpio || !datos.proyectoId || !datos.empleadoId) {
        return {
            exito: false,
            tarea: null,
            mensaje: "El nombre de la tarea, el proyecto y el empleado son obligatorios."
        };
    }

    const estadoInicial = datos.estadoId || "EstTar_3";

    const nuevaTarea = {
        id: generarSiguienteId(dbTareas, "tar"),
        nombre: nombreLimpio,
        descripcion: datos.descripcion ? datos.descripcion.trim() : "",
        fechaCreacion: obtenerFechaHoy(),
        fechaFinalizacion: estadoInicial === "EstTar_1" ? obtenerFechaHoy() : "",
        proyectoId: datos.proyectoId,
        empleadoId: datos.empleadoId,
        estadoId: estadoInicial
    };

    dbTareas.push(nuevaTarea);

    return {
        exito: true,
        tarea: formatearTarea(nuevaTarea),
        mensaje: "Tarea creada correctamente."
    };
};

/**
 * Actualiza una tarea existente y gestiona automáticamente fechaFinalizacion
 * según si pasa a Completada ("EstTar_1") o regresa a otro estado.
 *
 * @param {string} id - Identificador de la tarea (ej. "tar_1").
 * @param {Object} datos - Campos actualizados.
 * @returns {Object} Resultado { exito, tarea, mensaje }.
 */
export const actualizarTarea = (id, datos) => {
    const indice = dbTareas.findIndex((t) => t.id === id);
    if (indice === -1) {
        return {
            exito: false,
            tarea: null,
            mensaje: "Tarea no encontrada."
        };
    }

    const actual = dbTareas[indice];
    const nuevoEstadoId = datos.estadoId !== undefined ? datos.estadoId : actual.estadoId;

    let nuevaFechaFinalizacion = actual.fechaFinalizacion;
    if (nuevoEstadoId === "EstTar_1" && actual.estadoId !== "EstTar_1") {
        nuevaFechaFinalizacion = obtenerFechaHoy();
    } else if (nuevoEstadoId !== "EstTar_1") {
        nuevaFechaFinalizacion = "";
    }

    dbTareas[indice] = {
        ...actual,
        nombre: datos.nombre !== undefined ? datos.nombre.trim() : actual.nombre,
        descripcion: datos.descripcion !== undefined ? datos.descripcion.trim() : actual.descripcion,
        fechaFinalizacion: nuevaFechaFinalizacion,
        proyectoId: datos.proyectoId !== undefined ? datos.proyectoId : actual.proyectoId,
        empleadoId: datos.empleadoId !== undefined ? datos.empleadoId : actual.empleadoId,
        estadoId: nuevoEstadoId
    };

    return {
        exito: true,
        tarea: formatearTarea(dbTareas[indice]),
        mensaje: "Tarea actualizada correctamente."
    };
};

/**
 * Elimina una tarea de la colección en memoria.
 *
 * @param {string} id - Identificador de la tarea.
 * @returns {Object} Resultado { exito, mensaje }.
 */
export const eliminarTarea = (id) => {
    const indice = dbTareas.findIndex((t) => t.id === id);
    if (indice === -1) {
        return {
            exito: false,
            mensaje: "Tarea no encontrada."
        };
    }

    dbTareas.splice(indice, 1);

    return {
        exito: true,
        mensaje: "Tarea eliminada correctamente."
    };
};