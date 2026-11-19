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
        id:"EstTar_3",
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
        id: "EstPro_3",
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
]


/**
 * Catálogo inicial de estados posibles para un cliente.
 *
 * Estructura:
 * - id {string}: Identificador único del estado (ej. "estCli_1").
 * - nombre {string}: Nombre descriptivo del estado del cliente.
 * - descripcion {string}: Detalle o alcance del estado comercial.
 */
export const estadoClientesIniciales = [
    {
        id: "estCli_1",
        nombre: "Activo",
        descripcion: ""
    },

    {
        id: "estCli_2",
        nombre: "Inactivo",
        descripcion: ""
    },

    {
        id: "estCli_3",
        nombre: "Suspendido",
        descripcion: "Cliente con proyectos pausados o pendiente de validación administrativa"
    }
]
/**
 * Catálogo inicial de clientes del sistema (Empresas o personas contratantes de los proyectos).
 * Nota: La vinculación de un cliente con sus obras se gestiona mediante la llave foránea
 * clienteId dentro de la colección de proyectos.
 *
 * Estructura:
 * - id {string}: Identificador único del cliente (ej. "cli_1").
 * - nombre {string}: Razón social de la empresa o nombre completo del cliente.
 * - documento {string}: NIT o documento de identidad del cliente.
 * - telefono {string}: Número de contacto principal.
 * - correo {string}: Correo electrónico corporativo o personal para notificaciones.
 * - direccion {string}: Dirección física o ubicación principal del cliente.
 * - estadoId {string}: Referencia al ID en estadoClientesIniciales ("estCli_1", "estCli_2", etc.).
 */
export const clientesIniciales = [
    {
        id: "cli_1",
        nombre: "Constructora Horizonte S.A.S.",
        documento: "900.451.820-3",
        telefono: "3104567890",
        correo: "contacto@constructorahorizonte.com",
        direccion: "Calle 93 # 14-20, Bogotá",
        estadoId: "estCli_1"
    },

    {
        id: "cli_2",
        nombre: "Inversiones Andina Ltda.",
        documento: "800.312.645-1",
        telefono: "3159876543",
        correo: "proyectos@inversionesandina.co",
        direccion: "Carrera 45 # 102-15, Bogotá",
        estadoId: "estCli_1"
    },

    {
        id: "cli_3",
        nombre: "Carlos Alberto Mendoza",
        documento: "79.654.321",
        telefono: "3201234567",
        correo: "cmendoza@correo.com",
        direccion: "Avenida Boyacá # 68-40, Bogotá",
        estadoId: "estCli_1"
    }
]

/**
 * Catálogo inicial de proyectos u obras registradas en el sistema.
 * Nota: Centraliza las relaciones con el cliente contratante, el supervisor responsable
 * y el equipo de empleados asignados mediante sus identificadores.
 *
 * Estructura:
 * - id {string}: Identificador único del proyecto (ej. "pro_1").
 * - nombre {string}: Nombre descriptivo de la obra o proyecto.
 * - descripcion {string}: Alcance general de los trabajos a realizar.
 * - fechaInicio {string}: Fecha de inicio programada o real (formato YYYY-MM-DD).
 * - fechaFinEstimada {string}: Fecha proyectada de entrega (formato YYYY-MM-DD).
 * - clienteId {string}: Referencia al ID en clientesIniciales ("cli_1", "cli_2", etc.).
 * - supervisorId {string}: Referencia al ID del usuario supervisor en usuariosIniciales (ej. "usr_2").
 * - estadoId {string}: Referencia al ID en estadoProyectosIniciales ("estPro_1", "estPro_2", etc.).
 */
export const proyectosIniciales = [
    {
        id: "pro_1",
        nombre: "Remodelación Edificio Empresarial Norte",
        descripcion: "Adecuación de oficinas, redes eléctricas estructuradas y acabados en pisos 3 y 4",
        fechaInicio: "2026-09-01",
        fechaFinEstimada: "2026-12-15",
        clienteId: "cli_1",
        supervisorId: "Usr_2",
        estadoId: "EstPro_2"
    },

    {
        id: "pro_2",
        nombre: "Construcción Bodega Logística Zona Franca",
        descripcion: "Cimentación, estructura metálica y cubierta industrial de 800 m2",
        fechaInicio: "2026-10-10",
        fechaFinEstimada: "2027-03-30",
        clienteId: "cli_2",
        supervisorId: "Usr_2",
        estadoId: "EstPro_1"
    },

    {
        id: "pro_3",
        nombre: "Ampliación Residencial La Colina",
        descripcion: "Construcción de terraza, reforzamiento estructural y cambio de redes hidrosanitarias",
        fechaInicio: "2026-07-15",
        fechaFinEstimada: "2026-10-20",
        clienteId: "cli_3",
        supervisorId: "Usr_2",
        estadoId: "EstPro_3"
    }
]


/**
 * Catálogo inicial de tareas o actividades asignadas dentro de los proyectos.
 * Nota: La fechaCreacion se genera automáticamente al registrar la tarea.
 * La fechaFinalizacion permanece como cadena vacía ("") mientras esté pendiente y toma la fecha
 * del sistema cuando cualquier rol la marca como completada (volviendo a "" si
 * un supervisor o administrador la devuelve para corrección).
 *
 * Estructura:
 * - id {string}: Identificador único de la tarea (ej. "tar_1").
 * - nombre {string}: Título corto o nombre de la actividad a ejecutar.
 * - descripcion {string}: Detalle técnico o instrucciones de la tarea.
 * - fechaCreacion {string}: Fecha en que se creó la tarea (formato YYYY-MM-DD).
 * - fechaFinalizacion {string}: Fecha real en que se marcó como completada, o "" si sigue pendiente.
 * - proyectoId {string}: Referencia al ID en proyectosIniciales ("pro_1", "pro_2", etc.).
 * - empleadoId {string}: Referencia al ID del usuario empleado en usuariosIniciales (ej. "usr_3").
 * - estadoId {string}: Referencia al ID en estadoTareasIniciales ("estTar_1", "estTar_2", etc.).
 */
export const tareasIniciales = [
    {
        id: "tar_1",
        nombre: "Instalación de cableado estructurado piso 3",
        descripcion: "Tendido de red categoría 6A y certificación de puntos de datos en oficina norte",
        fechaCreacion: "2026-09-05",
        fechaFinalizacion: "",
        proyectoId: "pro_1",
        empleadoId: "Usr_3",
        estadoId: "EstTar_1"
    },

    {
        id: "tar_2",
        nombre: "Adecuación de luminarias LED piso 4",
        descripcion: "Desmonte de lámparas antiguas e instalación de paneles LED de alto rendimiento",
        fechaCreacion: "2026-09-21",
        fechaFinalizacion: "",
        proyectoId: "pro_1",
        empleadoId: "Usr_4",
        estadoId: "EstTar_1"
    },

    {
        id: "tar_3",
        nombre: "Replanteo topográfico de zapatas",
        descripcion: "Trazado y nivelación de ejes principales para cimentación de columnas",
        fechaCreacion: "2026-10-12",
        fechaFinalizacion: "2026-10-15",
        proyectoId: "pro_2",
        empleadoId: "Usr_3",
        estadoId: "EstTar_3"
    }
]

/**
 * Catálogo inicial de consumibles o materiales registrados en el sistema.
 * Nota: Vincula cada insumo con su unidad de medida y el proyecto al que está asignado
 * (o inventario disponible según el alcance del prototipo).
 *
 * Estructura:
 * - id {string}: Identificador único del consumible (ej. "con_1").
 * - nombre {string}: Nombre descriptivo del material o insumo.
 * - descripcion {string}: Especificación técnica o detalles del material.
 * - cantidad {number}: Cantidad disponible o asignada del consumible.
 * - unidadId {string}: Referencia al ID en unidadesIniciales (ej. "uni_1", "uni_2").
 * - proyectoId {string}: Referencia al ID en proyectosIniciales ("pro_1", "pro_2", etc.).
 */
export const consumiblesIniciales = [
    {
        id: "con_1",
        nombre: "Cable UTP Categoría 6A",
        descripcion: "Bobina de cable de red certificado para datos de alta velocidad",
        cantidad: 300,
        unidadId: "Um_1",
        proyectoId: "pro_1"
    },

    {
        id: "con_2",
        nombre: "Panel LED 60x60 cm 48W",
        descripcion: "Luminaria tipo panel luz blanca neutra para cielo raso",
        cantidad: 24,
        unidadId: "Um_2",
        proyectoId: "pro_1"
    },

    {
        id: "con_3",
        nombre: "Cemento Gris Uso General 50 kg",
        descripcion: "Bulto de cemento estructural para cimentación y mampostería",
        cantidad: 80,
        unidadId: "Um_3",
        proyectoId: "pro_2"
    }
]

/**
 * Catálogo inicial de incidencias o imprevistos reportados en los proyectos.
 * Nota: Permite registrar hallazgos, retrasos, solicitudes o reportes de avance
 * asociados a una obra y al usuario que realiza el reporte.
 *
 * Estructura:
 * - id {string}: Identificador único de la incidencia (ej. "inc_1").
 * - titulo {string}: Asunto o resumen breve de la incidencia reportada.
 * - descripcion {string}: Detalle completo de lo ocurrido o solicitado en obra.
 * - fecha {string}: Fecha en que se registró la incidencia (formato YYYY-MM-DD).
 * - proyectoId {string}: Referencia al ID en proyectosIniciales ("pro_1", "pro_2", etc.).
 * - usuarioId {string}: Referencia al ID del usuario que reporta en usuariosIniciales (ej. "usr_3").
 * - estadoId {string}: Referencia al ID en estadoIncidenciasIniciales ("estInc_1", "estInc_2", etc.).
 */
export const incidenciasIniciales = [
    {
        id: "inc_1",
        titulo: "Retraso en entrega de tubería conduit",
        descripcion: "El proveedor reprogramó la entrega de tubería metálica para el piso 3 por cierre vial",
        fecha: "2026-09-10",
        proyectoId: "pro_1",
        usuarioId: "Usr_2",
    },

    {
        id: "inc_2",
        titulo: "Humedad detectada en muro norte",
        descripcion: "Se requiere impermeabilización previa antes de instalar los paneles LED del piso 4",
        fecha: "2026-09-22",
        proyectoId: "pro_1",
        usuarioId: "Usr_2",
    },

    {
        id: "inc_3",
        titulo: "Aprobación de trazado topográfico",
        descripcion: "Interventoría dio visto bueno a los ejes de cimentación para iniciar excavación",
        fecha: "2026-10-15",
        proyectoId: "pro_2",
        usuarioId: "Usr_2",
    }
];

