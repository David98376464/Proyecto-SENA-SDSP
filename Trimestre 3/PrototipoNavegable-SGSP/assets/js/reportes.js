/* =========================================================
   SGSP - REPORTES
   ========================================================= */


/* =========================================================
   DATOS DE PROYECTOS
   ========================================================= */

const proyectos = [

    {
        nombre: "Proyecto Alfa",
        tipo: "Obra civil",
        estado: "En ejecución",
        avance: 75,
        responsable: "Carlos Pérez",
        fecha: "30/09/2025",

        tareas: [
            {
                nombre: "Derribar muro",
                estado: "Completada"
            },
            {
                nombre: "Retirar escombros",
                estado: "Completada"
            },
            {
                nombre: "Preparar terreno",
                estado: "En proceso"
            },
            {
                nombre: "Instalar estructura",
                estado: "Incompleta"
            }
        ]
    },


    {
        nombre: "Proyecto Beta",
        tipo: "Ingeniería",
        estado: "Planeación",
        avance: 30,
        responsable: "María Gómez",
        fecha: "15/11/2025",

        tareas: [
            {
                nombre: "Realizar levantamiento",
                estado: "Completada"
            },
            {
                nombre: "Elaborar planos",
                estado: "En proceso"
            },
            {
                nombre: "Revisar diseños",
                estado: "Incompleta"
            },
            {
                nombre: "Aprobar propuesta",
                estado: "Incompleta"
            },
            {
                nombre: "Preparar presupuesto",
                estado: "Incompleta"
            }
        ]
    },


    {
        nombre: "Proyecto Gamma",
        tipo: "Construcción",
        estado: "Finalizado",
        avance: 100,
        responsable: "Juan Rodríguez",
        fecha: "10/08/2025",

        tareas: [
            {
                nombre: "Preparar terreno",
                estado: "Completada"
            },
            {
                nombre: "Construir cimentación",
                estado: "Completada"
            },
            {
                nombre: "Levantar estructura",
                estado: "Completada"
            },
            {
                nombre: "Instalar cubierta",
                estado: "Completada"
            },
            {
                nombre: "Instalar acabados",
                estado: "Completada"
            },
            {
                nombre: "Instalar redes eléctricas",
                estado: "Completada"
            },
            {
                nombre: "Instalar redes hidráulicas",
                estado: "Completada"
            },
            {
                nombre: "Pintura",
                estado: "Completada"
            },
            {
                nombre: "Limpieza final",
                estado: "Completada"
            },
            {
                nombre: "Inspección de obra",
                estado: "Completada"
            },
            {
                nombre: "Entrega del proyecto",
                estado: "Completada"
            }
        ]
    },


    {
        nombre: "Proyecto Delta",
        tipo: "Mantenimiento",
        estado: "Retrasado",
        avance: 45,
        responsable: "Ana Martínez",
        fecha: "20/10/2025",

        tareas: [
            {
                nombre: "Inspección inicial",
                estado: "Completada"
            },
            {
                nombre: "Identificar fallas",
                estado: "Completada"
            },
            {
                nombre: "Solicitar materiales",
                estado: "En proceso"
            },
            {
                nombre: "Reparar equipos",
                estado: "En proceso"
            },
            {
                nombre: "Realizar pruebas",
                estado: "Incompleta"
            },
            {
                nombre: "Entrega del mantenimiento",
                estado: "Incompleta"
            }
        ]
    }

];


/* =========================================================
   DATOS GENERALES
   ========================================================= */

const datosGenerales = {

    proyectos: 8,
    tareas: 24,
    empleados: 12,
    materiales: 35

};


/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTOS DEL DOM
       ===================================================== */

    const tipoReporte =
        document.querySelector("#tipoReporte");

    const filtroProyecto =
        document.querySelector("#reportProject");

    const filtroPeriodo =
        document.querySelector("#reportPeriod");

    const botonGenerar =
        document.querySelector("#generateReport, .generate-report-btn");

    const botonExportar =
        document.querySelector("#exportReport, .export-report-btn");

    const tabla =
        document.querySelector("#reportTable");


    /* =====================================================
       INICIALIZAR PÁGINA
       ===================================================== */

    inicializarResumen();

    cargarProyectos();

    inicializarFiltros();


    /* =====================================================
       CARGAR TABLA INICIAL
       ===================================================== */

    cargarTabla(proyectos);

    actualizarResumen(proyectos);

    actualizarIndicadores(proyectos);


    /* =====================================================
       BOTÓN GENERAR REPORTE
       ===================================================== */

    if (botonGenerar) {

        botonGenerar.addEventListener("click", () => {


            const tipoSeleccionado =
                tipoReporte
                    ? tipoReporte.value
                    : "proyectos";


            const proyectoSeleccionado =
                filtroProyecto
                    ? filtroProyecto.value
                    : "todos";


            const periodoSeleccionado =
                filtroPeriodo
                    ? filtroPeriodo.value
                    : "todo";


            const resultados =
                filtrarProyectos(
                    proyectoSeleccionado,
                    periodoSeleccionado
                );


            cargarTabla(resultados);

            actualizarResumen(resultados);

            actualizarIndicadores(resultados);


            mostrarMensajeReporte(
                tipoSeleccionado,
                resultados.length
            );

        });

    }


    /* =====================================================
       BOTÓN EXPORTAR
       ===================================================== */

    if (botonExportar) {

        botonExportar.addEventListener("click", () => {


            const proyectoSeleccionado =
                filtroProyecto
                    ? filtroProyecto.value
                    : "todos";


            const periodoSeleccionado =
                filtroPeriodo
                    ? filtroPeriodo.value
                    : "todo";


            const resultados =
                filtrarProyectos(
                    proyectoSeleccionado,
                    periodoSeleccionado
                );


            exportarCSV(resultados);

        });

    }


    /* =====================================================
       COMPROBAR TABLA
       ===================================================== */

    if (!tabla) {

        console.warn(
            "No se encontró #reportTable."
        );

    }

});


/* =========================================================
   INICIALIZAR RESUMEN
   ========================================================= */

function inicializarResumen() {


    actualizarElemento(
        [
            "#totalProjects"
        ],
        datosGenerales.proyectos
    );


    actualizarElemento(
        [
            "#totalTasks"
        ],
        datosGenerales.tareas
    );


    actualizarElemento(
        [
            "#totalEmployees"
        ],
        datosGenerales.empleados
    );


    actualizarElemento(
        [
            "#totalMaterials"
        ],
        datosGenerales.materiales
    );

}


/* =========================================================
   ACTUALIZAR ELEMENTO
   ========================================================= */

function actualizarElemento(selectores, valor) {


    for (const selector of selectores) {

        const elemento =
            document.querySelector(selector);


        if (elemento) {

            elemento.textContent = valor;

            return;

        }

    }

}


/* =========================================================
   CARGAR PROYECTOS EN EL FILTRO
   ========================================================= */

function cargarProyectos() {


    const filtro =
        document.querySelector("#reportProject");


    if (!filtro) return;


    /* Evitar duplicar opciones */

    if (filtro.options.length > 1) {

        return;

    }


    proyectos.forEach(proyecto => {


        const opcion =
            document.createElement("option");


        opcion.value =
            proyecto.nombre;


        opcion.textContent =
            proyecto.nombre;


        filtro.appendChild(opcion);

    });

}


/* =========================================================
   INICIALIZAR FILTROS
   ========================================================= */

function inicializarFiltros() {


    const filtroProyecto =
        document.querySelector("#reportProject");


    const filtroPeriodo =
        document.querySelector("#reportPeriod");


    /* =====================================================
       FILTRO DE PROYECTO
       ===================================================== */

    if (filtroProyecto) {

        filtroProyecto.addEventListener(
            "change",
            () => {

                console.log(
                    "Proyecto seleccionado:",
                    filtroProyecto.value
                );

            }
        );

    }


    /* =====================================================
       FILTRO DE PERIODO
       ===================================================== */

    if (filtroPeriodo) {

        filtroPeriodo.addEventListener(
            "change",
            () => {

                console.log(
                    "Periodo seleccionado:",
                    filtroPeriodo.value
                );

            }
        );

    }

}


/* =========================================================
   CONVERTIR FECHA
   ========================================================= */

function convertirFecha(fechaTexto) {

    const partes =
        fechaTexto.split("/");


    if (partes.length !== 3) {

        return null;

    }


    const dia =
        parseInt(partes[0], 10);

    const mes =
        parseInt(partes[1], 10) - 1;

    const año =
        parseInt(partes[2], 10);


    return new Date(
        año,
        mes,
        dia
    );

}


/* =========================================================
   FILTRAR PROYECTOS
   ========================================================= */

function filtrarProyectos(
    proyectoSeleccionado,
    periodoSeleccionado
) {


    let resultados =
        [...proyectos];


    /* =====================================================
       FILTRO POR PROYECTO
       ===================================================== */

    if (
        proyectoSeleccionado &&
        proyectoSeleccionado !== "todos" &&
        proyectoSeleccionado !== "todos-los-proyectos" &&
        proyectoSeleccionado !== "all"
    ) {


        resultados =
            resultados.filter(
                proyecto =>
                    proyecto.nombre ===
                    proyectoSeleccionado
            );

    }


    /* =====================================================
       FILTRO POR PERIODO
       ===================================================== */

    if (
        periodoSeleccionado &&
        periodoSeleccionado !== "todo" &&
        periodoSeleccionado !== "todo-el-periodo" &&
        periodoSeleccionado !== "all"
    ) {


        const fechaActual =
            new Date();


        let fechaInicio =
            null;


        switch (periodoSeleccionado) {


            case "mes":

                fechaInicio =
                    new Date(
                        fechaActual.getFullYear(),
                        fechaActual.getMonth(),
                        1
                    );

                break;


            case "trimestre":

                fechaInicio =
                    new Date(
                        fechaActual.getFullYear(),
                        fechaActual.getMonth() - 2,
                        1
                    );

                break;


            case "semestre":

                fechaInicio =
                    new Date(
                        fechaActual.getFullYear(),
                        fechaActual.getMonth() - 5,
                        1
                    );

                break;


            case "año":
            case "anio":

                fechaInicio =
                    new Date(
                        fechaActual.getFullYear(),
                        0,
                        1
                    );

                break;


            default:

                fechaInicio = null;

        }


        if (fechaInicio) {

            resultados =
                resultados.filter(proyecto => {


                    const fechaProyecto =
                        convertirFecha(
                            proyecto.fecha
                        );


                    if (!fechaProyecto) {

                        return false;

                    }


                    return (
                        fechaProyecto >=
                        fechaInicio &&
                        fechaProyecto <=
                        fechaActual
                    );

                });

        }

    }


    return resultados;

}


/* =========================================================
   CARGAR TABLA
   ========================================================= */

function cargarTabla(lista) {


    const tabla =
        document.querySelector("#reportTable");


    if (!tabla) return;


    const tbody =
        tabla.querySelector("tbody");


    if (!tbody) return;


    tbody.innerHTML = "";


    /* =====================================================
       SIN RESULTADOS
       ===================================================== */

    if (lista.length === 0) {


        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td colspan="6" style="
                text-align:center;
                padding:30px;
                color:#94A3B8;
            ">

                No se encontraron proyectos.

            </td>

        `;


        tbody.appendChild(fila);


        actualizarMostrando(0);


        return;

    }


    /* =====================================================
       CREAR FILAS
       ===================================================== */

    lista.forEach(proyecto => {


        const fila =
            document.createElement("tr");


        const claseEstado =
            obtenerClaseEstado(
                proyecto.estado
            );


        fila.innerHTML = `

            <td>

                <div class="report-project">

                    <div class="project-icon">
                        📁
                    </div>

                    <div>

                        <strong>
                            ${proyecto.nombre}
                        </strong>

                        <span>
                            ${proyecto.tipo}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <span class="report-status ${claseEstado}">
                    ${proyecto.estado}
                </span>

            </td>


            <td>

                <div class="progress-container">

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width:${proyecto.avance}%"
                        ></div>

                    </div>

                    <span>
                        ${proyecto.avance}%
                    </span>

                </div>

            </td>


            <td>
                ${proyecto.tareas.length}
            </td>


            <td>
                ${proyecto.responsable}
            </td>


            <td>
                ${proyecto.fecha}
            </td>

        `;


        tbody.appendChild(fila);

    });


    actualizarMostrando(
        lista.length
    );

}


/* =========================================================
   CLASE DEL ESTADO DEL PROYECTO
   ========================================================= */

function obtenerClaseEstado(estado) {


    switch (estado) {


        case "Planeación":

            return "planning";


        case "En ejecución":

            return "in-progress";


        case "Finalizado":

            return "completed";


        case "Retrasado":

            return "delayed";


        default:

            return "";

    }

}


/* =========================================================
   CLASE DEL ESTADO DE LA TAREA
   ========================================================= */

function obtenerClaseEstadoTarea(estado) {


    switch (estado) {


        case "Completada":

            return "completed";


        case "En proceso":

            return "in-progress";


        case "Incompleta":

            return "incomplete";


        default:

            return "";

    }

}


/* =========================================================
   TEXTO "MOSTRANDO X PROYECTOS"
   ========================================================= */

function actualizarMostrando(cantidad) {


    const elementos =
        document.querySelectorAll(
            ".report-card-footer span"
        );


    elementos.forEach(elemento => {


        elemento.textContent =
            `Mostrando ${cantidad} proyecto${
                cantidad === 1 ? "" : "s"
            }`;

    });

}


/* =========================================================
   ACTUALIZAR RESUMEN
   ========================================================= */

function actualizarResumen(lista) {


    const cantidadProyectos =
        lista.length;


    const cantidadTareas =
        lista.reduce(
            (total, proyecto) =>
                total +
                proyecto.tareas.length,
            0
        );


    actualizarElemento(
        [
            "#totalProjects"
        ],
        cantidadProyectos
    );


    actualizarElemento(
        [
            "#totalTasks"
        ],
        cantidadTareas
    );

}


/* =========================================================
   ACTUALIZAR INDICADORES
   ========================================================= */

function actualizarIndicadores(lista) {


    const total =
        lista.length;


    if (!total) {

        actualizarIndicador(
            ".indicator-fill.completed",
            ".indicator-item:nth-child(1)",
            0,
            1
        );


        actualizarIndicador(
            ".indicator-fill.progress",
            ".indicator-item:nth-child(2)",
            0,
            1
        );


        actualizarIndicador(
            ".indicator-fill.planning",
            ".indicator-item:nth-child(3)",
            0,
            1
        );


        actualizarIndicador(
            ".indicator-fill.delayed",
            ".indicator-item:nth-child(4)",
            0,
            1
        );


        return;

    }


    const finalizados =
        lista.filter(
            proyecto =>
                proyecto.estado ===
                "Finalizado"
        ).length;


    const ejecucion =
        lista.filter(
            proyecto =>
                proyecto.estado ===
                "En ejecución"
        ).length;


    const planeacion =
        lista.filter(
            proyecto =>
                proyecto.estado ===
                "Planeación"
        ).length;


    const retrasados =
        lista.filter(
            proyecto =>
                proyecto.estado ===
                "Retrasado"
        ).length;


    actualizarIndicador(
        ".indicator-fill.completed",
        ".indicator-item:nth-child(1)",
        finalizados,
        total
    );


    actualizarIndicador(
        ".indicator-fill.progress",
        ".indicator-item:nth-child(2)",
        ejecucion,
        total
    );


    actualizarIndicador(
        ".indicator-fill.planning",
        ".indicator-item:nth-child(3)",
        planeacion,
        total
    );


    actualizarIndicador(
        ".indicator-fill.delayed",
        ".indicator-item:nth-child(4)",
        retrasados,
        total
    );

}


/* =========================================================
   ACTUALIZAR UNA BARRA INDICADORA
   ========================================================= */

function actualizarIndicador(
    selectorBarra,
    selectorItem,
    cantidad,
    total
) {


    const barra =
        document.querySelector(
            selectorBarra
        );


    const item =
        document.querySelector(
            selectorItem
        );


    if (!barra || !item) return;


    const porcentaje =
        Math.round(
            (cantidad / total) * 100
        );


    barra.style.width =
        `${porcentaje}%`;


    const valor =
        item.querySelector(
            "strong"
        );


    if (valor) {

        valor.textContent =
            `${porcentaje}%`;

    }

}


/* =========================================================
   MENSAJE DE REPORTE
   ========================================================= */

function mostrarMensajeReporte(
    tipo,
    cantidad
) {


    console.log(
        `Reporte generado: ${tipo} - ${cantidad} resultado(s)`
    );


    const mensaje =
        document.createElement("div");


    mensaje.textContent =
        `Reporte generado correctamente (${
            cantidad
        } proyecto${
            cantidad === 1 ? "" : "s"
        })`;


    mensaje.style.position =
        "fixed";


    mensaje.style.bottom =
        "25px";


    mensaje.style.right =
        "25px";


    mensaje.style.padding =
        "12px 18px";


    mensaje.style.background =
        "#0B5EA8";


    mensaje.style.color =
        "#FFFFFF";


    mensaje.style.borderRadius =
        "9px";


    mensaje.style.fontFamily =
        "Poppins, sans-serif";


    mensaje.style.fontSize =
        "12px";


    mensaje.style.fontWeight =
        "500";


    mensaje.style.zIndex =
        "9999";


    mensaje.style.boxShadow =
        "0 6px 18px rgba(0,0,0,.15)";


    document.body.appendChild(
        mensaje
    );


    setTimeout(() => {

        mensaje.remove();

    }, 2500);

}


/* =========================================================
   EXPORTAR REPORTE A EXCEL
   ========================================================= */

function exportarCSV(lista) {

    if (!lista.length) {

        alert("No hay información para exportar.");

        return;
    }


    /* =====================================================
       DATOS DEL REPORTE
       ===================================================== */

    const datos = [];


    lista.forEach(proyecto => {

        proyecto.tareas.forEach((tarea, index) => {

            datos.push({

                "Proyecto": proyecto.nombre,

                "Tipo": proyecto.tipo,

                "Estado del proyecto": proyecto.estado,

                "Avance": proyecto.avance / 100,

                "Tarea": tarea.nombre,

                "Estado de la tarea": tarea.estado,

                "Responsable": proyecto.responsable,

                "Fecha de finalización": proyecto.fecha

            });

        });

    });


    /* =====================================================
       CREAR HOJA DE EXCEL
       ===================================================== */

    const hoja =
        XLSX.utils.json_to_sheet(datos);


    /* =====================================================
       TÍTULOS DE LAS COLUMNAS
       ===================================================== */

    const encabezados = [

        "Proyecto",
        "Tipo",
        "Estado del proyecto",
        "Avance",
        "Tarea",
        "Estado de la tarea",
        "Responsable",
        "Fecha de finalización"

    ];


    /* =====================================================
       ANCHO DE LAS COLUMNAS
       ===================================================== */

    hoja["!cols"] = [

        { wch: 22 }, // Proyecto
        { wch: 18 }, // Tipo
        { wch: 22 }, // Estado
        { wch: 12 }, // Avance
        { wch: 35 }, // Tarea
        { wch: 20 }, // Estado tarea
        { wch: 22 }, // Responsable
        { wch: 24 }  // Fecha

    ];


    /* =====================================================
       FORMATO DE PORCENTAJE
       ===================================================== */

    for (
        let fila = 2;
        fila <= datos.length + 1;
        fila++
    ) {

        const celda =
            hoja[`D${fila}`];


        if (celda) {

            celda.z =
                "0%";

        }

    }


    /* =====================================================
       ESTILO DE ENCABEZADOS
       ===================================================== */

    encabezados.forEach((encabezado, indice) => {

        const columna =
            XLSX.utils.encode_col(indice);


        const celda =
            hoja[`${columna}1`];


        if (celda) {

            celda.s = {

                fill: {
                    fgColor: {
                        rgb: "0B5EA8"
                    }
                },

                font: {

                    color: {
                        rgb: "FFFFFF"
                    },

                    bold: true

                },

                alignment: {

                    horizontal: "center",

                    vertical: "center"

                },

                border: {

                    top: {
                        style: "thin",
                        color: {
                            rgb: "D1D5DB"
                        }
                    },

                    bottom: {
                        style: "thin",
                        color: {
                            rgb: "D1D5DB"
                        }
                    },

                    left: {
                        style: "thin",
                        color: {
                            rgb: "D1D5DB"
                        }
                    },

                    right: {
                        style: "thin",
                        color: {
                            rgb: "D1D5DB"
                        }
                    }

                }

            };

        }

    });


    /* =====================================================
       CREAR LIBRO
       ===================================================== */

    const libro =
        XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(

        libro,

        hoja,

        "Reporte SGSP"

    );


    /* =====================================================
       GENERAR ARCHIVO
       ===================================================== */

    XLSX.writeFile(

        libro,

        "Reporte_SGSP.xlsx"

    );


    /* =====================================================
       MENSAJE
       ===================================================== */

    mostrarMensajeExportacion(

        datos.length

    );

}

/* =========================================================
   MENSAJE DE EXPORTACIÓN
   ========================================================= */

function mostrarMensajeExportacion(
    cantidadTareas
) {


    const mensaje =
        document.createElement("div");


    mensaje.textContent =
        `Reporte exportado correctamente (${
            cantidadTareas
        } tareas incluidas)`;


    mensaje.style.position =
        "fixed";


    mensaje.style.bottom =
        "25px";


    mensaje.style.right =
        "25px";


    mensaje.style.padding =
        "12px 18px";


    mensaje.style.background =
        "#0B5EA8";


    mensaje.style.color =
        "#FFFFFF";


    mensaje.style.borderRadius =
        "9px";


    mensaje.style.fontFamily =
        "Poppins, sans-serif";


    mensaje.style.fontSize =
        "12px";


    mensaje.style.fontWeight =
        "500";


    mensaje.style.zIndex =
        "9999";


    mensaje.style.boxShadow =
        "0 6px 18px rgba(0,0,0,.15)";


    document.body.appendChild(
        mensaje
    );


    setTimeout(() => {

        mensaje.remove();

    }, 2500);

}

/* =====================================================
   CERRAR SESIÓN
===================================================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmar = confirm(
            "¿Estás seguro de que deseas cerrar sesión?"
        );

        if (confirmar) {

            window.location.href = "./index.html";

        }

    });

}