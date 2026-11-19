import {
    dbProyectos,
    dbClientes,
    dbUsuarios,
    dbEstadoProyectos,
    generarSiguienteId
} from "./almacenMemoria";

/**
 * Enriquecimiento interno de un proyecto con los nombres legibles
 * de su cliente, supervisor y estado actual.
 *
 * @param {Object} proyecto - Registro crudo de dbProyectos.
 * @returns {Object} Proyecto formateado para tablas y tarjetas.
 */
const formatearProyecto = (proyecto) => {
    const cliente = dbClientes.find((c) => c.id === proyecto.clienteId);
    const supervisor = dbUsuarios.find((u) => u.id === proyecto.supervisorId);
    const estado = dbEstadoProyectos.find((est) => est.id === proyecto.estadoId);

    return {
        ...proyecto,
        nombreCliente: cliente ? cliente.nombre : "Sin cliente",
        nombreSupervisor: supervisor ? supervisor.nombre : "Sin supervisor",
        nombreEstado: estado ? estado.nombre : "Sin estado"
    };
};

/**
 * Retorna la lista completa de proyectos registrados.
 *
 * @returns {Array<Object>} Proyectos enriquecidos.
 */
export const obtenerProyectos = () => {
    return dbProyectos.map((proyecto) => formatearProyecto(proyecto));
};

/**
 * Retorna los proyectos asignados a un supervisor específico.
 *
 * @param {string} supervisorId - ID del usuario supervisor (ej. "Usr_2").
 * @returns {Array<Object>} Proyectos filtrados y enriquecidos.
 */
export const obtenerProyectosPorSupervisor = (supervisorId) => {
    return dbProyectos
        .filter((p) => p.supervisorId === supervisorId)
        .map((proyecto) => formatearProyecto(proyecto));
};

/**
 * Crea un nuevo proyecto en memoria.
 *
 * @param {Object} datos - Datos del proyecto a registrar.
 * @returns {Object} Resultado { exito, proyecto, mensaje }.
 */
export const crearProyecto = (datos) => {
    const nombreLimpio = datos.nombre ? datos.nombre.trim() : "";

    if (!nombreLimpio || !datos.clienteId || !datos.supervisorId) {
        return {
            exito: false,
            proyecto: null,
            mensaje: "El nombre del proyecto, el cliente y el supervisor son obligatorios."
        };
    }

    const nuevoProyecto = {
        id: generarSiguienteId(dbProyectos, "pro"),
        nombre: nombreLimpio,
        descripcion: datos.descripcion ? datos.descripcion.trim() : "",
        fechaInicio: datos.fechaInicio || "",
        fechaFinEstimada: datos.fechaFinEstimada || "",
        clienteId: datos.clienteId,
        supervisorId: datos.supervisorId,
        estadoId: datos.estadoId || "EstPro_2"
    };

    dbProyectos.push(nuevoProyecto);

    return {
        exito: true,
        proyecto: formatearProyecto(nuevoProyecto),
        mensaje: "Proyecto creado correctamente."
    };
};

/**
 * Actualiza la información de un proyecto existente.
 *
 * @param {string} id - Identificador del proyecto (ej. "pro_1").
 * @param {Object} datos - Campos modificados.
 * @returns {Object} Resultado { exito, proyecto, mensaje }.
 */
export const actualizarProyecto = (id, datos) => {
    const indice = dbProyectos.findIndex((p) => p.id === id);
    if (indice === -1) {
        return {
            exito: false,
            proyecto: null,
            mensaje: "Proyecto no encontrado."
        };
    }

    const actual = dbProyectos[indice];

    dbProyectos[indice] = {
        ...actual,
        nombre: datos.nombre !== undefined ? datos.nombre.trim() : actual.nombre,
        descripcion: datos.descripcion !== undefined ? datos.descripcion.trim() : actual.descripcion,
        fechaInicio: datos.fechaInicio !== undefined ? datos.fechaInicio : actual.fechaInicio,
        fechaFinEstimada: datos.fechaFinEstimada !== undefined ? datos.fechaFinEstimada : actual.fechaFinEstimada,
        clienteId: datos.clienteId !== undefined ? datos.clienteId : actual.clienteId,
        supervisorId: datos.supervisorId !== undefined ? datos.supervisorId : actual.supervisorId,
        estadoId: datos.estadoId !== undefined ? datos.estadoId : actual.estadoId
    };

    return {
        exito: true,
        proyecto: formatearProyecto(dbProyectos[indice]),
        mensaje: "Proyecto actualizado correctamente."
    };
};

/**
 * Elimina un proyecto de la colección en memoria.
 *
 * @param {string} id - Identificador del proyecto.
 * @returns {Object} Resultado { exito, mensaje }.
 */
export const eliminarProyecto = (id) => {
    const indice = dbProyectos.findIndex((p) => p.id === id);
    if (indice === -1) {
        return {
            exito: false,
            mensaje: "Proyecto no encontrado."
        };
    }

    dbProyectos.splice(indice, 1);

    return {
        exito: true,
        mensaje: "Proyecto eliminado correctamente."
    };
};