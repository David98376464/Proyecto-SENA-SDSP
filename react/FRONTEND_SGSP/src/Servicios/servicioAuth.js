import {
    dbUsuarios,
    dbRoles
} from "./almacenMemoria";

/**
 * Valida las credenciales de un usuario contra la colección en memoria
 * y retorna la sesión enriquecida con el nombre de su rol.
 *
 * @param {string} correo - Correo electrónico ingresado en el formulario.
 * @param {string} password - Contraseña ingresada en el formulario.
 * @returns {Object} Objeto con estado { exito, usuario, mensaje }.
 */
export const iniciarSesion = (correo, password) => {
    const usuarioEncontrado = dbUsuarios.find(
        (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password
    );

    if (!usuarioEncontrado) {
        return {
            exito: false,
            usuario: null,
            mensaje: "Correo o contraseña incorrectos."
        };
    }

    if (usuarioEncontrado.estadoId !== "EstUsr_1") {
        return {
            exito: false,
            usuario: null,
            mensaje: "Este usuario se encuentra inactivo en el sistema."
        };
    }

    const rol = dbRoles.find((r) => r.id === usuarioEncontrado.rolId);

    const { password: _, ...usuarioSinPassword } = usuarioEncontrado;

    return {
        exito: true,
        usuario: {
            ...usuarioSinPassword,
            nombreRol: rol ? rol.nombre : "Sin rol"
        },
        mensaje: "Inicio de sesión exitoso."
    };
};

/**
 * Retorna la lista de usuarios activos en el sistema (sin contraseñas)
 * enriquecidos con el nombre de su rol.
 *
 * @returns {Array<Object>} Lista de usuarios activos listos para selectores o tablas.
 */
export const obtenerUsuariosActivos = () => {
    const activos = dbUsuarios.filter((u) => u.estadoId === "EstUsr_1");

    return activos.map((usuario) => {
        const rol = dbRoles.find((r) => r.id === usuario.rolId);

        const { password: _, ...usuarioSinPassword } = usuario;

        return {
            ...usuarioSinPassword,
            nombreRol: rol ? rol.nombre : "Sin rol"
        };
    });
};