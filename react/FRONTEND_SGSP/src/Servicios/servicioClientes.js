import {
    dbClientes,
    dbEstadoClientes,
    generarSiguienteId
} from "./almacenMemoria";

/**
 * Función auxiliar que enriquece un cliente con el nombre legible de su estado.
 *
 * @param {Object} cliente - Registro crudo de dbClientes.
 * @returns {Object} Cliente enriquecido con nombreEstado.
 */
const formatearCliente = (cliente) => {
    const estado = dbEstadoClientes.find((est) => est.id === cliente.estadoId);

    return {
        ...cliente,
        nombreEstado: estado ? estado.nombre : "Sin estado"
    };
};

/**
 * Retorna la lista completa de clientes registrados en el sistema.
 *
 * @returns {Array<Object>} Lista de clientes enriquecidos.
 */
export const obtenerClientes = () => {
    return dbClientes.map((cliente) => formatearCliente(cliente));
};

/**
 * Crea un nuevo cliente validando que el documento o NIT no esté duplicado.
 *
 * @param {Object} datos - Datos del cliente a registrar.
 * @returns {Object} Resultado { exito, cliente, mensaje }.
 */
export const crearCliente = (datos) => {
    const nombreLimpio = datos.nombre ? datos.nombre.trim() : "";
    const documentoLimpio = datos.documento ? datos.documento.trim() : "";

    if (!nombreLimpio || !documentoLimpio) {
        return {
            exito: false,
            cliente: null,
            mensaje: "El nombre y el documento o NIT son obligatorios."
        };
    }

    const duplicado = dbClientes.some((c) => c.documento === documentoLimpio);
    if (duplicado) {
        return {
            exito: false,
            cliente: null,
            mensaje: "Ya existe un cliente registrado con ese documento o NIT."
        };
    }

    const nuevoCliente = {
        id: generarSiguienteId(dbClientes, "cli"),
        nombre: nombreLimpio,
        documento: documentoLimpio,
        telefono: datos.telefono ? datos.telefono.trim() : "",
        correo: datos.correo ? datos.correo.trim().toLowerCase() : "",
        direccion: datos.direccion ? datos.direccion.trim() : "",
        estadoId: datos.estadoId || "estCli_1"
    };

    dbClientes.push(nuevoCliente);

    return {
        exito: true,
        cliente: formatearCliente(nuevoCliente),
        mensaje: "Cliente registrado correctamente."
    };
};

/**
 * Actualiza los datos de un cliente existente.
 *
 * @param {string} id - Identificador del cliente (ej. "cli_1").
 * @param {Object} datos - Campos actualizados del cliente.
 * @returns {Object} Resultado { exito, cliente, mensaje }.
 */
export const actualizarCliente = (id, datos) => {
    const indice = dbClientes.findIndex((c) => c.id === id);
    if (indice === -1) {
        return {
            exito: false,
            cliente: null,
            mensaje: "Cliente no encontrado."
        };
    }

    const actual = dbClientes[indice];

    dbClientes[indice] = {
        ...actual,
        nombre: datos.nombre !== undefined ? datos.nombre.trim() : actual.nombre,
        documento: datos.documento !== undefined ? datos.documento.trim() : actual.documento,
        telefono: datos.telefono !== undefined ? datos.telefono.trim() : actual.telefono,
        correo: datos.correo !== undefined ? datos.correo.trim().toLowerCase() : actual.correo,
        direccion: datos.direccion !== undefined ? datos.direccion.trim() : actual.direccion,
        estadoId: datos.estadoId !== undefined ? datos.estadoId : actual.estadoId
    };

    return {
        exito: true,
        cliente: formatearCliente(dbClientes[indice]),
        mensaje: "Cliente actualizado correctamente."
    };
};

/**
 * Elimina un cliente de la colección en memoria.
 *
 * @param {string} id - Identificador del cliente a eliminar.
 * @returns {Object} Resultado { exito, mensaje }.
 */
export const eliminarCliente = (id) => {
    const indice = dbClientes.findIndex((c) => c.id === id);
    if (indice === -1) {
        return {
            exito: false,
            mensaje: "Cliente no encontrado."
        };
    }

    dbClientes.splice(indice, 1);

    return {
        exito: true,
        mensaje: "Cliente eliminado correctamente."
    };
};