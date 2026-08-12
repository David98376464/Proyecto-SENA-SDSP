// ==================================================
// ELEMENTOS PRINCIPALES
// ==================================================

const searchTask = document.getElementById("searchTask");

const filterTaskStatus =
    document.getElementById("filterTaskStatus");

const filterTaskProject =
    document.getElementById("filterTaskProject");

const tasksBody =
    document.getElementById("tasksBody");

const taskCount =
    document.getElementById("taskCount");

const newTaskBtn =
    document.getElementById("newTaskBtn");


// ==================================================
// BUSCAR Y FILTRAR TAREAS
// ==================================================

function filterTasks() {

    const searchText =
        searchTask.value
            .toLowerCase()
            .trim();


    const selectedStatus =
        filterTaskStatus.value;


    const selectedProject =
        filterTaskProject.value;


    const rows =
        tasksBody.querySelectorAll("tr");


    let visibleTasks = 0;


    rows.forEach(row => {

        const taskText =
            row.textContent
                .toLowerCase();


        const statusElement =
            row.querySelector(".task-status");


        const status =
            statusElement
                ? statusElement.textContent.trim()
                : "";


        const cells =
            row.querySelectorAll("td");


        const project =
            cells[1]
                ? cells[1].textContent.trim()
                : "";


        const matchesSearch =
            taskText.includes(searchText);


        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        const matchesProject =
            selectedProject === "all" ||
            project === selectedProject;


        if (
            matchesSearch &&
            matchesStatus &&
            matchesProject
        ) {

            row.style.display = "";

            visibleTasks++;

        } else {

            row.style.display = "none";

        }

    });


    taskCount.textContent =
        visibleTasks === 1
            ? "1 tarea"
            : `${visibleTasks} tareas`;

}


// ==================================================
// EVENTOS DE BÚSQUEDA Y FILTROS
// ==================================================

searchTask.addEventListener(
    "input",
    filterTasks
);


filterTaskStatus.addEventListener(
    "change",
    filterTasks
);


filterTaskProject.addEventListener(
    "change",
    filterTasks
);


// ==================================================
// NUEVA TAREA
// ==================================================

newTaskBtn.addEventListener(
    "click",
    () => {

        openNewTaskModal();

    }
);


// ==================================================
// CREAR MODAL NUEVA TAREA
// ==================================================

function openNewTaskModal() {

    let modal =
        document.getElementById("newTaskModal");


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "newTaskModal";

        modal.className =
            "task-modal";


        document.body.appendChild(modal);

    }


    modal.innerHTML = `

        <div class="task-modal-content">

            <div class="task-modal-header">

                <h2>
                    Nueva tarea
                </h2>

                <button
                    type="button"
                    class="close-task-modal">
                    ×
                </button>

            </div>


            <form id="newTaskForm">


                <div class="task-form-group">

                    <label>
                        Nombre de la tarea
                    </label>

                    <input
                        type="text"
                        id="newTaskName"
                        placeholder="Nombre de la tarea"
                        required>

                </div>


                <div class="task-form-group">

                    <label>
                        Descripción
                    </label>

                    <textarea
                        id="newTaskDescription"
                        placeholder="Descripción de la tarea"></textarea>

                </div>


                <div class="task-form-group">

                    <label>
                        Proyecto
                    </label>

                    <select
                        id="newTaskProject"
                        required>

                        <option value="">
                            Selecciona un proyecto
                        </option>

                        <option value="Proyecto Alfa">
                            Proyecto Alfa
                        </option>

                        <option value="Proyecto Beta">
                            Proyecto Beta
                        </option>

                        <option value="Proyecto Gamma">
                            Proyecto Gamma
                        </option>

                        <option value="Proyecto Delta">
                            Proyecto Delta
                        </option>

                    </select>

                </div>


                <div class="task-form-group">

                    <label>
                        Responsable
                    </label>

                    <input
                        type="text"
                        id="newTaskResponsible"
                        placeholder="Nombre del responsable"
                        required>

                </div>


                <div class="task-form-group">

                    <label>
                        Fecha límite
                    </label>

                    <input
                        type="date"
                        id="newTaskDate"
                        required>

                </div>


                <div class="task-form-group">

                    <label>
                        Prioridad
                    </label>

                    <select
                        id="newTaskPriority"
                        required>

                        <option value="Alta">
                            Alta
                        </option>

                        <option value="Media" selected>
                            Media
                        </option>

                        <option value="Baja">
                            Baja
                        </option>

                    </select>

                </div>


                <div class="task-form-group">

                    <label>
                        Estado
                    </label>

                    <select
                        id="newTaskStatus"
                        required>

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


                <div class="task-modal-footer">

                    <button
                        type="button"
                        class="cancel-task-btn">
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="save-task-btn">
                        Guardar tarea
                    </button>

                </div>


            </form>

        </div>

    `;


    modal.classList.add("show");


    // ==================================================
    // CERRAR
    // ==================================================

    const closeButton =
        modal.querySelector(".close-task-modal");


    const cancelButton =
        modal.querySelector(".cancel-task-btn");


    closeButton.addEventListener(
        "click",
        () => {

            modal.classList.remove("show");

        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            modal.classList.remove("show");

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        }
    );


    // ==================================================
    // GUARDAR NUEVA TAREA
    // ==================================================

    const form =
        modal.querySelector("#newTaskForm");


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("newTaskName")
                    .value.trim();


            const description =
                document
                    .getElementById("newTaskDescription")
                    .value.trim();


            const project =
                document
                    .getElementById("newTaskProject")
                    .value;


            const responsible =
                document
                    .getElementById("newTaskResponsible")
                    .value.trim();


            const date =
                document
                    .getElementById("newTaskDate")
                    .value;


            const priority =
                document
                    .getElementById("newTaskPriority")
                    .value;


            const status =
                document
                    .getElementById("newTaskStatus")
                    .value;


            if (
                !name ||
                !project ||
                !responsible ||
                !date ||
                !priority ||
                !status
            ) {

                alert(
                    "Por favor, completa todos los campos obligatorios."
                );

                return;

            }


            // ==================================================
            // CLASE DE PRIORIDAD
            // ==================================================

            let priorityClass =
                "medium";


            if (priority === "Alta") {

                priorityClass =
                    "high";

            }


            if (priority === "Baja") {

                priorityClass =
                    "low";

            }


            // ==================================================
            // CLASE DE ESTADO
            // ==================================================

            let statusClass =
                "pending";


            if (status === "En progreso") {

                statusClass =
                    "progress";

            }


            if (status === "Completada") {

                statusClass =
                    "completed";

            }


            // ==================================================
            // CREAR FILA
            // ==================================================

            const newRow =
                document.createElement("tr");


            newRow.innerHTML = `

                <td>

                    <div class="task-info">

                        <div class="task-icon">
                            📋
                        </div>

                        <div>

                            <strong>
                                ${escapeTaskHtml(name)}
                            </strong>

                            <span>
                                ${
                                    escapeTaskHtml(
                                        description ||
                                        "Sin descripción"
                                    )
                                }
                            </span>

                        </div>

                    </div>

                </td>


                <td>
                    ${escapeTaskHtml(project)}
                </td>


                <td>
                    ${escapeTaskHtml(responsible)}
                </td>


                <td>
                    ${formatTaskDate(date)}
                </td>


                <td>

                    <span
                        class="task-priority ${priorityClass}">

                        ${priority}

                    </span>

                </td>


                <td>

                    <span
                        class="task-status ${statusClass}">

                        ${status}

                    </span>

                </td>


                <td>

                    <div class="task-actions">

                        <button
                            type="button"
                            title="Ver">
                            👁
                        </button>

                        <button
                            type="button"
                            title="Editar">
                            ✎
                        </button>

                        <button
                            type="button"
                            title="Eliminar">
                            🗑
                        </button>

                    </div>

                </td>

            `;


            tasksBody.appendChild(newRow);


            modal.classList.remove("show");


            filterTasks();


            alert(
                `La tarea "${name}" fue registrada correctamente.`
            );

        }
    );

}


// ==================================================
// VER TAREA
// ==================================================

tasksBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                'button[title="Ver"]'
            );


        if (!button) {
            return;
        }


        const row =
            button.closest("tr");


        if (!row) {
            return;
        }


        const data =
            getTaskData(row);


        let modal =
            document.getElementById(
                "taskDetailsModal"
            );


        if (!modal) {

            modal =
                document.createElement("div");

            modal.id =
                "taskDetailsModal";

            modal.className =
                "task-modal";

            document.body.appendChild(modal);

        }


        modal.innerHTML = `

            <div class="task-modal-content">

                <div class="task-modal-header">

                    <h2>
                        Detalles de la tarea
                    </h2>

                    <button
                        type="button"
                        class="close-task-details">
                        ×
                    </button>

                </div>


                <div class="task-details-body">


                    <div class="task-detail-item">

                        <span>
                            Tarea
                        </span>

                        <strong>
                            ${escapeTaskHtml(data.name)}
                        </strong>

                    </div>


                    <div class="task-detail-item">

                        <span>
                            Descripción
                        </span>

                        <strong>
                            ${escapeTaskHtml(data.description)}
                        </strong>

                    </div>


                    <div class="task-detail-item">

                        <span>
                            Proyecto
                        </span>

                        <strong>
                            ${escapeTaskHtml(data.project)}
                        </strong>

                    </div>


                    <div class="task-detail-item">

                        <span>
                            Responsable
                        </span>

                        <strong>
                            ${escapeTaskHtml(data.responsible)}
                        </strong>

                    </div>


                    <div class="task-detail-item">

                        <span>
                            Fecha límite
                        </span>

                        <strong>
                            ${data.date}
                        </strong>

                    </div>


                    <div class="task-detail-item">

                        <span>
                            Prioridad
                        </span>

                        <strong>
                            ${data.priority}
                        </strong>

                    </div>


                    <div class="task-detail-item">

                        <span>
                            Estado
                        </span>

                        <strong>
                            ${data.status}
                        </strong>

                    </div>


                </div>


                <div class="task-modal-footer">

                    <button
                        type="button"
                        class="close-task-details-btn">

                        Cerrar

                    </button>

                </div>

            </div>

        `;


        modal.classList.add("show");


        modal
            .querySelector(".close-task-details")
            .addEventListener(
                "click",
                () => {

                    modal.classList.remove("show");

                }
            );


        modal
            .querySelector(".close-task-details-btn")
            .addEventListener(
                "click",
                () => {

                    modal.classList.remove("show");

                }
            );


        modal.addEventListener(
            "click",
            event => {

                if (event.target === modal) {

                    modal.classList.remove("show");

                }

            }
        );

    }
);


// ==================================================
// EDITAR TAREA
// ==================================================

tasksBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                'button[title="Editar"]'
            );


        if (!button) {
            return;
        }


        const row =
            button.closest("tr");


        if (!row) {
            return;
        }


        const data =
            getTaskData(row);


        let modal =
            document.getElementById(
                "editTaskModal"
            );


        if (!modal) {

            modal =
                document.createElement("div");

            modal.id =
                "editTaskModal";

            modal.className =
                "task-modal";

            document.body.appendChild(modal);

        }


        modal.innerHTML = `

            <div class="task-modal-content">

                <div class="task-modal-header">

                    <h2>
                        Editar tarea
                    </h2>

                    <button
                        type="button"
                        class="close-edit-task">
                        ×
                    </button>

                </div>


                <form id="editTaskForm">


                    <div class="task-form-group">

                        <label>
                            Nombre de la tarea
                        </label>

                        <input
                            type="text"
                            id="editTaskName"
                            value="${escapeTaskHtml(data.name)}"
                            required>

                    </div>


                    <div class="task-form-group">

                        <label>
                            Descripción
                        </label>

                        <textarea
                            id="editTaskDescription">${escapeTaskHtml(data.description === "Sin descripción" ? "" : data.description)}</textarea>

                    </div>


                    <div class="task-form-group">

                        <label>
                            Proyecto
                        </label>

                        <select
                            id="editTaskProject"
                            required>

                            <option
                                value="Proyecto Alfa"
                                ${data.project === "Proyecto Alfa" ? "selected" : ""}>
                                Proyecto Alfa
                            </option>

                            <option
                                value="Proyecto Beta"
                                ${data.project === "Proyecto Beta" ? "selected" : ""}>
                                Proyecto Beta
                            </option>

                            <option
                                value="Proyecto Gamma"
                                ${data.project === "Proyecto Gamma" ? "selected" : ""}>
                                Proyecto Gamma
                            </option>

                            <option
                                value="Proyecto Delta"
                                ${data.project === "Proyecto Delta" ? "selected" : ""}>
                                Proyecto Delta
                            </option>

                        </select>

                    </div>


                    <div class="task-form-group">

                        <label>
                            Responsable
                        </label>

                        <input
                            type="text"
                            id="editTaskResponsible"
                            value="${escapeTaskHtml(data.responsible)}"
                            required>

                    </div>


                    <div class="task-form-group">

                        <label>
                            Fecha límite
                        </label>

                        <input
                            type="date"
                            id="editTaskDate"
                            value="${convertTaskDate(data.date)}"
                            required>

                    </div>


                    <div class="task-form-group">

                        <label>
                            Prioridad
                        </label>

                        <select
                            id="editTaskPriority"
                            required>

                            <option
                                value="Alta"
                                ${data.priority === "Alta" ? "selected" : ""}>
                                Alta
                            </option>

                            <option
                                value="Media"
                                ${data.priority === "Media" ? "selected" : ""}>
                                Media
                            </option>

                            <option
                                value="Baja"
                                ${data.priority === "Baja" ? "selected" : ""}>
                                Baja
                            </option>

                        </select>

                    </div>


                    <div class="task-form-group">

                        <label>
                            Estado
                        </label>

                        <select
                            id="editTaskStatus"
                            required>

                            <option
                                value="Pendiente"
                                ${data.status === "Pendiente" ? "selected" : ""}>
                                Pendiente
                            </option>

                            <option
                                value="En progreso"
                                ${data.status === "En progreso" ? "selected" : ""}>
                                En progreso
                            </option>

                            <option
                                value="Completada"
                                ${data.status === "Completada" ? "selected" : ""}>
                                Completada
                            </option>

                        </select>

                    </div>


                    <div class="task-modal-footer">

                        <button
                            type="button"
                            class="cancel-edit-task">

                            Cancelar

                        </button>


                        <button
                            type="submit"
                            class="save-task-btn">

                            Guardar cambios

                        </button>

                    </div>


                </form>

            </div>

        `;


        modal.classList.add("show");


        // ==================================================
        // CERRAR
        // ==================================================

        modal
            .querySelector(".close-edit-task")
            .addEventListener(
                "click",
                () => {

                    modal.classList.remove("show");

                }
            );


        modal
            .querySelector(".cancel-edit-task")
            .addEventListener(
                "click",
                () => {

                    modal.classList.remove("show");

                }
            );


        // ==================================================
        // GUARDAR CAMBIOS
        // ==================================================

        modal
            .querySelector("#editTaskForm")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const newName =
                        modal
                            .querySelector("#editTaskName")
                            .value.trim();


                    const newDescription =
                        modal
                            .querySelector("#editTaskDescription")
                            .value.trim();


                    const newProject =
                        modal
                            .querySelector("#editTaskProject")
                            .value;


                    const newResponsible =
                        modal
                            .querySelector("#editTaskResponsible")
                            .value.trim();


                    const newDate =
                        modal
                            .querySelector("#editTaskDate")
                            .value;


                    const newPriority =
                        modal
                            .querySelector("#editTaskPriority")
                            .value;


                    const newStatus =
                        modal
                            .querySelector("#editTaskStatus")
                            .value;


                    if (
                        !newName ||
                        !newProject ||
                        !newResponsible ||
                        !newDate
                    ) {

                        alert(
                            "Por favor, completa todos los campos obligatorios."
                        );

                        return;

                    }


                    // ==================================================
                    // ACTUALIZAR NOMBRE
                    // ==================================================

                    const nameElement =
                        row.querySelector(
                            ".task-info strong"
                        );


                    const descriptionElement =
                        row.querySelector(
                            ".task-info span"
                        );


                    nameElement.textContent =
                        newName;


                    descriptionElement.textContent =
                        newDescription ||
                        "Sin descripción";


                    // ==================================================
                    // ACTUALIZAR PROYECTO
                    // ==================================================

                    const cells =
                        row.querySelectorAll("td");


                    cells[1].textContent =
                        newProject;


                    // ==================================================
                    // RESPONSABLE
                    // ==================================================

                    cells[2].textContent =
                        newResponsible;


                    // ==================================================
                    // FECHA
                    // ==================================================

                    cells[3].textContent =
                        formatTaskDate(newDate);


                    // ==================================================
                    // PRIORIDAD
                    // ==================================================

                    const priorityElement =
                        row.querySelector(
                            ".task-priority"
                        );


                    priorityElement.textContent =
                        newPriority;


                    priorityElement.className =
                        "task-priority";


                    if (newPriority === "Alta") {

                        priorityElement.classList.add(
                            "high"
                        );

                    }

                    else if (
                        newPriority === "Media"
                    ) {

                        priorityElement.classList.add(
                            "medium"
                        );

                    }

                    else {

                        priorityElement.classList.add(
                            "low"
                        );

                    }


                    // ==================================================
                    // ESTADO
                    // ==================================================

                    const statusElement =
                        row.querySelector(
                            ".task-status"
                        );


                    statusElement.textContent =
                        newStatus;


                    statusElement.className =
                        "task-status";


                    if (newStatus === "Pendiente") {

                        statusElement.classList.add(
                            "pending"
                        );

                    }

                    else if (
                        newStatus === "En progreso"
                    ) {

                        statusElement.classList.add(
                            "progress"
                        );

                    }

                    else {

                        statusElement.classList.add(
                            "completed"
                        );

                    }


                    // ==================================================
                    // CERRAR
                    // ==================================================

                    modal.classList.remove("show");


                    // ==================================================
                    // ACTUALIZAR FILTROS
                    // ==================================================

                    filterTasks();


                    alert(
                        `La tarea "${newName}" fue actualizada correctamente.`
                    );

                }
            );

    }
);


// ==================================================
// ELIMINAR TAREA
// ==================================================

tasksBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                'button[title="Eliminar"]'
            );


        if (!button) {
            return;
        }


        const row =
            button.closest("tr");


        if (!row) {
            return;
        }


        const nameElement =
            row.querySelector(
                ".task-info strong"
            );


        const taskName =
            nameElement
                ? nameElement.textContent.trim()
                : "esta tarea";


        const confirmDelete =
            confirm(
                `¿Estás seguro de que deseas eliminar la tarea "${taskName}"?`
            );


        if (!confirmDelete) {
            return;
        }


        row.remove();


        filterTasks();


        alert(
            `La tarea "${taskName}" fue eliminada correctamente.`
        );

    }
);


// ==================================================
// OBTENER DATOS DE UNA TAREA
// ==================================================

function getTaskData(row) {

    const nameElement =
        row.querySelector(
            ".task-info strong"
        );


    const descriptionElement =
        row.querySelector(
            ".task-info span"
        );


    const priorityElement =
        row.querySelector(
            ".task-priority"
        );


    const statusElement =
        row.querySelector(
            ".task-status"
        );


    const cells =
        row.querySelectorAll("td");


    return {

        name:
            nameElement
                ? nameElement.textContent.trim()
                : "",

        description:
            descriptionElement
                ? descriptionElement.textContent.trim()
                : "Sin descripción",

        project:
            cells[1]
                ? cells[1].textContent.trim()
                : "",

        responsible:
            cells[2]
                ? cells[2].textContent.trim()
                : "",

        date:
            cells[3]
                ? cells[3].textContent.trim()
                : "",

        priority:
            priorityElement
                ? priorityElement.textContent.trim()
                : "Media",

        status:
            statusElement
                ? statusElement.textContent.trim()
                : "Pendiente"

    };

}


// ==================================================
// FORMATEAR FECHA
// ==================================================

function formatTaskDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const year =
        date.getFullYear();


    return `${day}/${month}/${year}`;

}


// ==================================================
// CONVERTIR FECHA DE TABLA A INPUT DATE
// ==================================================

function convertTaskDate(date) {

    const parts =
        date
            .trim()
            .split("/");


    if (parts.length !== 3) {

        return "";

    }


    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


// ==================================================
// ESCAPAR HTML
// ==================================================

function escapeTaskHtml(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==================================================
// INICIALIZAR
// ==================================================

filterTasks();