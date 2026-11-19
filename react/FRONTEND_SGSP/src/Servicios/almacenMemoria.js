/**
 * Almacén de datos en memoria RAM del sistema.
 * Inicializa copias editables a partir de datosIniciales.js para simular
 * las tablas de la base de datos durante la sesión activa del navegador.
 */

import{
    rolesIniciales,
    especialidadesIniciales,
    estadosUsuarioIniciales,
    estadoClientesIniciales,
    estadoProyectosIniciales,
    estadoTareasIniciales,
    unidadMedidaInicial,
    usuariosIniciales,
    clientesIniciales,
    proyectosIniciales,
    tareasIniciales,
    consumiblesIniciales,
    incidenciasIniciales

} from "../Datos/datosIniciales"

/**
 * Tablas de catálogos en memoria RAM.
 * Copias editables inicializadas a partir de datosIniciales.js.
 */

export let dbRoles = [...rolesIniciales];

export let dbEspecialidades = [...especialidadesIniciales];

export let dbEstadoUsuarios = [...estadosUsuarioIniciales];

export let dbEstadoClientes = [...estadoClientesIniciales];

export let dbEstadoProyectos = [...estadoProyectosIniciales];

export let dbEstadoTareas = [...estadoTareasIniciales];


export let dbUnidades = [...unidadMedidaInicial];


/**
 * Tablas de entidades principales en memoria RAM.
 * Copias editables inicializadas a partir de datosIniciales.js.
 */

export let dbUsuarios = [...usuariosIniciales];

export let dbClientes = [...clientesIniciales];

export let dbProyectos = [...proyectosIniciales];

export let dbTareas = [...tareasIniciales];

export let dbConsumibles = [...consumiblesIniciales];

export let dbIncidencias = [...incidenciasIniciales];


/**
 * Genera el siguiente identificador secuencial único para una colección en memoria.
 * Funcionamiento:
 * 1. Si la lista está vacía, retorna el primer ID (ej. "tar_1").
 * 2. Extrae la parte numérica de cada ID existente separando por "_" y obtiene el número mayor.
 * 3. Retorna el prefijo unido al número máximo + 1 (evita duplicados aunque se eliminen registros).
 *
 * @param {Array<Object>} coleccion - Lista actual en memoria.
 * @param {string} prefijo - Prefijo de la entidad (ej. "tar", "pro", "cli").
 * @returns {string} Nuevo identificador único (ej. "tar_4").
 */
export const generarSiguienteId = (coleccion, prefijo) => {
    if (!coleccion || coleccion.length === 0) {
        return prefijo + "_1";
    }

    const numeros = coleccion.map((item) => {
        const partes = item.id.split("_");
        return parseInt(partes[1], 10) || 0;
    });

    const maximo = Math.max(...numeros);
    return prefijo + "_" + (maximo + 1);
};


/**
 * Retorna la fecha actual del sistema en formato YYYY-MM-DD (hora local).
 * Funcionamiento:
 * 1. Obtiene la fecha actual del navegador mediante new Date().
 * 2. Extrae el año, el mes (sumando 1 porque enero es 0) y el día, completando
 *    con un cero a la izquierda si tienen un solo dígito mediante padStart(2, "0").
 * 3. Une los valores con guiones para coincidir con el formato de datosIniciales.js.
 *
 * @returns {string} Fecha formateada (ej. "2026-11-18").
 */
export const obtenerFechaHoy = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return anio + "-" + mes + "-" + dia;
};