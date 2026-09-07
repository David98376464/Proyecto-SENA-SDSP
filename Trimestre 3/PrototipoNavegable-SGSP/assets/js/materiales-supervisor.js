/* =========================================================
   SGSP - MATERIALES DEL SUPERVISOR
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const searchInput =
        document.getElementById("materialSearch");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const materialRows =
        document.querySelectorAll(".material-row");

    const viewButtons =
        document.querySelectorAll(".view-material");

    const modal =
        document.getElementById("materialModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalAccept =
        document.getElementById("modalAccept");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalProject =
        document.getElementById("modalProject");

    const modalAvailable =
        document.getElementById("modalAvailable");

    const modalMinimum =
        document.getElementById("modalMinimum");

    const modalStatus =
        document.getElementById("modalStatus");


    /* =====================================================
       FILTRO ACTUAL
    ===================================================== */

    let currentFilter = "todos";


    /* =====================================================
       FILTRAR MATERIALES
    ===================================================== */

    function filterMaterials() {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


        materialRows.forEach(function (row) {

            const materialName =
                row.dataset.name.toLowerCase();

            const materialStatus =
                row.dataset.status;


            /* Buscar por nombre */

            const matchesSearch =
                materialName.includes(searchText);


            /* Filtrar por estado */

            const matchesFilter =
                currentFilter === "todos" ||
                materialStatus === currentFilter;


            /* Mostrar / ocultar */

            if (
                matchesSearch &&
                matchesFilter
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

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

                filterMaterials();

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

                /* Quitar active */

                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });


                /* Activar botón */

                button.classList.add("active");


                /* Obtener filtro */

                currentFilter =
                    button.dataset.filter;


                /* Aplicar */

                filterMaterials();

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

                const materialName =
                    button.dataset.material;


                /* Buscar fila */

                let selectedRow = null;


                materialRows.forEach(function (row) {

                    if (
                        row.dataset.name === materialName
                    ) {

                        selectedRow = row;

                    }

                });


                if (!selectedRow) {

                    return;

                }


                /* =========================================
                   OBTENER INFORMACIÓN
                ========================================= */

                const cells =
                    selectedRow.querySelectorAll("td");


                /* Proyecto */

                const project =
                    cells[1]
                        ? cells[1].textContent.trim()
                        : "-";


                /* Disponible */

                const available =
                    cells[2]
                        ? cells[2].textContent.trim()
                        : "-";


                /* Mínimo */

                const minimum =
                    cells[3]
                        ? cells[3].textContent.trim()
                        : "-";


                /* Estado */

                const statusElement =
                    selectedRow.querySelector(".status");


                const status =
                    statusElement
                        ? statusElement.textContent.trim()
                        : "-";


                /* =========================================
                   MOSTRAR INFORMACIÓN
                ========================================= */

                if (modalTitle) {

                    modalTitle.textContent =
                        materialName;

                }


                if (modalProject) {

                    modalProject.textContent =
                        project;

                }


                if (modalAvailable) {

                    modalAvailable.textContent =
                        available;

                }


                if (modalMinimum) {

                    modalMinimum.textContent =
                        minimum;

                }


                if (modalStatus) {

                    modalStatus.textContent =
                        status;

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


    /* =====================================================
       BOTÓN X
    ===================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    /* =====================================================
       BOTÓN ENTENDIDO
    ===================================================== */

    if (modalAccept) {

        modalAccept.addEventListener(
            "click",
            closeModal
        );

    }


    /* =====================================================
       CERRAR HACIENDO CLICK AFUERA
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
       INICIO
    ===================================================== */

    filterMaterials();

});