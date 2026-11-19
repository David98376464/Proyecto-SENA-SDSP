import {
    dbUsuarios,
    dbRoles,
    dbEspecialidades,
    dbEstadoUsuarios,
    generarSiguienteId
} from "./almacenMemoria";

/**
 * Función auxiliar interna que enriquece un objeto usuario con los nombres
 * de su rol, especialidad y estado, eliminando la contraseña por seguridad.
 *
 * @param {Object} usuario - Registro crudo de dbUsuarios.
 * @returns {Object} Usuario limpio y enriquecido para la vista.
 */
const formatearUsuario = (usuario) => {
    const rol = dbRoles.find((r) => r.id === usuario.rolId);
    const especialidad = dbEspecialidades.find((e) => e.id === usuario.especialidadId);
    const estado = dbEstadoUsuarios.find((est) => est.id === usuario.estadoId);

    const { password: _, ...usuarioSinPassword } = usuario;

    return {
        ...usuarioSinPassword,
        nombreRol: rol ? rol.nombre : "Sin rol",
        nombreEspecialidad: especialidad ? especialidad.nombre : "General",
        nombreEstado: estado ? estado.nombre : "Sin estado"
    };
};

/**
 * Retorna todos los usuarios registrados en el sistema (sin contraseñas)
 * con los nombres legibles de sus llaves foráneas.
 *
 * @returns {Array<Object>} Lista completa de usuarios formateados.
 */
export const obtenerUsuarios = () => {
    return dbUsuarios.map((usuario) => formatearUsuario(usuario));
};

/**
 * Registra un nuevo usuario validando que el correo y el documento no estén duplicados.
 *
 * @param {Object} datos - Datos del formulario de creación de usuario.
 * @returns {Object} Resultado { exito, usuario, mensaje }.
 */
export const crearUsuario = (datos) => {
    const correoLimpio = datos.correo ? datos.correo.trim().toLowerCase() : "";
    const documentoLimpio = datos.documento ? datos.documento.trim() : "";

    if (!datos.nombre || !correoLimpio || !documentoLimpio || !datos.rolId) {
        return {
            exito: false,
            usuario: null,
            mensaje: "Nombre, documento, correo y rol son obligatorios."
        };
    }

    const correoDuplicado = dbUsuarios.some(
        (u) => u.correo.toLowerCase() === correoLimpio
    );
    if (correoDuplicado) {
        return {
            exito: false,
            usuario: null,
            mensaje: "Ya existe un usuario registrado con ese correo."
        };
    }

    const documentoDuplicado = dbUsuarios.some(
        (u) => u.documento === documentoLimpio
    );
    if (documentoDuplicado) {
        return {
            exito: false,
            usuario: null,
            mensaje: "Ya existe un usuario registrado con ese documento."
        };
    }

    const nuevoUsuario = {
        id: generarSiguienteId(dbUsuarios, "Usr"),
        nombre: datos.nombre.trim(),
        documento: documentoLimpio,
        correo: correoLimpio,
        password: datos.password ? datos.password : "123",
        telefono: datos.telefono ? datos.telefono.trim() : "",
        rolId: datos.rolId,
        especialidadId: datos.especialidadId || "",
        estadoId: datos.estadoId || "EstUsr_1"
    };

    dbUsuarios.push(nuevoUsuario);

    return {
        exito: true,
        usuario: formatearUsuario(nuevoUsuario),
        mensaje: "Usuario registrado correctamente."
    };
};

/**
 * Actualiza los datos de un usuario existente. Si no se envía una nueva contraseña,
 * conserva la contraseña anterior.
 *
 * @param {string} id - Identificador del usuario (ej. "Usr_2").
 * @param {Object} datos - Campos actualizados del usuario.
 * @returns {Object} Resultado { exito, usuario, mensaje }.
 */
export const actualizarUsuario = (id, datos) => {
    const indice = dbUsuarios.findIndex((u) => u.id === id);
    if (indice === -1) {
        return {
            exito: false,
            usuario: null,
            mensaje: "Usuario no encontrado."
        };
    }

    const actual = dbUsuarios[indice];

    dbUsuarios[indice] = {
        ...actual,
        nombre: datos.nombre !== undefined ? datos.nombre.trim() : actual.nombre,
        documento: datos.documento !== undefined ? datos.documento.trim() : actual.documento,
        correo: datos.correo !== undefined ? datos.correo.trim().toLowerCase() : actual.correo,
        password: datos.password && datos.password.trim() !== "" ? datos.password : actual.password,
        telefono: datos.telefono !== undefined ? datos.telefono.trim() : actual.telefono,
        rolId: datos.rolId !== undefined ? datos.rolId : actual.rolId,
        especialidadId: datos.especialidadId !== undefined ? datos.especialidadId : actual.especialidadId,
        estadoId: datos.estadoId !== undefined ? datos.estadoId : actual.estadoId
    };

    return {
        exito: true,
        usuario: formatearUsuario(dbUsuarios[indice]),
        mensaje: "Usuario actualizado correctamente."
    };
};

/**
 * Elimina un usuario de la colección en memoria.
 *
 * @param {string} id - Identificador del usuario a eliminar.
 * @returns {Object} Resultado { exito, mensaje }.
 */
export const eliminarUsuario = (id) => {
    const indice = dbUsuarios.findIndex((u) => u.id === id);
    if (indice === -1) {
        return {
            exito: false,
            mensaje: "Usuario no encontrado."
        };
    }

    dbUsuarios.splice(indice, 1);

    return {
        exito: true,
        mensaje: "Usuario eliminado correctamente."
    };
};