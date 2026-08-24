/* =========================================================
   SGSP - PROYECTOS DEL SUPERVISOR
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const searchInput = document.getElementById("projectSearch");

    const filterButtons = document.querySelectorAll(".filter-button");

    const projectCards = document.querySelectorAll(".project-card");

    const viewButtons = document.querySelectorAll(".view-project");

    const modal = document.getElementById("projectModal");

    const modalClose = document.getElementById("modalClose");

    const modalAccept = document.getElementById("modalAccept");

    const modalTitle = document.getElementById("modalTitle");

    const modalStatus = document.getElementById("modalStatus");

    const modalProgress = document.getElementById("modalProgress");


    /* =====================================================
       FILTRO ACTUAL
    ===================================================== */

    let currentFilter = "todos";


    /* =====================================================
       FUNCIÓN PARA MOSTRAR PROYECTOS
    ===================================================== */

    function filterProjects() {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


        projectCards.forEach(function (card) {

            const projectName =
                card.dataset.name.toLowerCase();

            const projectStatus =
                card.dataset.status;


            /* Buscar por nombre */

            const matchesSearch =
                projectName.includes(searchText);


            /* Filtrar por estado */

            const matchesFilter =
                currentFilter === "todos" ||
                projectStatus === currentFilter;


            /* Mostrar u ocultar */

            if (matchesSearch && matchesFilter) {

                card.style.display = "block";

                card.style.animation =
                    "projectCardIn 0.35s ease both";

            } else {

                card.style.display = "none";

            }

        });

    }


    /* =====================================================
       BUSCADOR
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterProjects();

            }
        );

    }


    /* =====================================================
       BOTONES DE FILTRO
    ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                /* Quitar active de todos */

                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });


                /* Activar botón seleccionado */

                button.classList.add("active");


                /* Obtener filtro */

                currentFilter =
                    button.dataset.filter;


                /* Aplicar filtro */

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


                /* Buscar la tarjeta correspondiente */

                let selectedCard = null;


                projectCards.forEach(function (card) {

                    if (
                        card.dataset.name === projectName
                    ) {

                        selectedCard = card;

                    }

                });


                if (!selectedCard) {

                    return;

                }


                /* Obtener estado */

                const statusElement =
                    selectedCard.querySelector(".status");


                const statusText =
                    statusElement
                        ? statusElement.textContent.trim()
                        : "Sin información";


                /* Obtener avance */

                const progressElement =
                    selectedCard.querySelector(
                        ".progress-header strong"
                    );


                const progressText =
                    progressElement
                        ? progressElement.textContent.trim()
                        : "0%";


                /* Mostrar información */

                if (modalTitle) {

                    modalTitle.textContent =
                        projectName;

                }


                if (modalStatus) {

                    modalStatus.textContent =
                        statusText;

                }


                if (modalProgress) {

                    modalProgress.textContent =
                        progressText;

                }


                /* Mostrar modal */

                if (modal) {

                    modal.classList.add("show");

                }

            }
        );

    });


    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    function closeModal() {

        if (modal) {

            modal.classList.remove("show");

        }

    }


    /* Botón X */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    /* Botón Entendido */

    if (modalAccept) {

        modalAccept.addEventListener(
            "click",
            closeModal
        );

    }


    /* =====================================================
       CERRAR MODAL AL HACER CLICK AFUERA
    ===================================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    closeModal();

                }

            }
        );

    }


    /* =====================================================
       CERRAR MODAL CON ESC
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
       ANIMACIÓN DE BARRAS DE PROGRESO
    ===================================================== */

    const progressBars =
        document.querySelectorAll(".progress-bar");


    progressBars.forEach(function (bar) {

        const finalWidth =
            bar.style.width;


        /* Empezar desde cero */

        bar.style.width = "0";


        /* Animar después de cargar */

        setTimeout(function () {

            bar.style.width =
                finalWidth;

        }, 300);

    });


    /* =====================================================
       ANIMACIÓN INICIAL DE TARJETAS
    ===================================================== */

    projectCards.forEach(function (card, index) {

        card.style.animationDelay =
            (index * 0.08) + "s";

    });


    /* =====================================================
       INICIO
    ===================================================== */

    filterProjects();

});