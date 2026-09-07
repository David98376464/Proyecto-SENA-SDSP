/* =========================================================
   SGSP - TAREAS SUPERVISOR
   JavaScript específico para tareas-supervisor.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const searchInput = document.getElementById("searchTask");
    const filterStatus = document.getElementById("filterStatus");
    const filterPriority = document.getElementById("filterPriority");
    const tasksBody = document.getElementById("tasksBody");
    const taskCount = document.getElementById("taskCount");

    if (!tasksBody) {
        console.error("SGSP: No se encontró #tasksBody");
        return;
    }


    /* =====================================================
       FUNCIONES AUXILIARES
       ===================================================== */

    function getTaskRows() {
        return Array.from(
            tasksBody.querySelectorAll("tr:not(.no-results-row)")
        );
    }


    function getTaskData(row) {

        const cells = row.querySelectorAll("td");

        if (cells.length < 7) {
            return null;
        }

        const taskNameElement = row.querySelector(".task-name strong");
        const categoryElement = row.querySelector(".task-name span");
        const priorityElement = row.querySelector(".priority");
        const statusElement = row.querySelector(".status");

        return {
            row: row,

            task: taskNameElement
                ? taskNameElement.textContent.trim()
                : "",

            category: categoryElement
                ? categoryElement.textContent.trim()
                : "",

            project: cells[1].textContent.trim(),

            responsible: cells[2].textContent.trim(),

            date: cells[3].textContent.trim(),

            priority: priorityElement
                ? priorityElement.textContent.trim()
                : "",

            status: statusElement
                ? statusElement.textContent.trim()
                : "",

            statusElement: statusElement,
            priorityElement: priorityElement
        };
    }


    /* =====================================================
       CONTADOR
       ===================================================== */

    function updateTaskCount(visibleCount) {

        if (!taskCount) {
            return;
        }

        taskCount.textContent =
            visibleCount === 1
                ? "1 tarea"
                : `${visibleCount} tareas`;
    }


    /* =====================================================
       FILTRAR TAREAS
       ===================================================== */

    function filterTasks() {

        const searchValue =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

        const selectedStatus =
            filterStatus
                ? filterStatus.value
                : "all";

        const selectedPriority =
            filterPriority
                ? filterPriority.value
                : "all";

        const rows = getTaskRows();

        let visibleCount = 0;

        rows.forEach(function (row) {

            const data = getTaskData(row);

            if (!data) {
                return;
            }

            const completeText = [
                data.task,
                data.category,
                data.project,
                data.responsible,
                data.date,
                data.priority,
                data.status
            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                searchValue === "" ||
                completeText.includes(searchValue);


            const matchesStatus =
                selectedStatus === "all" ||
                data.status === selectedStatus;


            const matchesPriority =
                selectedPriority === "all" ||
                data.priority === selectedPriority;


            const shouldShow =
                matchesSearch &&
                matchesStatus &&
                matchesPriority;


            row.style.display =
                shouldShow
                    ? ""
                    : "none";


            if (shouldShow) {
                visibleCount++;
            }
        });


        updateTaskCount(visibleCount);

        showNoResultsMessage(
            visibleCount === 0,
            rows.length > 0
        );
    }


    /* =====================================================
       MENSAJE SIN RESULTADOS
       ===================================================== */

    function showNoResultsMessage(show, hasRows) {

        let messageRow =
            tasksBody.querySelector(".no-results-row");


        if (show && hasRows) {

            if (!messageRow) {

                messageRow =
                    document.createElement("tr");

                messageRow.className =
                    "no-results-row";

                messageRow.innerHTML = `
                    <td colspan="7">
                        <div class="no-results">
                            <div class="no-results-icon">🔍</div>
                            <strong>No se encontraron tareas</strong>
                            <span>Intenta cambiar los filtros o el término de búsqueda.</span>
                        </div>
                    </td>
                `;

                tasksBody.appendChild(messageRow);
            }

            messageRow.style.display = "";

        } else if (messageRow) {

            messageRow.style.display = "none";
        }
    }


    /* =====================================================
       MODAL BASE
       ===================================================== */

    function createModal() {

        const overlay =
            document.createElement("div");

        overlay.className =
            "sgsp-modal-overlay";

        overlay.innerHTML = `
            <div class="sgsp-modal" role="dialog" aria-modal="true">

                <div class="sgsp-modal-header">

                    <h3 id="sgspModalTitle">
                        Detalle de tarea
                    </h3>

                    <button
                        type="button"
                        class="sgsp-modal-close"
                        id="sgspModalClose"
                        aria-label="Cerrar">
                        ×
                    </button>

                </div>

                <div
                    class="sgsp-modal-body"
                    id="sgspModalBody">
                </div>

                <div
                    class="sgsp-modal-footer"
                    id="sgspModalFooter">
                </div>

            </div>
        `;

        document.body.appendChild(overlay);

        return overlay;
    }


    function closeModal(overlay) {

        if (!overlay) {
            return;
        }

        overlay.classList.remove("show");

        setTimeout(function () {
            overlay.remove();
        }, 250);
    }


    function setupModalClose(overlay) {

        const closeButton =
            overlay.querySelector("#sgspModalClose");

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {
                    closeModal(overlay);
                }
            );
        }


        overlay.addEventListener(
            "click",
            function (event) {

                if (event.target === overlay) {
                    closeModal(overlay);
                }

            }
        );


        document.addEventListener(
            "keydown",
            function escapeHandler(event) {

                if (event.key === "Escape") {

                    closeModal(overlay);

                    document.removeEventListener(
                        "keydown",
                        escapeHandler
                    );
                }

            }
        );
    }


    /* =====================================================
       VER TAREA
       ===================================================== */

    function viewTask(row) {

        const data = getTaskData(row);

        if (!data) {
            return;
        }


        const modal = createModal();

        const title =
            modal.querySelector("#sgspModalTitle");

        const body =
            modal.querySelector("#sgspModalBody");

        const footer =
            modal.querySelector("#sgspModalFooter");


        title.textContent =
            data.task;


        body.innerHTML = `
            <div class="sgsp-detail-grid">

                <div class="sgsp-detail full">
                    <span class="sgsp-detail-label">
                        Tarea
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.task)}
                    </span>
                </div>

                <div class="sgsp-detail">
                    <span class="sgsp-detail-label">
                        Categoría
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.category)}
                    </span>
                </div>

                <div class="sgsp-detail">
                    <span class="sgsp-detail-label">
                        Proyecto
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.project)}
                    </span>
                </div>

                <div class="sgsp-detail">
                    <span class="sgsp-detail-label">
                        Responsable
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.responsible)}
                    </span>
                </div>

                <div class="sgsp-detail">
                    <span class="sgsp-detail-label">
                        Fecha límite
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.date)}
                    </span>
                </div>

                <div class="sgsp-detail">
                    <span class="sgsp-detail-label">
                        Prioridad
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.priority)}
                    </span>
                </div>

                <div class="sgsp-detail">
                    <span class="sgsp-detail-label">
                        Estado
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.status)}
                    </span>
                </div>

            </div>
        `;


        footer.innerHTML = `
            <button
                type="button"
                class="sgsp-btn primary"
                id="sgspCloseView">
                Cerrar
            </button>
        `;


        footer
            .querySelector("#sgspCloseView")
            .addEventListener(
                "click",
                function () {
                    closeModal(modal);
                }
            );


        setupModalClose(modal);


        requestAnimationFrame(function () {
            modal.classList.add("show");
        });
    }


    /* =====================================================
       ACTUALIZAR ESTADO
       ===================================================== */

    function updateTask(row) {

        const data = getTaskData(row);

        if (!data) {
            return;
        }


        const modal = createModal();

        const title =
            modal.querySelector("#sgspModalTitle");

        const body =
            modal.querySelector("#sgspModalBody");

        const footer =
            modal.querySelector("#sgspModalFooter");


        title.textContent =
            "Actualizar tarea";


        body.innerHTML = `
            <div class="sgsp-detail-grid">

                <div class="sgsp-detail full">

                    <span class="sgsp-detail-label">
                        Tarea
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.task)}
                    </span>

                </div>

                <div class="sgsp-detail">

                    <span class="sgsp-detail-label">
                        Proyecto
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.project)}
                    </span>

                </div>

                <div class="sgsp-detail">

                    <span class="sgsp-detail-label">
                        Responsable
                    </span>

                    <span class="sgsp-detail-value">
                        ${escapeHTML(data.responsible)}
                    </span>

                </div>

                <div class="sgsp-detail full">

                    <label
                        class="sgsp-detail-label"
                        for="sgspStatusSelect">
                        Nuevo estado
                    </label>

                    <select
                        id="sgspStatusSelect"
                        class="sgsp-status-select">

                        <option value="Pendiente">
                            Pendiente
                        </option>

                        <option value="En progreso">
                            En progreso
                        </option>

                        <option value="Completada">
                            Completada
                        </option>

                    </select>

                </div>

            </div>
        `;


        const statusSelect =
            body.querySelector("#sgspStatusSelect");

        statusSelect.value =
            data.status;


        footer.innerHTML = `
            <button
                type="button"
                class="sgsp-btn"
                id="sgspCancelUpdate">
                Cancelar
            </button>

            <button
                type="button"
                class="sgsp-btn primary"
                id="sgspSaveUpdate">
                Guardar cambios
            </button>
        `;


        footer
            .querySelector("#sgspCancelUpdate")
            .addEventListener(
                "click",
                function () {
                    closeModal(modal);
                }
            );


        footer
            .querySelector("#sgspSaveUpdate")
            .addEventListener(
                "click",
                function () {

                    const newStatus =
                        statusSelect.value;

                    changeTaskStatus(
                        row,
                        newStatus
                    );

                    closeModal(modal);

                    filterTasks();

                    showNotification(
                        "Tarea actualizada correctamente."
                    );
                }
            );


        setupModalClose(modal);


        requestAnimationFrame(function () {
            modal.classList.add("show");
        });
    }


    /* =====================================================
       CAMBIAR ESTADO VISUAL
       ===================================================== */

    function changeTaskStatus(row, newStatus) {

        const statusElement =
            row.querySelector(".status");

        if (!statusElement) {
            return;
        }


        statusElement.textContent =
            newStatus;


        statusElement.classList.remove(
            "pending",
            "active",
            "completed"
        );


        if (newStatus === "Pendiente") {

            statusElement.classList.add(
                "pending"
            );

        } else if (newStatus === "En progreso") {

            statusElement.classList.add(
                "active"
            );

        } else if (newStatus === "Completada") {

            statusElement.classList.add(
                "completed"
            );
        }
    }


    /* =====================================================
       ESCAPAR HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       NOTIFICACIÓN
       ===================================================== */

    function showNotification(message) {

        const existing =
            document.querySelector(
                ".sgsp-task-notification"
            );


        if (existing) {
            existing.remove();
        }


        const notification =
            document.createElement("div");

        notification.className =
            "sgsp-task-notification";

        notification.textContent =
            message;


        notification.style.cssText = `
            position: fixed;
            top: 25px;
            right: 25px;
            z-index: 10000;
            padding: 13px 18px;
            border-radius: 9px;
            background: #263238;
            color: #ffffff;
            font-family: 'Poppins', sans-serif;
            font-size: 12px;
            font-weight: 500;
            box-shadow: 0 8px 25px rgba(0,0,0,0.16);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.25s ease;
        `;


        document.body.appendChild(
            notification
        );


        requestAnimationFrame(function () {

            notification.style.opacity = "1";

            notification.style.transform =
                "translateY(0)";
        });


        setTimeout(function () {

            notification.style.opacity = "0";

            notification.style.transform =
                "translateY(-10px)";


            setTimeout(function () {

                notification.remove();

            }, 250);

        }, 2500);
    }


    /* =====================================================
       BOTONES DE LA TABLA
       ===================================================== */

    function initializeActionButtons() {

        const rows = getTaskRows();

        rows.forEach(function (row) {

            const buttons =
                row.querySelectorAll(
                    ".action-buttons button"
                );


            buttons.forEach(function (button) {

                const title =
                    button.getAttribute("title");


                if (title === "Ver") {

                    button.addEventListener(
                        "click",
                        function () {
                            viewTask(row);
                        }
                    );
                }


                if (title === "Actualizar") {

                    button.addEventListener(
                        "click",
                        function () {
                            updateTask(row);
                        }
                    );
                }

            });

        });
    }


    /* =====================================================
       EVENTOS DE FILTROS
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterTasks
        );
    }


    if (filterStatus) {

        filterStatus.addEventListener(
            "change",
            filterTasks
        );
    }


    if (filterPriority) {

        filterPriority.addEventListener(
            "change",
            filterTasks
        );
    }


    /* =====================================================
       INICIALIZACIÓN
       ===================================================== */

    initializeActionButtons();

    filterTasks();

});