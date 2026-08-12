// ==================================================
// ELEMENTOS
// ==================================================

const searchProject = document.getElementById("searchProject");

const filterStatus = document.getElementById("filterStatus");

const projectsBody = document.getElementById("projectsBody");

const projectCount = document.getElementById("projectCount");


// ==================================================
// BUSCAR Y FILTRAR PROYECTOS
// ==================================================

function filterProjects() {

    const searchText =
        searchProject.value.toLowerCase().trim();

    const selectedStatus =
        filterStatus.value;

    const rows =
        projectsBody.querySelectorAll("tr");

    let visibleProjects = 0;


    rows.forEach(row => {

        const projectText =
            row.textContent.toLowerCase();

        const statusElement =
            row.querySelector(".status");

        const status =
            statusElement
                ? statusElement.textContent.trim()
                : "";


        const matchesSearch =
            projectText.includes(searchText);


        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (matchesSearch && matchesStatus) {

            row.style.display = "";

            visibleProjects++;

        } else {

            row.style.display = "none";

        }

    });


    projectCount.textContent =
        visibleProjects === 1
            ? "1 proyecto"
            : `${visibleProjects} proyectos`;

}


// ==================================================
// EVENTOS DE BÚSQUEDA
// ==================================================

searchProject.addEventListener(
    "input",
    filterProjects
);


filterStatus.addEventListener(
    "change",
    filterProjects
);


// ==================================================
// MODAL
// ==================================================

const projectModal =
    document.getElementById("projectModal");

const newProjectBtn =
    document.getElementById("newProjectBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");


// ==================================================
// ABRIR MODAL
// ==================================================

newProjectBtn.addEventListener("click", () => {

    projectModal.classList.add("show");

});


// ==================================================
// CERRAR MODAL
// ==================================================

closeModal.addEventListener("click", () => {

    projectModal.classList.remove("show");

});


cancelModal.addEventListener("click", () => {

    projectModal.classList.remove("show");

});


// ==================================================
// CERRAR AL HACER CLIC FUERA
// ==================================================

projectModal.addEventListener("click", event => {

    if (event.target === projectModal) {

        projectModal.classList.remove("show");

    }

});


// ==================================================
// ELEMENTOS DEL FORMULARIO
// ==================================================

const projectForm =
    document.getElementById("projectForm");

const projectStatus =
    document.getElementById("projectStatus");

const projectProgress =
    document.getElementById("projectProgress");

const progressGroup =
    document.getElementById("progressGroup");


// ==================================================
// CONTROLAR CAMPO DE AVANCE
// ==================================================

projectStatus.addEventListener("change", () => {

    const status =
        projectStatus.value;


    if (status === "Completado") {

        projectProgress.value = 100;

        projectProgress.disabled = true;

    }

    else if (status === "Pendiente") {

        projectProgress.value = 0;

        projectProgress.disabled = true;

    }

    else if (status === "En progreso") {

        projectProgress.disabled = false;

        projectProgress.value = 50;

    }

    else {

        projectProgress.value = 0;

        projectProgress.disabled = true;

    }

});


// ==================================================
// FORMULARIO
// ==================================================

projectForm.addEventListener("submit", event => {

    event.preventDefault();


    // ==================================================
    // OBTENER DATOS
    // ==================================================

    const projectName =
        document.getElementById("projectName")
            .value.trim();


    const responsible =
        document.getElementById("responsible")
            .value;


    const status =
        document.getElementById("projectStatus")
            .value;


    const startDate =
        document.getElementById("startDate")
            .value;


    const endDate =
        document.getElementById("endDate")
            .value;


    const description =
        document.getElementById("description")
            .value.trim();


    let progress =
        Number(projectProgress.value);


    // ==================================================
    // VALIDACIONES
    // ==================================================

    if (
        !projectName ||
        !responsible ||
        !status ||
        !startDate ||
        !endDate
    ) {

        alert(
            "Por favor, completa todos los campos obligatorios."
        );

        return;

    }


    // ==================================================
    // DETERMINAR AVANCE
    // ==================================================

    if (status === "Pendiente") {

        progress = 0;

    }


    if (status === "Completado") {

        progress = 100;

    }


    if (status === "En progreso") {

        if (progress < 0 || progress > 100) {

            alert(
                "El avance debe estar entre 0% y 100%."
            );

            return;

        }

    }


    // ==================================================
    // FORMATEAR FECHAS
    // ==================================================

    const formattedStartDate =
        formatDate(startDate);

    const formattedEndDate =
        formatDate(endDate);


    // ==================================================
    // CREAR FILA
    // ==================================================

    const newRow =
        document.createElement("tr");


    // Clase visual del estado

    let statusClass = "pending";


    if (status === "En progreso") {

        statusClass = "active";

    }


    if (status === "Completado") {

        statusClass = "completed";

    }


    newRow.innerHTML = `

        <td>

            <div class="project-name">

                <div class="project-icon">
                    P
                </div>

                <div>

                    <strong>
                        ${projectName}
                    </strong>

                    <span>
                        ${description || "Sin descripción"}
                    </span>

                </div>

            </div>

        </td>


        <td>
            ${responsible}
        </td>


        <td>
            ${formattedStartDate}
        </td>


        <td>
            ${formattedEndDate}
        </td>


        <td>

            <span class="status ${statusClass}">
                ${status}
            </span>

        </td>


        <td>

            <div class="progress-container">

                <div class="progress-bar">

                    <span
                        style="width: ${progress}%;">
                    </span>

                </div>

                <small>
                    ${progress}%
                </small>

            </div>

        </td>


        <td>

            <div class="action-buttons">

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


    // ==================================================
    // AGREGAR A LA TABLA
    // ==================================================

    projectsBody.appendChild(newRow);


    // ==================================================
    // CERRAR Y LIMPIAR
    // ==================================================

    projectForm.reset();

    projectProgress.value = 0;

    projectProgress.disabled = true;

    projectModal.classList.remove("show");


    // ==================================================
    // ACTUALIZAR LISTA
    // ==================================================

    filterProjects();


    // ==================================================
    // MENSAJE
    // ==================================================

    alert(
        `El proyecto "${projectName}" fue registrado correctamente.`
    );

});


// ==================================================
// FORMATEAR FECHA
// ==================================================

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");


    const day =
        String(date.getDate()).padStart(2, "0");


    const month =
        String(date.getMonth() + 1).padStart(2, "0");


    const year =
        date.getFullYear();


    return `${day}/${month}/${year}`;
}

// ==================================================
// VER DETALLES DEL PROYECTO
// ==================================================

projectsBody.addEventListener("click", event => {

    const button = event.target.closest(
        'button[title="Ver"]'
    );

    if (!button) {
        return;
    }


    // Obtener la fila del proyecto

    const row = button.closest("tr");

    if (!row) {
        return;
    }


    // ==================================================
    // OBTENER INFORMACIÓN
    // ==================================================

    const projectNameElement =
        row.querySelector(".project-name strong");

    const descriptionElement =
        row.querySelector(".project-name span");

    const statusElement =
        row.querySelector(".status");

    const progressElement =
        row.querySelector(".progress-container small");


    const projectName =
        projectNameElement
            ? projectNameElement.textContent.trim()
            : "Sin nombre";


    const description =
        descriptionElement
            ? descriptionElement.textContent.trim()
            : "Sin descripción";


    const cells = row.querySelectorAll("td");


    const responsible =
        cells[1]
            ? cells[1].textContent.trim()
            : "Sin responsable";


    const startDate =
        cells[2]
            ? cells[2].textContent.trim()
            : "Sin fecha";


    const endDate =
        cells[3]
            ? cells[3].textContent.trim()
            : "Sin fecha";


    const status =
        statusElement
            ? statusElement.textContent.trim()
            : "Sin estado";


    const progress =
        progressElement
            ? progressElement.textContent.trim()
            : "0%";


    // ==================================================
    // CREAR MODAL
    // ==================================================

    let modal =
        document.getElementById(
            "projectDetailsModal"
        );


    // Si todavía no existe, lo creamos

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "projectDetailsModal";

        modal.className =
            "project-details-modal";


        document.body.appendChild(modal);

    }


    // ==================================================
    // CONTENIDO DEL MODAL
    // ==================================================

    modal.innerHTML = `

        <div class="project-details-content">

            <div class="project-details-header">

                <h2>
                    Detalles del proyecto
                </h2>

                <button
                    type="button"
                    class="close-details"
                    aria-label="Cerrar">
                    ×
                </button>

            </div>


            <div class="project-details-body">

                <div class="detail-item">

                    <span class="detail-label">
                        Proyecto
                    </span>

                    <div class="detail-value">
                        ${projectName}
                    </div>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Descripción
                    </span>

                    <div class="detail-value">
                        ${description}
                    </div>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Responsable
                    </span>

                    <div class="detail-value">
                        ${responsible}
                    </div>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Estado
                    </span>

                    <div class="detail-value">
                        ${status}
                    </div>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Avance
                    </span>

                    <div class="detail-progress">

                        <div class="detail-progress-bar">

                            <span
                                style="width: ${progress};">
                            </span>

                        </div>

                        <span class="detail-progress-number">
                            ${progress}
                        </span>

                    </div>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Fecha de inicio
                    </span>

                    <div class="detail-value">
                        ${startDate}
                    </div>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Fecha final
                    </span>

                    <div class="detail-value">
                        ${endDate}
                    </div>

                </div>

            </div>


            <div class="project-details-footer">

                <button
                    type="button"
                    class="close-details-btn">
                    Cerrar
                </button>

            </div>

        </div>

    `;


    // ==================================================
    // MOSTRAR MODAL
    // ==================================================

    modal.classList.add("show");


    // ==================================================
    // BOTÓN X
    // ==================================================

    const closeButton =
        modal.querySelector(".close-details");


    closeButton.addEventListener(
        "click",
        () => {

            modal.classList.remove("show");

        }
    );


    // ==================================================
    // BOTÓN CERRAR
    // ==================================================

    const closeDetailsButton =
        modal.querySelector(".close-details-btn");


    closeDetailsButton.addEventListener(
        "click",
        () => {

            modal.classList.remove("show");

        }
    );


    // ==================================================
    // CERRAR HACIENDO CLIC FUERA
    // ==================================================

    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        }
    );

});

// ==================================================
// EDITAR PROYECTO
// ==================================================

projectsBody.addEventListener("click", event => {

    const button = event.target.closest(
        'button[title="Editar"]'
    );

    if (!button) {
        return;
    }


    // ==================================================
    // OBTENER FILA
    // ==================================================

    const row = button.closest("tr");

    if (!row) {
        return;
    }


    // ==================================================
    // OBTENER DATOS ACTUALES
    // ==================================================

    const projectNameElement =
        row.querySelector(".project-name strong");

    const descriptionElement =
        row.querySelector(".project-name span");

    const statusElement =
        row.querySelector(".status");

    const progressElement =
        row.querySelector(".progress-container small");


    const projectName =
        projectNameElement
            ? projectNameElement.textContent.trim()
            : "";


    let description =
        descriptionElement
            ? descriptionElement.textContent.trim()
            : "";


    if (description === "Sin descripción") {
        description = "";
    }


    const cells =
        row.querySelectorAll("td");


    const responsible =
        cells[1]
            ? cells[1].textContent.trim()
            : "";


    const startDate =
        cells[2]
            ? convertToInputDate(
                cells[2].textContent.trim()
            )
            : "";


    const endDate =
        cells[3]
            ? convertToInputDate(
                cells[3].textContent.trim()
            )
            : "";


    const status =
        statusElement
            ? statusElement.textContent.trim()
            : "Pendiente";


    const progressText =
        progressElement
            ? progressElement.textContent.trim()
            : "0";


    const progress =
        parseInt(
            progressText.replace("%", ""),
            10
        ) || 0;


    // ==================================================
    // CREAR MODAL
    // ==================================================

    let modal =
        document.getElementById(
            "editProjectModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "editProjectModal";

        modal.className =
            "edit-project-modal";


        document.body.appendChild(modal);

    }


    // ==================================================
    // CONTENIDO
    // ==================================================

    modal.innerHTML = `

        <div class="edit-project-content">

            <div class="edit-project-header">

                <h2>
                    Editar proyecto
                </h2>

                <button
                    type="button"
                    class="close-edit">
                    ×
                </button>

            </div>


            <form class="edit-project-form"
                  id="editProjectForm">


                <div class="edit-form-group">

                    <label for="editProjectName">
                        Nombre del proyecto
                    </label>

                    <input
                        type="text"
                        id="editProjectName"
                        value="${escapeHtml(projectName)}"
                        required>

                </div>


                <div class="edit-form-group">

                    <label for="editDescription">
                        Descripción
                    </label>

                    <textarea
                        id="editDescription"
                        placeholder="Descripción del proyecto">${escapeHtml(description)}</textarea>

                </div>


                <div class="edit-form-group">

                    <label for="editResponsible">
                        Responsable
                    </label>

                    <input
                        type="text"
                        id="editResponsible"
                        value="${escapeHtml(responsible)}"
                        required>

                </div>


                <div class="edit-form-group">

                    <label for="editStatus">
                        Estado
                    </label>

                    <select
                        id="editStatus"
                        required>

                        <option
                            value="Pendiente"
                            ${status === "Pendiente" ? "selected" : ""}>
                            Pendiente
                        </option>

                        <option
                            value="En progreso"
                            ${status === "En progreso" ? "selected" : ""}>
                            En progreso
                        </option>

                        <option
                            value="Completado"
                            ${status === "Completado" ? "selected" : ""}>
                            Completado
                        </option>

                    </select>

                </div>


                <div class="edit-form-group">

                    <label for="editProgress">
                        Avance del proyecto
                    </label>

                    <input
                        type="number"
                        id="editProgress"
                        min="0"
                        max="100"
                        value="${progress}">

                    <small class="edit-progress-help">
                        Pendiente = 0% | Completado = 100%
                    </small>

                </div>


                <div class="edit-date-row">

                    <div class="edit-form-group">

                        <label for="editStartDate">
                            Fecha de inicio
                        </label>

                        <input
                            type="date"
                            id="editStartDate"
                            value="${startDate}"
                            required>

                    </div>


                    <div class="edit-form-group">

                        <label for="editEndDate">
                            Fecha final
                        </label>

                        <input
                            type="date"
                            id="editEndDate"
                            value="${endDate}"
                            required>

                    </div>

                </div>


                <div class="edit-project-footer">

                    <button
                        type="button"
                        class="cancel-edit-btn">
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="save-edit-btn">
                        Guardar cambios
                    </button>

                </div>


            </form>

        </div>

    `;


    // ==================================================
    // MOSTRAR MODAL
    // ==================================================

    modal.classList.add("show");


    const editStatus =
        modal.querySelector("#editStatus");

    const editProgress =
        modal.querySelector("#editProgress");



// ==================================================
// CONTROL DEL AVANCE AL EDITAR
// ==================================================

    let estadoAnterior = editStatus.value;

    function updateEditProgress() {

        const nuevoEstado = editStatus.value;


    // ==================================================
    // PENDIENTE
    // ==================================================

        if (nuevoEstado === "Pendiente") {

            editProgress.value = 0;
            editProgress.disabled = true;

        }


    // ==================================================
    // COMPLETADO
    // ==================================================

        else if (nuevoEstado === "Completado") {

            editProgress.value = 100;
            editProgress.disabled = true;

        }


    // ==================================================
    // EN PROGRESO
    // ==================================================

        else if (nuevoEstado === "En progreso") {

            editProgress.disabled = false;


        // Si venimos de Pendiente o Completado,
        // comenzamos nuevamente en 50%

        if (
            estadoAnterior === "Pendiente" ||
            estadoAnterior === "Completado"
        ) {

            editProgress.value = 50;

        }

    }


    // Guardamos el nuevo estado
    estadoAnterior = nuevoEstado;

    }


// Ejecutar al abrir el formulario
    updateEditProgress();


// Ejecutar cuando se cambia el estado
    editStatus.addEventListener(
        "change",
    updateEditProgress
    );


    // ==================================================
    // CERRAR MODAL
    // ==================================================

    const closeButton =
        modal.querySelector(".close-edit");


    const cancelButton =
        modal.querySelector(".cancel-edit-btn");


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


    // ==================================================
    // GUARDAR CAMBIOS
    // ==================================================

    const editForm =
        modal.querySelector("#editProjectForm");


    editForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const newName =
                modal
                    .querySelector("#editProjectName")
                    .value.trim();


            const newDescription =
                modal
                    .querySelector("#editDescription")
                    .value.trim();


            const newResponsible =
                modal
                    .querySelector("#editResponsible")
                    .value.trim();


            const newStatus =
                modal
                    .querySelector("#editStatus")
                    .value;


            const newStartDate =
                modal
                    .querySelector("#editStartDate")
                    .value;


            const newEndDate =
                modal
                    .querySelector("#editEndDate")
                    .value;


            let newProgress =
                Number(
                    modal
                        .querySelector("#editProgress")
                        .value
                );


            // ==================================================
            // VALIDACIONES
            // ==================================================

            if (
                !newName ||
                !newResponsible ||
                !newStatus ||
                !newStartDate ||
                !newEndDate
            ) {

                alert(
                    "Por favor, completa todos los campos obligatorios."
                );

                return;

            }


            if (newStatus === "Pendiente") {

                newProgress = 0;

            }


            if (newStatus === "Completado") {

                newProgress = 100;

            }


            if (
                newStatus === "En progreso" &&
                (
                    newProgress < 0 ||
                    newProgress > 100
                )
            ) {

                alert(
                    "El avance debe estar entre 0% y 100%."
                );

                return;

            }


            // ==================================================
            // ACTUALIZAR NOMBRE Y DESCRIPCIÓN
            // ==================================================

            projectNameElement.textContent =
                newName;


            descriptionElement.textContent =
                newDescription ||
                "Sin descripción";


            // ==================================================
            // ACTUALIZAR RESPONSABLE
            // ==================================================

            cells[1].textContent =
                newResponsible;


            // ==================================================
            // ACTUALIZAR FECHAS
            // ==================================================

            cells[2].textContent =
                formatDate(newStartDate);


            cells[3].textContent =
                formatDate(newEndDate);


            // ==================================================
            // ACTUALIZAR ESTADO
            // ==================================================

            statusElement.textContent =
                newStatus;


            statusElement.className =
                "status";


            if (newStatus === "Pendiente") {

                statusElement.classList.add(
                    "pending"
                );

            }

            else if (
                newStatus === "En progreso"
            ) {

                statusElement.classList.add(
                    "active"
                );

            }

            else if (
                newStatus === "Completado"
            ) {

                statusElement.classList.add(
                    "completed"
                );

            }


            // ==================================================
            // ACTUALIZAR AVANCE
            // ==================================================

            if (progressElement) {

                progressElement.textContent =
                    `${newProgress}%`;

            }


            const progressBar =
                row.querySelector(
                    ".progress-bar span"
                );


            if (progressBar) {

                progressBar.style.width =
                    `${newProgress}%`;

            }


            // ==================================================
            // CERRAR
            // ==================================================

            modal.classList.remove("show");


            // ==================================================
            // ACTUALIZAR FILTRO
            // ==================================================

            filterProjects();


            alert(
                `El proyecto "${newName}" fue actualizado correctamente.`
            );

        }
    );

});


// ==================================================
// CONVERTIR FECHA DE LA TABLA A INPUT DATE
// ==================================================

function convertToInputDate(date) {

    const parts =
        date.trim().split("/");


    if (parts.length !== 3) {

        return "";

    }


    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


// ==================================================
// ESCAPAR TEXTO PARA HTML
// ==================================================

function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

// ==================================================
// ELIMINAR PROYECTO
// ==================================================

projectsBody.addEventListener("click", event => {

    // Buscar el botón de eliminar
    const button = event.target.closest(
        'button[title="Eliminar"]'
    );

    // Si no se hizo clic en eliminar, no hacemos nada
    if (!button) {
        return;
    }

    // Obtener la fila del proyecto
    const row = button.closest("tr");

    if (!row) {
        return;
    }

    // Obtener nombre del proyecto
    const projectNameElement =
        row.querySelector(".project-name strong");

    const projectName =
        projectNameElement
            ? projectNameElement.textContent.trim()
            : "este proyecto";


    // ==================================================
    // CONFIRMAR ELIMINACIÓN
    // ==================================================

    const confirmar = confirm(
        `¿Estás seguro de que deseas eliminar el proyecto "${projectName}"?`
    );


    // Si cancela, no hacemos nada
    if (!confirmar) {
        return;
    }


    // ==================================================
    // ELIMINAR DE LA TABLA
    // ==================================================

    row.remove();


    // ==================================================
    // ACTUALIZAR LISTA Y CONTADOR
    // ==================================================

    filterProjects();


    // ==================================================
    // MENSAJE
    // ==================================================

    alert(
        `El proyecto "${projectName}" fue eliminado correctamente.`
    );

});
