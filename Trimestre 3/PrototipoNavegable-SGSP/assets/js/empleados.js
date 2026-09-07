const searchEmployee =
    document.getElementById("searchEmployee");

const filterEmployeeStatus =
    document.getElementById("filterEmployeeStatus");

const employeesBody =
    document.getElementById("employeesBody");

const employeeCount =
    document.getElementById("employeeCount");

const newEmployeeBtn =
    document.getElementById("newEmployeeBtn");


// ==================================================
// BUSCAR Y FILTRAR EMPLEADOS
// ==================================================

// ==================================================
// BUSCAR, FILTRAR Y GUARDAR EMPLEADOS
// ==================================================
function filterEmployees() {
    const searchText = searchEmployee.value.toLowerCase().trim();
    const selectedStatus = filterEmployeeStatus.value;
    const rows = employeesBody.querySelectorAll("tr");
    
    let visibleEmployees = 0;
    const listaParaProyecto = []; // Array para guardar la info

    rows.forEach(row => {
        const employeeText = row.textContent.toLowerCase();
        const statusElement = row.querySelector(".employee-status");
        const status = statusElement ? statusElement.textContent.trim() : "";
        const matchesSearch = employeeText.includes(searchText);
        const matchesStatus = selectedStatus === "all" || status === selectedStatus;

        if (matchesSearch && matchesStatus) {
            row.style.display = "";
            visibleEmployees++;
        } else {
            row.style.display = "none";
        }

        // --- NUEVA LÓGICA: Extraer datos para el localStorage ---
        const nameElement = row.querySelector(".employee-info strong");
        if (nameElement) {
            const cells = row.querySelectorAll("td");
            listaParaProyecto.push({
                nombre: nameElement.textContent.trim(),
                documento: cells[1].textContent.trim(),
                cargo: cells[2].textContent.trim(),
                estado: status
            });
        }
    });

    employeeCount.textContent = visibleEmployees === 1 ? "1 empleado" : `${visibleEmployees} empleados`;

    // Guardar la lista actualizada en la memoria del navegador
    localStorage.setItem('empresaEmpleados', JSON.stringify(listaParaProyecto));
}


// ==================================================
// CREAR MODAL
// ==================================================

function createModal(title, content) {

    const oldModal =
        document.querySelector(".employee-modal");

    if (oldModal) {
        oldModal.remove();
    }

    const modal =
        document.createElement("div");

    modal.className = "employee-modal";

    modal.innerHTML = `
        <div class="employee-modal-overlay"></div>

        <div class="employee-modal-box">

            <div class="employee-modal-header">

                <h2>${title}</h2>

                <button
                    type="button"
                    class="employee-modal-close">
                    ✕
                </button>

            </div>

            <div class="employee-modal-content">
                ${content}
            </div>

        </div>
    `;

    document.body.appendChild(modal);

    const closeButton =
        modal.querySelector(
            ".employee-modal-close"
        );

    const overlay =
        modal.querySelector(
            ".employee-modal-overlay"
        );

    closeButton.addEventListener(
        "click",
        () => modal.remove()
    );

    overlay.addEventListener(
        "click",
        () => modal.remove()
    );

    return modal;
}


// ==================================================
// OBTENER DATOS DE UN EMPLEADO
// ==================================================

function getEmployeeData(row) {

    const name =
        row.querySelector(
            ".employee-info strong"
        ).textContent.trim();

    const phone =
        row.querySelector(
            ".employee-info span"
        ).textContent.trim();

    const cells =
        row.querySelectorAll("td");

    const documentNumber =
        cells[1].textContent.trim();

    const position =
        cells[2].textContent.trim();

    const email =
        cells[3].textContent.trim();

    const project =
        cells[4].textContent.trim();

    const status =
        cells[5]
            .querySelector(".employee-status")
            .textContent.trim();

    return {
        name,
        phone,
        documentNumber,
        position,
        email,
        project,
        status
    };
}


// ==================================================
// VER EMPLEADO
// ==================================================

function viewEmployee(row) {

    const employee =
        getEmployeeData(row);

    createModal(
        "Información del empleado",

        `
        <div class="employee-detail">

            <div class="employee-detail-avatar">
                ${getInitials(employee.name)}
            </div>

            <h3>${employee.name}</h3>

            <span class="employee-detail-status">
                ${employee.status}
            </span>

            <div class="employee-detail-grid">

                <div>
                    <strong>Teléfono</strong>
                    <span>${employee.phone}</span>
                </div>

                <div>
                    <strong>Documento</strong>
                    <span>${employee.documentNumber}</span>
                </div>

                <div>
                    <strong>Cargo</strong>
                    <span>${employee.position}</span>
                </div>

                <div>
                    <strong>Correo</strong>
                    <span>${employee.email}</span>
                </div>

                <div>
                    <strong>Proyecto</strong>
                    <span>${employee.project}</span>
                </div>

                <div>
                    <strong>Estado</strong>
                    <span>${employee.status}</span>
                </div>

            </div>

        </div>
        `
    );
}


// ==================================================
// EDITAR EMPLEADO
// ==================================================

function editEmployee(row) {

    const employee =
        getEmployeeData(row);

    const modal =
        createModal(
            "Editar empleado",

            `
            <form id="editEmployeeForm">

                <div class="employee-form-grid">

                    <div class="employee-form-group">
                        <label>Nombre completo</label>
                        <input
                            type="text"
                            id="editName"
                            value="${employee.name}"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            id="editPhone"
                            value="${employee.phone}"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Documento</label>
                        <input
                            type="text"
                            id="editDocument"
                            value="${employee.documentNumber}"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Cargo</label>
                        <input
                            type="text"
                            id="editPosition"
                            value="${employee.position}"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Correo</label>
                        <input
                            type="email"
                            id="editEmail"
                            value="${employee.email}"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Proyecto</label>
                        <input
                            type="text"
                            id="editProject"
                            value="${employee.project}"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Estado</label>

                        <select id="editStatus">

                            <option value="Activo"
                                ${employee.status === "Activo" ? "selected" : ""}>
                                Activo
                            </option>

                            <option value="Inactivo"
                                ${employee.status === "Inactivo" ? "selected" : ""}>
                                Inactivo
                            </option>

                        </select>

                    </div>

                </div>

                <div class="employee-form-actions">

                    <button
                        type="button"
                        class="employee-cancel-btn">
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="employee-save-btn">
                        Guardar cambios
                    </button>

                </div>

            </form>
            `
        );


    const form =
        modal.querySelector(
            "#editEmployeeForm"
        );

    const cancelButton =
        modal.querySelector(
            ".employee-cancel-btn"
        );


    cancelButton.addEventListener(
        "click",
        () => modal.remove()
    );


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            updateEmployeeRow(row);

            modal.remove();

            filterEmployees();
        }
    );
}


// ==================================================
// ACTUALIZAR EMPLEADO
// ==================================================

function updateEmployeeRow(row) {

    const name =
        document.getElementById(
            "editName"
        ).value.trim();

    const phone =
        document.getElementById(
            "editPhone"
        ).value.trim();

    const documentNumber =
        document.getElementById(
            "editDocument"
        ).value.trim();

    const position =
        document.getElementById(
            "editPosition"
        ).value.trim();

    const email =
        document.getElementById(
            "editEmail"
        ).value.trim();

    const project =
        document.getElementById(
            "editProject"
        ).value.trim();

    const status =
        document.getElementById(
            "editStatus"
        ).value;


    row.querySelector(
        ".employee-avatar"
    ).textContent =
        getInitials(name);


    row.querySelector(
        ".employee-info strong"
    ).textContent =
        name;


    row.querySelector(
        ".employee-info span"
    ).textContent =
        phone;


    const cells =
        row.querySelectorAll("td");


    cells[1].textContent =
        documentNumber;

    cells[2].textContent =
        position;

    cells[3].textContent =
        email;

    cells[4].textContent =
        project;


    const statusElement =
        cells[5].querySelector(
            ".employee-status"
        );


    statusElement.textContent =
        status;


    statusElement.className =
        status === "Activo"
            ? "employee-status active"
            : "employee-status inactive";
}


// ==================================================
// NUEVO EMPLEADO
// ==================================================

function newEmployee() {

    const modal =
        createModal(
            "Nuevo empleado",

            `
            <form id="newEmployeeForm">

                <div class="employee-form-grid">

                    <div class="employee-form-group">
                        <label>Nombre completo</label>
                        <input
                            type="text"
                            id="newName"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            id="newPhone"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Documento</label>
                        <input
                            type="text"
                            id="newDocument"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Cargo</label>
                        <input
                            type="text"
                            id="newPosition"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Correo</label>
                        <input
                            type="email"
                            id="newEmail"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Proyecto</label>
                        <input
                            type="text"
                            id="newProject"
                            placeholder="Sin proyecto"
                            required>
                    </div>

                    <div class="employee-form-group">
                        <label>Estado</label>

                        <select id="newStatus">

                            <option value="Activo">
                                Activo
                            </option>

                            <option value="Inactivo">
                                Inactivo
                            </option>

                        </select>

                    </div>

                </div>

                <div class="employee-form-actions">

                    <button
                        type="button"
                        class="employee-cancel-btn">
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="employee-save-btn">
                        Crear empleado
                    </button>

                </div>

            </form>
            `
        );


    const form =
        modal.querySelector(
            "#newEmployeeForm"
        );


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            addEmployeeRow();

            modal.remove();

            filterEmployees();
        }
    );
}


// ==================================================
// AGREGAR EMPLEADO A LA TABLA
// ==================================================

function addEmployeeRow() {

    const name =
        document.getElementById(
            "newName"
        ).value.trim();

    const phone =
        document.getElementById(
            "newPhone"
        ).value.trim();

    const documentNumber =
        document.getElementById(
            "newDocument"
        ).value.trim();

    const position =
        document.getElementById(
            "newPosition"
        ).value.trim();

    const email =
        document.getElementById(
            "newEmail"
        ).value.trim();

    const project =
        document.getElementById(
            "newProject"
        ).value.trim();

    const status =
        document.getElementById(
            "newStatus"
        ).value;


    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>

            <div class="employee-info">

                <div class="employee-avatar">
                    ${getInitials(name)}
                </div>

                <div>

                    <strong>
                        ${name}
                    </strong>

                    <span>
                        ${phone}
                    </span>

                </div>

            </div>

        </td>

        <td>
            ${documentNumber}
        </td>

        <td>
            ${position}
        </td>

        <td>
            ${email}
        </td>

        <td>
            ${project}
        </td>

        <td>

            <span class="employee-status ${
                status === "Activo"
                    ? "active"
                    : "inactive"
            }">

                ${status}

            </span>

        </td>

        <td>

            <div class="employee-actions">

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


    employeesBody.appendChild(row);
}


// ==================================================
// ELIMINAR EMPLEADO
// ==================================================

function deleteEmployee(row) {

    const employee =
        getEmployeeData(row);

    const confirmed =
        confirm(
            `¿Estás seguro de eliminar al empleado ${employee.name}?`
        );

    if (!confirmed) {
        return;
    }

    row.remove();

    filterEmployees();
}


// ==================================================
// OBTENER INICIALES
// ==================================================

function getInitials(name) {

    return name
        .split(" ")
        .filter(word => word.length > 0)
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join("");
}


// ==================================================
// BOTÓN NUEVO EMPLEADO
// ==================================================

newEmployeeBtn.addEventListener(
    "click",
    newEmployee
);


// ==================================================
// BOTONES DE LA TABLA
// ==================================================

employeesBody.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest("button");

        if (!button) {
            return;
        }

        const row =
            button.closest("tr");

        if (!row) {
            return;
        }

        const action =
            button.getAttribute("title");


        if (action === "Ver") {

            viewEmployee(row);

        }


        if (action === "Editar") {

            editEmployee(row);

        }


        if (action === "Eliminar") {

            deleteEmployee(row);

        }

    }
);


// ==================================================
// EVENTOS DE BÚSQUEDA Y FILTRO
// ==================================================

searchEmployee.addEventListener(
    "input",
    filterEmployees
);

filterEmployeeStatus.addEventListener(
    "change",
    filterEmployees
);


// ==================================================
// INICIALIZAR
// ==================================================

filterEmployees();

/* =====================================================
   CERRAR SESIÓN
===================================================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        const confirmar = confirm(
            "¿Estás seguro de que deseas cerrar sesión?"
        );

        if (confirmar) {

            window.location.href = "index.html";

        }

    });

}
// ==================================================
// GUARDAR EMPLEADOS EN LOCALSTORAGE PARA EL PROYECTO
// ==================================================
function syncEmpleadosToLocalStorage() {
    const rows = employeesBody.querySelectorAll("tr");
    const listaEmpleados = [];

    rows.forEach((row, index) => {
        const emp = getEmployeeData(row);
        listaEmpleados.push({
            id: index + 1,
            nombre: emp.name,
            documento: emp.documentNumber,
            cargo: emp.position,
            correo: emp.email,
            telefono: emp.phone,
            estado: emp.status
        });
    });

    localStorage.setItem('empresaEmpleados', JSON.stringify(listaEmpleados));
}

// Ejecutar sincronización al cargar la página
document.addEventListener("DOMContentLoaded", syncEmpleadosToLocalStorage);
