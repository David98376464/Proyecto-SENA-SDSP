/* =========================================================
   SGSP - AVANCE DE PROYECTOS DEL SUPERVISOR
   JavaScript
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const searchInput =
        document.getElementById("progressSearch");

    const filterButtons =
        document.querySelectorAll(".progress-filter");

    const projectCards =
        document.querySelectorAll(".progress-project-card");

    const viewButtons =
        document.querySelectorAll(".view-progress");

    const noResults =
        document.getElementById("noResults");


    /* MODAL */

    const modal =
        document.getElementById("progressModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalAccept =
        document.getElementById("modalAccept");


    /* DATOS DEL MODAL */

    const modalProjectName =
        document.getElementById("modalProjectName");

    const modalProjectStatus =
        document.getElementById("modalProjectStatus");

    const modalProjectProgress =
        document.getElementById("modalProjectProgress");

    const modalProjectTasks =
        document.getElementById("modalProjectTasks");

    const modalProgressNumber =
        document.getElementById("modalProgressNumber");

    const modalProgressBar =
        document.getElementById("modalProgressBar");

    const completedTasks =
        document.getElementById("completedTasks");

    const progressTasks =
        document.getElementById("progressTasks");

    const pendingTasks =
        document.getElementById("pendingTasks");


    /* =====================================================
       DATOS DE PROYECTOS
    ===================================================== */

    const projectData = {

        "Construcción Torre Norte": {

            status: "En progreso",

            progress: 78,

            tasks: 18,

            completed: 14,

            inProgress: 3,

            pending: 1

        },


        "Remodelación Oficina Central": {

            status: "En progreso",

            progress: 65,

            tasks: 20,

            completed: 13,

            inProgress: 5,

            pending: 2

        },


        "Adecuación Parque Industrial": {

            status: "Retrasado",

            progress: 42,

            tasks: 19,

            completed: 8,

            inProgress: 6,

            pending: 5

        },


        "Mejoramiento Zona Administrativa": {

            status: "Completado",

            progress: 100,

            tasks: 15,

            completed: 15,

            inProgress: 0,

            pending: 0

        }

    };


    /* =====================================================
       FILTRO ACTUAL
    ===================================================== */

    let currentFilter = "todos";


    /* =====================================================
       FILTRAR PROYECTOS
    ===================================================== */

    function filterProjects() {

        const searchText =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        let visibleProjects = 0;


        projectCards.forEach(function (card, index) {


            const projectName =
                card.dataset.name.toLowerCase();


            const projectStatus =
                card.dataset.status;


            /* Coincidencia de búsqueda */

            const matchesSearch =
                projectName.includes(searchText);


            /* Coincidencia de filtro */

            const matchesFilter =
                currentFilter === "todos" ||
                projectStatus === currentFilter;


            /* Mostrar */

            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.style.display = "block";

                card.style.animation =
                    "projectIn 0.35s ease both";

                card.style.animationDelay =
                    (index * 0.05) + "s";

                visibleProjects++;

            }

            /* Ocultar */

            else {

                card.style.display = "none";

            }

        });


        /* =================================================
           SIN RESULTADOS
        ================================================= */

        if (visibleProjects === 0) {

            noResults.style.display = "block";

        }

        else {

            noResults.style.display = "none";

        }

    }


    /* =====================================================
       BUSCADOR
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProjects
        );

    }


    /* =====================================================
       FILTROS
    ===================================================== */

    filterButtons.forEach(function (button) {


        button.addEventListener(
            "click",
            function () {


                /* Quitar active */

                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });


                /* Activar seleccionado */

                button.classList.add("active");


                /* Obtener filtro */

                currentFilter =
                    button.dataset.filter;


                /* Filtrar */

                filterProjects();

            }
        );

    });


    /* =====================================================
       ABRIR MODAL
    ===================================================== */

    viewButtons.forEach(function (button) {


        button.addEventListener(
            "click",
            function () {


                const projectName =
                    button.dataset.project;


                const data =
                    projectData[projectName];


                if (!data) {

                    return;

                }


                /* Nombre */

                modalProjectName.textContent =
                    projectName;


                /* Estado */

                modalProjectStatus.textContent =
                    data.status;


                /* Avance */

                modalProjectProgress.textContent =
                    data.progress + "%";


                modalProgressNumber.textContent =
                    data.progress + "%";


                /* Tareas */

                modalProjectTasks.textContent =
                    data.tasks;


                completedTasks.textContent =
                    data.completed;


                progressTasks.textContent =
                    data.inProgress;


                pendingTasks.textContent =
                    data.pending;


                /* Color del progreso */

                modalProgressBar.className =
                    "modal-progress-bar";


                if (data.status === "Retrasado") {

                    modalProgressBar.style.background =
                        "#e2a12b";

                }

                else if (data.status === "Completado") {

                    modalProgressBar.style.background =
                        "#15945b";

                }

                else {

                    modalProgressBar.style.background =
                        "#1671b9";

                }


                /* Reiniciar barra */

                modalProgressBar.style.width =
                    "0";


                /* Mostrar modal */

                modal.classList.add("show");


                /* Animar barra */

                setTimeout(function () {

                    modalProgressBar.style.width =
                        data.progress + "%";

                }, 100);

            }
        );

    });


    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    function closeModal() {

        modal.classList.remove("show");

    }


    /* BOTÓN X */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    /* BOTÓN ENTENDIDO */

    if (modalAccept) {

        modalAccept.addEventListener(
            "click",
            closeModal
        );

    }


    /* =====================================================
       CERRAR AL HACER CLICK AFUERA
    ===================================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    /* =====================================================
       CERRAR CON ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" ||
                event.key === "Esc"
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       ANIMACIÓN DE BARRAS
    ===================================================== */

    const progressBars =
        document.querySelectorAll(".progress-bar");


    progressBars.forEach(function (bar) {


        const finalWidth =
            bar.style.width;


        /* Comenzar desde cero */

        bar.style.width =
            "0";


        /* Animar */

        setTimeout(function () {

            bar.style.width =
                finalWidth;

        }, 300);

    });


    /* =====================================================
       INICIALIZAR
    ===================================================== */

    filterProjects();

});