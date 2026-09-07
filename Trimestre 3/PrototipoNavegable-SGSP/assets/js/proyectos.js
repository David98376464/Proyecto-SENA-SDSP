document.addEventListener('DOMContentLoaded', () => {
    
    // Leer el proyecto de la memoria
    const proyectoActivo = JSON.parse(localStorage.getItem('proyectoActivoDetalle'));

    if(proyectoActivo) {
        // Asignar los datos del localStorage a los campos del HTML si existen
        const nameEl = document.getElementById('det-projectName');
        const idEl = document.getElementById('det-projectId');
        const clientEl = document.getElementById('det-projectClient');
        const managerEl = document.getElementById('det-projectManager');
        const statusEl = document.getElementById('statusSelect');

        if(nameEl) nameEl.textContent = proyectoActivo.nombre;
        if(idEl) idEl.textContent = `ID: ${proyectoActivo.id}`;
        if(clientEl) clientEl.textContent = `Cliente: ${proyectoActivo.cliente}`;
        if(managerEl) managerEl.textContent = proyectoActivo.responsable;
        if(statusEl) statusEl.value = proyectoActivo.estado;
    }

    // Aquí abajo puede ir el resto de tu código de proyecto-detalle...
});
// ==================================================
// ELEMENTOS
// ==================================================
const searchProject = document.getElementById("searchProject");
const filterStatus = document.getElementById("filterStatus");
const projectsBody = document.getElementById("projectsBody");
const projectCount = document.getElementById("projectCount");
const projectModal = document.getElementById("projectModal");
const newProjectBtn = document.getElementById("newProjectBtn");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const projectForm = document.getElementById("projectForm");

// ==================================================
// BUSCAR Y FILTRAR PROYECTOS
// ==================================================
function filterProjects() {
    const searchText = searchProject.value.toLowerCase().trim();
    const selectedStatus = filterStatus.value;
    const rows = projectsBody.querySelectorAll("tr");
    let visibleProjects = 0;

    rows.forEach(row => {
        const projectText = row.textContent.toLowerCase();
        const statusElement = row.querySelector(".status");
        const status = statusElement ? statusElement.textContent.trim() : "";
        const matchesSearch = projectText.includes(searchText);
        const matchesStatus = selectedStatus === "all" || status === selectedStatus;

        if (matchesSearch && matchesStatus) {
            row.style.display = "";
            visibleProjects++;
        } else {
            row.style.display = "none";
        }
    });

    projectCount.textContent = visibleProjects === 1 ? "1 proyecto" : `${visibleProjects} proyectos`;
}

searchProject.addEventListener("input", filterProjects);
filterStatus.addEventListener("change", filterProjects);

// ==================================================
// CONTROL DEL MODAL DE CREACIÓN
// ==================================================
newProjectBtn.addEventListener("click", () => projectModal.classList.add("show"));
closeModal.addEventListener("click", () => projectModal.classList.remove("show"));
cancelModal.addEventListener("click", () => projectModal.classList.remove("show"));
projectModal.addEventListener("click", event => {
    if (event.target === projectModal) projectModal.classList.remove("show");
});

// ==================================================
// GUARDAR NUEVO PROYECTO
// ==================================================
projectForm.addEventListener("submit", event => {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value.trim();
    const responsible = document.getElementById("responsible").value;
    const status = document.getElementById("projectStatus").value;
    const client = document.getElementById("projectClient").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value.trim();

    if (!projectName || !responsible || !status || !client || !startDate || !endDate) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const newRow = document.createElement("tr");

    let statusClass = "pending";
    if (status === "En progreso") statusClass = "active";
    if (status === "Completado") statusClass = "completed";

    newRow.innerHTML = `
        <td>
            <div class="project-name">
                <div class="project-icon">P</div>
                <div>
                    <strong>${projectName}</strong>
                    <span>${description || "Sin descripción"}</span>
                </div>
            </div>
        </td>
        <td>${responsible}</td>
        <td>${client}</td>
        <td>${formattedStartDate}</td>
        <td>${formattedEndDate}</td>
        <td><span class="status ${statusClass}">${status}</span></td>
        <td>
            <div class="action-buttons">
                <button type="button" title="Ver">👁</button>
                <button type="button" title="Editar">✎</button>
                <button type="button" title="Eliminar">🗑</button>
            </div>
        </td>
    `;

    projectsBody.appendChild(newRow);
    projectForm.reset();
    projectModal.classList.remove("show");
    filterProjects();
    alert(`El proyecto "${projectName}" fue registrado correctamente.`);
});

function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// ==================================================
// VER DETALLES DEL PROYECTO (Redirección Conectada)
// ==================================================
projectsBody.addEventListener("click", event => {
    const viewButton = event.target.closest('button[title="Ver"]');
    const projectNameClick = event.target.closest('.project-name');

    if (!viewButton && !projectNameClick) return;

    const row = event.target.closest("tr");
    if (!row) return;

    // Extraer los datos exactos de la fila en la que hiciste clic
    const projectName = row.querySelector(".project-name strong").textContent.trim();
    const description = row.querySelector(".project-name span").textContent.trim();
    const responsible = row.cells[1].textContent.trim();
    const client = row.cells[2].textContent.trim();
    const startDate = row.cells[3].textContent.trim();
    const endDate = row.cells[4].textContent.trim();
    const status = row.querySelector(".status").textContent.trim();

    // Crear un ID único basado en el nombre para diferenciarlo
    const projectId = projectName.toLowerCase().replace(/\s+/g, '-');

    // Empaquetar la información del proyecto seleccionado
    const proyectoActivo = {
        id: projectId,
        nombre: projectName,
        descripcion: description,
        responsable: responsible,
        cliente: client,
        inicio: startDate,
        fin: endDate,
        estado: status
    };

    // Guardar en la memoria del navegador y saltar al detalle
    localStorage.setItem('proyectoActivoDetalle', JSON.stringify(proyectoActivo));
    window.location.href = "proyecto-detalle.html";
});


// ==================================================
// ELIMINAR PROYECTO
// ==================================================
projectsBody.addEventListener("click", event => {
    const button = event.target.closest('button[title="Eliminar"]');
    if (!button) return;

    const row = button.closest("tr");
    if (!row) return;

    const projectNameElement = row.querySelector(".project-name strong");
    const projectName = projectNameElement ? projectNameElement.textContent.trim() : "este proyecto";

    if (confirm(`¿Estás seguro de que deseas eliminar el proyecto "${projectName}"?`)) {
        row.remove();
        filterProjects();
        alert(`El proyecto "${projectName}" fue eliminado correctamente.`);
    }
});


// ==================================================
// EDITAR PROYECTO
// ==================================================
projectsBody.addEventListener("click", event => {
    const button = event.target.closest('button[title="Editar"]');
    if (!button) return;

    const row = button.closest("tr");
    if (!row) return;

    // Obtener Datos Actuales
    const projectNameElement = row.querySelector(".project-name strong");
    const descriptionElement = row.querySelector(".project-name span");
    const statusElement = row.querySelector(".status");
    
    const projectName = projectNameElement ? projectNameElement.textContent.trim() : "";
    let description = descriptionElement ? descriptionElement.textContent.trim() : "";
    if (description === "Sin descripción") description = "";

    const cells = row.querySelectorAll("td");
    const responsible = cells[1] ? cells[1].textContent.trim() : "";
    const client = cells[2] ? cells[2].textContent.trim() : "";
    const startDate = cells[3] ? convertToInputDate(cells[3].textContent.trim()) : "";
    const endDate = cells[4] ? convertToInputDate(cells[4].textContent.trim()) : "";
    const status = statusElement ? statusElement.textContent.trim() : "Pendiente";

    // Crear Modal de Edición si no existe
    let modal = document.getElementById("editProjectModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "editProjectModal";
        modal.className = "edit-project-modal"; // Asumo que tienes esta clase en tu CSS
        // Le agrego estilos básicos de modal por si acaso
        modal.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);display:none;align-items:center;justify-content:center;z-index:9999;";
        document.body.appendChild(modal);
    }

    // Contenido del Modal de Edición
    modal.innerHTML = `
        <div class="edit-project-content" style="background:white; padding:25px; border-radius:8px; width:100%; max-width:500px;">
            <div class="edit-project-header" style="display:flex; justify-content:space-between; margin-bottom:20px;">
                <h2 style="margin:0;">Editar proyecto</h2>
                <button type="button" class="close-edit" style="background:none; border:none; font-size:24px; cursor:pointer;">×</button>
            </div>
            
            <form class="edit-project-form" id="editProjectForm">
                <div class="edit-form-group" style="margin-bottom: 15px;">
                    <label>Nombre del proyecto</label>
                    <input type="text" id="editProjectName" value="${escapeHtml(projectName)}" style="width:100%; padding:8px;" required>
                </div>
                <div class="edit-form-group" style="margin-bottom: 15px;">
                    <label>Descripción</label>
                    <textarea id="editDescription" style="width:100%; padding:8px;">${escapeHtml(description)}</textarea>
                </div>
                <div class="edit-form-group" style="margin-bottom: 15px;">
                    <label>Responsable</label>
                    <input type="text" id="editResponsible" value="${escapeHtml(responsible)}" style="width:100%; padding:8px;" required>
                </div>
                <div class="edit-form-group" style="margin-bottom: 15px;">
                    <label>Cliente</label>
                    <input type="text" id="editClient" value="${escapeHtml(client)}" style="width:100%; padding:8px;" required>
                </div>
                <div class="edit-form-group" style="margin-bottom: 15px;">
                    <label>Estado</label>
                    <select id="editStatus" style="width:100%; padding:8px;" required>
                        <option value="Pendiente" ${status === "Pendiente" ? "selected" : ""}>Pendiente</option>
                        <option value="En progreso" ${status === "En progreso" ? "selected" : ""}>En progreso</option>
                        <option value="Completado" ${status === "Completado" ? "selected" : ""}>Completado</option>
                    </select>
                </div>
                <div style="display:flex; gap:10px; margin-bottom:20px;">
                    <div style="flex:1;">
                        <label>Fecha inicio</label>
                        <input type="date" id="editStartDate" value="${startDate}" style="width:100%; padding:8px;" required>
                    </div>
                    <div style="flex:1;">
                        <label>Fecha final</label>
                        <input type="date" id="editEndDate" value="${endDate}" style="width:100%; padding:8px;" required>
                    </div>
                </div>
                <div style="display:flex; justify-content:flex-end; gap:10px;">
                    <button type="button" class="cancel-edit-btn" style="padding:10px 15px; cursor:pointer;">Cancelar</button>
                    <button type="submit" class="save-edit-btn" style="background:#0073a8; color:white; border:none; padding:10px 15px; cursor:pointer; border-radius:4px;">Guardar cambios</button>
                </div>
            </form>
        </div>
    `;

    modal.style.display = "flex"; // Mostrar modal

    // Cerrar modal
    modal.querySelector(".close-edit").addEventListener("click", () => modal.style.display = "none");
    modal.querySelector(".cancel-edit-btn").addEventListener("click", () => modal.style.display = "none");

    // Guardar Cambios
    modal.querySelector("#editProjectForm").addEventListener("submit", event => {
        event.preventDefault();

        const newName = modal.querySelector("#editProjectName").value.trim();
        const newDescription = modal.querySelector("#editDescription").value.trim();
        const newResponsible = modal.querySelector("#editResponsible").value.trim();
        const newClient = modal.querySelector("#editClient").value.trim();
        const newStatus = modal.querySelector("#editStatus").value;
        const newStartDate = modal.querySelector("#editStartDate").value;
        const newEndDate = modal.querySelector("#editEndDate").value;

        if (!newName || !newResponsible || !newClient || !newStatus || !newStartDate || !newEndDate) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Actualizar la fila en la tabla
        projectNameElement.textContent = newName;
        descriptionElement.textContent = newDescription || "Sin descripción";
        cells[1].textContent = newResponsible;
        cells[2].textContent = newClient;
        cells[3].textContent = formatDate(newStartDate);
        cells[4].textContent = formatDate(newEndDate);
        
        statusElement.textContent = newStatus;
        statusElement.className = "status";
        if (newStatus === "Pendiente") statusElement.classList.add("pending");
        else if (newStatus === "En progreso") statusElement.classList.add("active");
        else if (newStatus === "Completado") statusElement.classList.add("completed");

        modal.style.display = "none";
        filterProjects();
        alert(`El proyecto "${newName}" fue actualizado correctamente.`);
    });
});

function convertToInputDate(date) {
    const parts = date.trim().split("/");
    if (parts.length !== 3) return "";
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}