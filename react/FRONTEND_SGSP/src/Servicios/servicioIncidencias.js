import {
    dbIncidencias,
    dbProyectos,
    dbUsuarios,
    generarSiguienteId,
    obtenerFechaHoy
} from "./almacenMemoria";

/**
 * Enriquecimiento interno de una incidencia con el nombre del proyecto
 * y del usuario que realizó el reporte.
 *
 * @param {Object} incidencia - Registro crudo de dbIncidencias.
 * @returns {Object} Incidencia formateada.
 */
const formatearIncidencia = (incidencia) => {
    const proyecto = dbProyectos.find((p) => p.id === incidencia.proyectoId);
    const usuario = dbUsuarios.find((u) => u.id === incidencia.usuarioId);

    return {
        ...incidencia,
        nombreProyecto: proyecto ? proyecto.nombre : "Sin proyecto",
        nombreUsuario: usuario ? usuario.nombre : "Usuario desconocido"
    };
};

/**
 * Retorna todas las incidencias registradas en el sistema.
 *
 * @returns {Array<Object>} Incidencias enriquecidas.
 */
export const obtenerIncidencias = () => {
    return dbIncidencias.map((inc) => formatearIncidencia(inc));
};

/**
 * Retorna las incidencias asociadas a un proyecto específico.
 *
 * @param {string} proyectoId - ID del proyecto.
 * @returns {Array<Object>} Incidencias del proyecto.
 */
export const obtenerIncidenciasPorProyecto = (proyectoId) => {
    return dbIncidencias
        .filter((inc) => inc.proyectoId === proyectoId)
        .map((inc) => formatearIncidencia(inc));
};

/**
 * Registra una nueva incidencia validando que el usuario que reporta
 * tenga rol de Administrador ("Rol_1") o Supervisor ("Rol_2").
 *
 * @param {Object} datos - Objeto con { titulo, descripcion, proyectoId, usuarioId }.
 * @returns {Object} Resultado { exito, incidencia, mensaje }.
 */
export const crearIncidencia = (datos) => {
    const tituloLimpio = datos.titulo ? datos.titulo.trim() : "";

    if (!tituloLimpio || !datos.proyectoId || !datos.usuarioId) {
        return {
            exito: false,
            incidencia: null,
            mensaje: "El título, el proyecto y el usuario que reporta son obligatorios."
        };
    }

    const usuarioReporta = dbUsuarios.find((u) => u.id === datos.usuarioId);
    if (!usuarioReporta) {
        return {
            exito: false,
            incidencia: null,
            mensaje: "El usuario que intenta registrar la incidencia no existe."
        };
    }

    if (usuarioReporta.rolId !== "Rol_1" && usuarioReporta.rolId !== "Rol_2") {
        return {
            exito: false,
            incidencia: null,
            mensaje: "Solo los Administradores y Supervisores pueden registrar incidencias."
        };
    }

    const nuevaIncidencia = {
        id: generarSiguienteId(dbIncidencias, "inc"),
        titulo: tituloLimpio,
        descripcion: datos.descripcion ? datos.descripcion.trim() : "",
        fecha: obtenerFechaHoy(),
        proyectoId: datos.proyectoId,
        usuarioId: datos.usuarioId
    };

    dbIncidencias.push(nuevaIncidencia);

    return {
        exito: true,
        incidencia: formatearIncidencia(nuevaIncidencia),
        mensaje: "Incidencia registrada correctamente."
    };
};

/**
 * Actualiza el título o la descripción de una incidencia existente.
 *
 * @param {string} id - Identificador de la incidencia (ej. "inc_1").
 * @param {Object} datos - Campos modificados.
 * @returns {Object} Resultado { exito, incidencia, mensaje }.
 */
export const actualizarIncidencia = (id, datos) => {
    const indice = dbIncidencias.findIndex((inc) => inc.id === id);
    if (indice === -1) {
        return {
            exito: false,
            incidencia: null,
            mensaje: "Incidencia no encontrada."
        };
    }

    const actual = dbIncidencias[indice];

    dbIncidencias[indice] = {
        ...actual,
        titulo: datos.titulo !== undefined ? datos.titulo.trim() : actual.titulo,
        descripcion: datos.descripcion !== undefined ? datos.descripcion.trim() : actual.descripcion,
        proyectoId: datos.proyectoId !== undefined ? datos.proyectoId : actual.proyectoId
    };

    return {
        exito: true,
        incidencia: formatearIncidencia(dbIncidencias[indice]),
        mensaje: "Incidencia actualizada correctamente."
    };
};

/**
 * Elimina una incidencia de la colección en memoria.
 *
 * @param {string} id - Identificador de la incidencia.
 * @returns {Object} Resultado { exito, mensaje }.
 */
export const eliminarIncidencia = (id) => {
    const indice = dbIncidencias.findIndex((inc) => inc.id === id);
    if (indice === -1) {
        return {
            exito: false,
            mensaje: "Incidencia no encontrada."
        };
    }

    dbIncidencias.splice(indice, 1);

    return {
        exito: true,
        mensaje: "Incidencia eliminada correctamente."
    };
};