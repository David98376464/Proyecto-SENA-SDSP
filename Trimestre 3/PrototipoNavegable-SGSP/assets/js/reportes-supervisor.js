/* =========================================================
   SGSP - REPORTES DEL SUPERVISOR
========================================================= */


/* =========================================================
   DATOS
========================================================= */

const proyectosSupervisor = [

    {
        nombre: "Construcción Torre Norte",
        tipo: "Construcción",
        estado: "En progreso",
        avance: 78,
        responsable: "Carlos Rodríguez",
        fecha: "30/09/2026",

        tareas: [
            {
                nombre: "Preparación del terreno",
                estado: "Completada"
            },
            {
                nombre: "Cimentación",
                estado: "Completada"
            },
            {
                nombre: "Levantamiento de estructura",
                estado: "En proceso"
            },
            {
                nombre: "Instalaciones",
                estado: "Pendiente"
            }
        ]
    },


    {
        nombre: "Remodelación Oficina Central",
        tipo: "Remodelación",
        estado: "En progreso",
        avance: 65,
        responsable: "Laura Martínez",
        fecha: "15/10/2026",

        tareas: [
            {
                nombre: "Demolición",
                estado: "Completada"
            },
            {
                nombre: "Preparación eléctrica",
                estado: "Completada"
            },
            {
                nombre: "Instalación de acabados",
                estado: "En proceso"
            },
            {
                nombre: "Pintura",
                estado: "Pendiente"
            },
            {
                nombre: "Limpieza",
                estado: "Pendiente"
            }
        ]
    },


    {
        nombre: "Adecuación Parque Industrial",
        tipo: "Adecuación",
        estado: "Retrasado",
        avance: 42,
        responsable: "Andrés Gómez",
        fecha: "20/09/2026",

        tareas: [
            {
                nombre: "Inspección inicial",
                estado: "Completada"
            },
            {
                nombre: "Preparación del área",
                estado: "Completada"
            },
            {
                nombre: "Instalación",
                estado: "En proceso"
            },
            {
                nombre: "Revisión",
                estado: "Pendiente"
            },
            {
                nombre: "Entrega",
                estado: "Pendiente"
            }
        ]
    },


    {
        nombre: "Mejoramiento Zona Administrativa",
        tipo: "Mejoramiento",
        estado: "Completado",
        avance: 100,
        responsable: "María López",
        fecha: "10/08/2026",

        tareas: [
            {
                nombre: "Diagnóstico",
                estado: "Completada"
            },
            {
                nombre: "Adecuación",
                estado: "Completada"
            },
            {
                nombre: "Instalación",
                estado: "Completada"
            },
            {
                nombre: "Inspección final",
                estado: "Completada"
            }
        ]
    }

];


/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTOS
        ================================================= */

        const reportType =
            document.getElementById("reportType");

        const reportProject =
            document.getElementById("reportProject");

        const reportPeriod =
            document.getElementById("reportPeriod");

        const generateButton =
            document.getElementById("generateReportBtn");

        const exportButton =
            document.getElementById("exportReportBtn");

        const tableBody =
            document.getElementById("reportTableBody");

        const reportTitle =
            document.getElementById("reportTitle");

        const reportDescription =
            document.getElementById("reportDescription");

        const reportMessage =
            document.getElementById("reportMessage");


        /* =================================================
           CARGAR PROYECTOS EN SELECT
        ================================================= */

        function cargarProyectos() {

            proyectosSupervisor.forEach(
                function (proyecto) {

                    const option =
                        document.createElement("option");

                    option.value =
                        proyecto.nombre;

                    option.textContent =
                        proyecto.nombre;

                    reportProject.appendChild(option);

                }
            );

        }


        /* =================================================
           OBTENER RESULTADOS
        ================================================= */

        function obtenerResultados() {

            const proyectoSeleccionado =
                reportProject.value;

            let resultados =
                [...proyectosSupervisor];


            if (
                proyectoSeleccionado !== "all"
            ) {

                resultados =
                    resultados.filter(
                        function (proyecto) {

                            return (
                                proyecto.nombre ===
                                proyectoSeleccionado
                            );

                        }
                    );

            }


            return resultados;

        }


        /* =================================================
           CARGAR TABLA
        ================================================= */

        function cargarTabla(resultados) {


            tableBody.innerHTML = "";


            if (
                resultados.length === 0
            ) {

                const row =
                    document.createElement("tr");

                row.innerHTML = `
                    <td
                        colspan="6"
                        class="empty-row">

                        No hay información
                        para mostrar.

                    </td>
                `;

                tableBody.appendChild(row);

                return;

            }


            resultados.forEach(
                function (proyecto) {


                    const row =
                        document.createElement("tr");


                    let estadoClase =
                        "status-progress";


                    if (
                        proyecto.estado ===
                        "Completado"
                    ) {

                        estadoClase =
                            "status-completed";

                    }

                    else if (
                        proyecto.estado ===
                        "Retrasado"
                    ) {

                        estadoClase =
                            "status-delayed";

                    }


                    else if (
                        proyecto.estado ===
                        "Planeación"
                    ) {

                        estadoClase =
                            "status-planning";

                    }


                    row.innerHTML = `

                        <td>

                            <span class="project-name">

                                ${proyecto.nombre}

                            </span>

                        </td>


                        <td>

                            ${proyecto.tipo}

                        </td>


                        <td>

                            <span
                                class="status-badge ${estadoClase}">

                                ${proyecto.estado}

                            </span>

                        </td>


                        <td class="progress-cell">

                            <div class="progress-info">

                                <span>
                                    Avance
                                </span>

                                <strong>
                                    ${proyecto.avance}%
                                </strong>

                            </div>


                            <div class="table-progress">

                                <div
                                    class="table-progress-bar"
                                    style="width: ${proyecto.avance}%">

                                </div>

                            </div>

                        </td>


                        <td>

                            ${proyecto.responsable}

                        </td>


                        <td>

                            ${proyecto.fecha}

                        </td>

                    `;


                    tableBody.appendChild(row);

                }
            );

        }


        /* =================================================
           ACTUALIZAR RESUMEN
        ================================================= */

        function actualizarResumen(resultados) {


            const totalProjects =
                resultados.length;


            let totalTasks = 0;

            let totalProgress = 0;

            let delayed = 0;


            resultados.forEach(
                function (proyecto) {

                    totalTasks +=
                        proyecto.tareas.length;

                    totalProgress +=
                        proyecto.avance;


                    if (
                        proyecto.estado ===
                        "Retrasado"
                    ) {

                        delayed++;

                    }

                }
            );


            const averageProgress =
                totalProjects > 0
                    ? Math.round(
                        totalProgress /
                        totalProjects
                    )
                    : 0;


            document.getElementById(
                "totalProjects"
            ).textContent =
                totalProjects;


            document.getElementById(
                "totalTasks"
            ).textContent =
                totalTasks;


            document.getElementById(
                "averageProgress"
            ).textContent =
                averageProgress + "%";


            document.getElementById(
                "delayedProjects"
            ).textContent =
                delayed;

        }


        /* =================================================
           ACTUALIZAR TÍTULO
        ================================================= */

        function actualizarTitulo() {


            const tipo =
                reportType.value;


            if (
                tipo === "tareas"
            ) {

                reportTitle.textContent =
                    "Reporte de tareas";

                reportDescription.textContent =
                    "Resumen de las tareas de los proyectos asignados";

            }

            else {

                reportTitle.textContent =
                    "Reporte de proyectos";

                reportDescription.textContent =
                    "Resumen del estado actual de los proyectos asignados";

            }

        }


        /* =================================================
           GENERAR REPORTE
        ================================================= */

        function generarReporte() {


            const resultados =
                obtenerResultados();


            cargarTabla(
                resultados
            );


            actualizarResumen(
                resultados
            );


            actualizarTitulo();


            reportMessage.textContent =
                "Reporte generado correctamente.";

            reportMessage.style.display =
                "block";


            setTimeout(
                function () {

                    reportMessage.style.display =
                        "none";

                },
                3000
            );

        }


        /* =================================================
           EXPORTAR A EXCEL
        ================================================= */

        function exportarExcel() {


            const resultados =
                obtenerResultados();


            if (
                resultados.length === 0
            ) {

                alert(
                    "No hay información para exportar."
                );

                return;

            }


            /* =================================================
               CREAR DATOS
            ================================================= */

            const datos = [];


            resultados.forEach(
                function (proyecto) {


                    proyecto.tareas.forEach(
                        function (tarea) {


                            datos.push({

                                "Proyecto":
                                    proyecto.nombre,

                                "Tipo":
                                    proyecto.tipo,

                                "Estado del proyecto":
                                    proyecto.estado,

                                "Avance":
                                    proyecto.avance + "%",

                                "Tarea":
                                    tarea.nombre,

                                "Estado de la tarea":
                                    tarea.estado,

                                "Responsable":
                                    proyecto.responsable,

                                "Fecha de finalización":
                                    proyecto.fecha

                            });

                        }
                    );

                }
            );


            /* =================================================
               CREAR HOJA
            ================================================= */

            const hoja =
                XLSX.utils.json_to_sheet(
                    datos
                );


            /* =================================================
               ANCHOS
            ================================================= */

            hoja["!cols"] = [

                {
                    wch: 30
                },

                {
                    wch: 18
                },

                {
                    wch: 22
                },

                {
                    wch: 12
                },

                {
                    wch: 32
                },

                {
                    wch: 20
                },

                {
                    wch: 25
                },

                {
                    wch: 22
                }

            ];


            /* =================================================
               CREAR LIBRO
            ================================================= */

            const libro =
                XLSX.utils.book_new();


            XLSX.utils.book_append_sheet(
                libro,
                hoja,
                "Reporte Supervisor"
            );


            /* =================================================
               NOMBRE DEL ARCHIVO
            ================================================= */

            const fecha =
                new Date()
                    .toISOString()
                    .slice(0, 10);


            const nombreArchivo =
                "Reporte_Supervisor_" +
                fecha +
                ".xlsx";


            /* =================================================
               DESCARGAR
            ================================================= */

            XLSX.writeFile(
                libro,
                nombreArchivo
            );


            reportMessage.textContent =
                "El reporte fue exportado correctamente a Excel.";

            reportMessage.style.display =
                "block";


            setTimeout(
                function () {

                    reportMessage.style.display =
                        "none";

                },
                3500
            );

        }


        /* =================================================
           EVENTOS
        ================================================= */

        generateButton.addEventListener(
            "click",
            generarReporte
        );


        exportButton.addEventListener(
            "click",
            exportarExcel
        );


        reportType.addEventListener(
            "change",
            actualizarTitulo
        );


        /* =================================================
           INICIALIZAR
        ================================================= */

        cargarProyectos();


        cargarTabla(
            proyectosSupervisor
        );


        actualizarResumen(
            proyectosSupervisor
        );


        actualizarTitulo();

    }

);