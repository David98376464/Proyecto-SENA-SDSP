/* =========================================================
   DATOS DE PROYECTOS
========================================================= */

const proyectos = {

    "proyecto-1": {
        nombre: "Construcción Edificio Central",
        inicio: "2026-08-01",
        fin: "2026-11-30",
        avance: 45,

        tareas: [
            {
                nombre: "Planeación del proyecto",
                inicio: "2026-08-01",
                fin: "2026-08-15",
                estado: "Completada",
                clase: "completed"
            },
            {
                nombre: "Preparación del terreno",
                inicio: "2026-08-12",
                fin: "2026-08-30",
                estado: "Completada",
                clase: "completed"
            },
            {
                nombre: "Cimentación",
                inicio: "2026-08-25",
                fin: "2026-09-20",
                estado: "En progreso",
                clase: "progress"
            },
            {
                nombre: "Estructura principal",
                inicio: "2026-09-15",
                fin: "2026-10-20",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Instalaciones eléctricas",
                inicio: "2026-10-10",
                fin: "2026-11-05",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Acabados",
                inicio: "2026-10-28",
                fin: "2026-11-20",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Entrega del proyecto",
                inicio: "2026-11-21",
                fin: "2026-11-30",
                estado: "Pendiente",
                clase: "pending"
            }
        ]
    },


    "proyecto-2": {
        nombre: "Remodelación Oficina Administrativa",
        inicio: "2026-08-05",
        fin: "2026-10-30",
        avance: 62,

        tareas: [
            {
                nombre: "Diseño de remodelación",
                inicio: "2026-08-05",
                fin: "2026-08-15",
                estado: "Completada",
                clase: "completed"
            },
            {
                nombre: "Demolición",
                inicio: "2026-08-16",
                fin: "2026-08-28",
                estado: "Completada",
                clase: "completed"
            },
            {
                nombre: "Adecuación eléctrica",
                inicio: "2026-08-25",
                fin: "2026-09-12",
                estado: "En progreso",
                clase: "progress"
            },
            {
                nombre: "Pintura",
                inicio: "2026-09-10",
                fin: "2026-09-25",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Instalación de mobiliario",
                inicio: "2026-09-20",
                fin: "2026-10-15",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Inspección final",
                inicio: "2026-10-16",
                fin: "2026-10-30",
                estado: "Pendiente",
                clase: "pending"
            }
        ]
    },


    "proyecto-3": {
        nombre: "Adecuación Área Comercial",
        inicio: "2026-08-10",
        fin: "2026-12-10",
        avance: 30,

        tareas: [
            {
                nombre: "Levantamiento de información",
                inicio: "2026-08-10",
                fin: "2026-08-25",
                estado: "Completada",
                clase: "completed"
            },
            {
                nombre: "Diseño del espacio",
                inicio: "2026-08-20",
                fin: "2026-09-15",
                estado: "En progreso",
                clase: "progress"
            },
            {
                nombre: "Preparación del área",
                inicio: "2026-09-10",
                fin: "2026-10-05",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Instalación",
                inicio: "2026-10-01",
                fin: "2026-11-15",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Pruebas",
                inicio: "2026-11-10",
                fin: "2026-11-25",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Entrega",
                inicio: "2026-11-26",
                fin: "2026-12-10",
                estado: "Pendiente",
                clase: "pending"
            }
        ]
    },


    "proyecto-4": {
        nombre: "Construcción Zona Recreativa",
        inicio: "2026-08-15",
        fin: "2026-12-20",
        avance: 20,

        tareas: [
            {
                nombre: "Diseño del proyecto",
                inicio: "2026-08-15",
                fin: "2026-09-05",
                estado: "Completada",
                clase: "completed"
            },
            {
                nombre: "Preparación del terreno",
                inicio: "2026-09-01",
                fin: "2026-09-30",
                estado: "En progreso",
                clase: "progress"
            },
            {
                nombre: "Construcción",
                inicio: "2026-09-25",
                fin: "2026-11-15",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Instalación de juegos",
                inicio: "2026-11-01",
                fin: "2026-11-30",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Zonas verdes",
                inicio: "2026-11-20",
                fin: "2026-12-10",
                estado: "Pendiente",
                clase: "pending"
            },
            {
                nombre: "Entrega",
                inicio: "2026-12-11",
                fin: "2026-12-20",
                estado: "Pendiente",
                clase: "pending"
            }
        ]
    }

};


/* =========================================================
   ELEMENTOS
========================================================= */

const projectSelect = document.getElementById("projectSelect");
const viewSelect = document.getElementById("viewSelect");
const updateGanttBtn = document.getElementById("updateGanttBtn");

const projectName = document.getElementById("projectName");
const projectDates = document.getElementById("projectDates");
const projectProgress = document.getElementById("projectProgress");
const projectProgressBar = document.getElementById("projectProgressBar");

const taskList = document.getElementById("taskList");
const timelineHeader = document.getElementById("timelineHeader");
const timelineBody = document.getElementById("timelineBody");

const ganttMessage = document.getElementById("ganttMessage");


/* =========================================================
   FORMATEAR FECHA
========================================================= */

function formatearFecha(fecha) {

    const opciones = {
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    return new Date(fecha + "T00:00:00")
        .toLocaleDateString("es-CO", opciones);
}


/* =========================================================
   OBTENER RANGO
========================================================= */

function obtenerRangoProyecto(proyecto) {

    const fechas = [];

    fechas.push(new Date(proyecto.inicio));
    fechas.push(new Date(proyecto.fin));

    proyecto.tareas.forEach(tarea => {

        fechas.push(new Date(tarea.inicio));
        fechas.push(new Date(tarea.fin));

    });

    const inicio = new Date(
        Math.min(...fechas.map(fecha => fecha.getTime()))
    );

    const fin = new Date(
        Math.max(...fechas.map(fecha => fecha.getTime()))
    );

    inicio.setDate(1);
    fin.setMonth(fin.getMonth() + 1);
    fin.setDate(0);

    return {
        inicio,
        fin
    };
}


/* =========================================================
   GENERAR PERIODOS
========================================================= */

function generarPeriodos(inicio, fin) {

    const periodos = [];

    const fechaActual = new Date(inicio);

    while (fechaActual <= fin) {

        const periodoInicio = new Date(fechaActual);

        const periodoFin = new Date(fechaActual);
        periodoFin.setDate(periodoFin.getDate() + 6);

        if (periodoFin > fin) {
            periodoFin.setTime(fin.getTime());
        }

        periodos.push({
            inicio: periodoInicio,
            fin: periodoFin
        });

        fechaActual.setDate(
            fechaActual.getDate() + 7
        );
    }

    return periodos;
}


/* =========================================================
   CALCULAR POSICIÓN
========================================================= */

function calcularPosicion(fecha, inicio, fin) {

    const total =
        fin.getTime() - inicio.getTime();

    const actual =
        fecha.getTime() - inicio.getTime();

    return (actual / total) * 100;
}


/* =========================================================
   CARGAR GANTT
========================================================= */

function cargarGantt() {

    const proyecto =
        proyectos[projectSelect.value];

    if (!proyecto) {
        return;
    }


    /* Información */

    projectName.textContent =
        proyecto.nombre;

    projectDates.textContent =
        `${formatearFecha(proyecto.inicio)} — ${formatearFecha(proyecto.fin)}`;

    projectProgress.textContent =
        `${proyecto.avance}%`;

    projectProgressBar.style.width =
        `${proyecto.avance}%`;


    /* Limpiar */

    taskList.innerHTML = "";
    timelineHeader.innerHTML = "";
    timelineBody.innerHTML = "";


    /* Rango */

    const rango =
        obtenerRangoProyecto(proyecto);

    const periodos =
        generarPeriodos(
            rango.inicio,
            rango.fin
        );


    /* =====================================================
       HEADER DE TIEMPO
    ===================================================== */

    timelineHeader.style.gridTemplateColumns =
        `repeat(${periodos.length}, 1fr)`;

    periodos.forEach(periodo => {

        const div =
            document.createElement("div");

        div.className =
            "timeline-period";

        const inicio =
            periodo.inicio.toLocaleDateString(
                "es-CO",
                {
                    day: "2-digit",
                    month: "short"
                }
            );

        div.textContent =
            inicio;

        timelineHeader.appendChild(div);

    });


    /* =====================================================
       TAREAS
    ===================================================== */

    proyecto.tareas.forEach(tarea => {

        const taskRow =
            document.createElement("div");

        taskRow.className =
            "task-row";

        taskRow.innerHTML = `
            <div class="task-info">

                <span class="task-name">
                    ${tarea.nombre}
                </span>

                <span class="task-status">
                    ${tarea.estado}
                </span>

            </div>
        `;

        taskList.appendChild(taskRow);


        /* Línea de tiempo */

        const timelineRow =
            document.createElement("div");

        timelineRow.className =
            "timeline-row";

        const fechaInicio =
            new Date(tarea.inicio);

        const fechaFin =
            new Date(tarea.fin);

        const left =
            calcularPosicion(
                fechaInicio,
                rango.inicio,
                rango.fin
            );

        const right =
            calcularPosicion(
                fechaFin,
                rango.inicio,
                rango.fin
            );

        const width =
            right - left;


        const bar =
            document.createElement("div");

        bar.className =
            `timeline-bar ${tarea.clase}`;

        bar.style.left =
            `${left}%`;

        bar.style.width =
            `${width}%`;

        bar.title =
            `${tarea.nombre}\n${formatearFecha(tarea.inicio)} - ${formatearFecha(tarea.fin)}`;


        timelineRow.appendChild(bar);

        timelineBody.appendChild(timelineRow);

    });


    mostrarMensaje(
        "Cronograma actualizado correctamente."
    );
}


/* =========================================================
   MENSAJE
========================================================= */

function mostrarMensaje(texto) {

    ganttMessage.textContent =
        texto;

    ganttMessage.style.display =
        "block";

    setTimeout(() => {

        ganttMessage.style.display =
            "none";

    }, 2500);
}


/* =========================================================
   EVENTOS
========================================================= */

updateGanttBtn.addEventListener(
    "click",
    cargarGantt
);

projectSelect.addEventListener(
    "change",
    cargarGantt
);


/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarGantt();

    }
);