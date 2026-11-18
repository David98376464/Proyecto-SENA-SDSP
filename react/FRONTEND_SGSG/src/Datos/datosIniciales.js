/**
 * Catálogo inicial de roles del sistema.
 * Estructura:
 * - id {string}: Identificador único del rol.
 * - nombre {string}: Nombre clave del rol ('admin', 'supervisor', 'empleado').
 * - descripcion {string} (Opcional): Detalle de los permisos del rol (puede ir vacío '').
 */
export const rolesIniciales = [
    {
        id: "Rol_1",
        nombre: "Administrador",
        descripcion:"Accesto total al sistema"
    },

    {
        id: "Rol_2",
        nombre: "Supervisor",
        descripcion: "Gestiona obras asignadas"
    },

    {
        id: "Rol_3",
        nombre: "Empleado",
        descripcion: "Acceso a tareas asignadas"
    }
]


/**
 * Catálogo inicial de especialidades técnicas para asignar a los usuarios.
 * Estructura:
 * - id {string}: Identificador único de la especialidad.
 * - nombre {string}: Nombre del oficio o profesión (ej. 'Maestro de Obra').
 * - descripcion {string} (Opcional): Detalle de funciones (puede ir vacío '').
 */
export const especialidadesIniciales = [
    {
        id: "Esp_1",
        nombre: "Ingeniero Civil",
        descripcion: "Dirección técnica, supervisión y control estructural en obra."
    },

    {
        id: "Esp_2",
        nombre: "Maestro de obra",
        descripcion: "Coordinación directa de cuadrillas y ejecución en campo."
    },

    {
        id:"Esp_3",
        nombre: "Electricista",
        descripcion: "",
    }
]


/**
 * Catálogo inicial de unidades de medida para los consumibles (materiales).
 * Estructura:
 * - id {string}: Identificador único de la unidad (ej. 'Um_1').
 * - nombre {string}: Nombre de la unidad de medida (ej. 'Bultos', 'Metros').
 * - descripcion {string} (Opcional): Detalle o equivalencia (puede ir vacío '').
 */
export const unidadMedidaInicial = [
    {
        id: "Um_1",
        nombre: "Metros",
        descripcion: ""
    },

    {
        id: "Um_2",
        nombre: "Kilos",
        descripcion: ""
    },

    {
        id: "Um_3",
        nombre: "Unidades",
        descripcion: ""
    }
]



/**
 * Catálogo inicial de estados posibles para el seguimiento de las tareas.
 * Estructura:
 * - id {string}: Identificador único del estado (ej. 'EstTar_1').
 * - nombre {string}: Nombre del estado (ej. 'Pendiente', 'Realizada').
 * - descripcion {string} (Opcional): Detalle del estado (puede ir vacío '').
 */
export const estadoTareasIniciales = [
    {
        id: "EstTar_1",
        nombre: "Completada",
        descripcion: ""
    },

    {
        id: "EstTar_2",
        nombre: "En progreso",
        descripcion: ""
    },

    {
        id:"EstTarea_3",
        nombre: "Pendiente",
        descripcion: ""
    },
]


export const estadoProyectosIniciales = [

    {
        id:"EstPro_1",
        nombre: "Finalizado",
        descripcion: ""
    },

    {
        id: "EstPro_2",
        nombre: "En progreso",
        descripcion: ""
    },

    {
        id: "EstPro3",
        nombre: "Pausado",
        descripcion: ""
    }
]


/**
 * Catálogo inicial de estados posibles para los usuarios del sistema.
 * Estructura:
 * - id {string}: Identificador único del estado (ej. 'EstUsr_1').
 * - nombre {string}: Nombre del estado (ej. 'Activo', 'Inactivo', 'En vacaciones').
 * - descripcion {string} (Opcional): Detalle del estado (puede ir vacío '').
 */
export const estadosUsuarioIniciales = [
    {
        id: 'EstUsr_1',
        nombre: 'Activo',
        descripcion: 'Usuario habilitado para iniciar sesión y ser asignado a obras.',
    },
    {
        id: 'EstUsr_2',
        nombre: 'Inactivo',
        descripcion: 'Usuario retirado o suspendido temporalmente del sistema.',
    },
    {
        id: 'EstUsr_3',
        nombre: 'En vacaciones',
        descripcion: '', // Descripción opcional vacía
    },
]
export const estadoUsuariosIniciales = [
    {
        id: "estUsu_1",
        nombre: "Activo",
        descripcion: ""
    },

    {
        id: "estUsu_2",
        nombre: "Inactivo",
        descripcion: ""
    },

    {
        id:"estUsu_3",
        nombre: "Eliminado",
        descripcion: "Esta despedido, pero se guarda la información, por respaldo jurídico"
    }
]

/**
 * Catálogo inicial de usuarios del sistema (Administradores, Supervisores y Empleados).
 * Nota: La vinculación inicial opcional a un proyecto al crear un usuario se procesa
 * directamente sobre la colección de proyectos para evitar duplicar relaciones.
 *
 * Estructura:
 * - id {string}: Identificador único del usuario (ej. 'Usr_1').
 * - nombre {string}: Nombre completo del usuario.
 * - documento {string}: Cédula o documento de identidad.
 * - correo {string}: Correo electrónico para acceso y notificaciones.
 * - password {string}: Contraseña de prueba para simular inicio de sesión.
 * - telefono {string}: Número de contacto.
 * - rolId {string}: Referencia al ID en rolesIniciales ('Rol_1', 'Rol_2', 'Rol_3').
 * - especialidadId {string}: Referencia al ID en especialidadesIniciales ('Esp_1', etc.).
 * - estadoId {string}: Referencia al ID en estadosUsuarioIniciales ('EstUsr_1', etc.).
 */
export const usuariosIniciales = [
    {
        id: 'Usr_1',
        nombre: 'Carlos Mendoza',
        documento: '1010202030',
        correo: 'admin@constructora.com',
        password: '123',
        telefono: '3001112233',
        rolId: 'Rol_1', // Admin
        estadoId: 'EstUsr_1', // Activo
    },
    {
        id: 'Usr_2',
        nombre: 'Laura Gómez',
        documento: '1020304050',
        correo: 'laura.sup@constructora.com',
        password: '123',
        telefono: '3012223344',
        rolId: 'Rol_2', // Supervisor
        especialidadId: 'Esp_1', // Ingeniero Civil
        estadoId: 'EstUsr_1', // Activo
    },
    {
        id: 'Usr_3',
        nombre: 'Andrés Ramírez',
        documento: '1030405060',
        correo: 'andres.emp@constructora.com',
        password: '123',
        telefono: '3023334455',
        rolId: 'Rol_3', // Empleado
        especialidadId: 'Esp_2', // Maestro de Obra
        estadoId: 'EstUsr_1', // Activo
    },
    {
        id: 'Usr_4',
        nombre: 'Julián Torres',
        documento: '1040506070',
        correo: 'julian.emp@constructora.com',
        password: '123',
        telefono: '3034445566',
        rolId: 'Rol_3', // Empleado
        especialidadId: 'Esp_3', // Electricista
        estadoId: 'EstUsr_1', // Activo
    },
];


