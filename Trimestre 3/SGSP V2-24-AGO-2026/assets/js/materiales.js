document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTOS PRINCIPALES
       ========================================================= */

    const searchInput =
        document.getElementById("searchMaterial");

    const statusFilter =
        document.getElementById("filterMaterialStatus");

    const projectFilter =
        document.getElementById("filterMaterialProject");

    const newMaterialBtn =
        document.getElementById("newMaterialBtn");

    const materialsBody =
        document.getElementById("materialsBody");

    const materialCount =
        document.getElementById("materialCount");


    /* =========================================================
       MODALES
       ========================================================= */

    const viewModal =
        document.getElementById("viewMaterialModal");

    const formModal =
        document.getElementById("materialFormModal");

    const materialForm =
        document.getElementById("materialForm");


    /* =========================================================
       CAMPOS DEL FORMULARIO
       ========================================================= */

    const materialName =
        document.getElementById("materialName");

    const materialDescription =
        document.getElementById("materialDescription");

    const materialCategory =
        document.getElementById("materialCategory");

    const materialProject =
        document.getElementById("materialProject");

    const materialQuantity =
        document.getElementById("materialQuantity");

    const materialUnit =
        document.getElementById("materialUnit");

    const materialStatus =
        document.getElementById("materialStatus");


    const materialFormTitle =
        document.getElementById("materialFormTitle");

    const materialFormSubtitle =
        document.getElementById("materialFormSubtitle");

    const saveMaterialBtn =
        document.getElementById("saveMaterialBtn");


    /* =========================================================
       MATERIAL QUE SE ESTÁ EDITANDO
       ========================================================= */

    let editingRow = null;


    /* =========================================================
       ABRIR / CERRAR MODALES
       ========================================================= */

    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";
    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("show");

        document.body.style.overflow = "";
    }


    /* =========================================================
       CERRAR CON BOTONES
       ========================================================= */

    document.querySelectorAll("[data-close-modal]")
        .forEach(button => {

            button.addEventListener("click", () => {

                closeModal(viewModal);
                closeModal(formModal);

            });

        });


    /* =========================================================
       CERRAR AL HACER CLICK FUERA
       ========================================================= */

    [viewModal, formModal].forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal(modal);
            }

        });

    });


    /* =========================================================
       CERRAR CON ESC
       ========================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModal(viewModal);
            closeModal(formModal);

        }

    });


    /* =========================================================
       OBTENER INFORMACIÓN DE UNA FILA
       ========================================================= */

    function getMaterialData(row) {

        const cells = row.querySelectorAll("td");

        const info =
            row.querySelector(".material-info");

        const icon =
            row.querySelector(".material-icon");

        const name =
            info?.querySelector("strong")?.textContent.trim() || "";

        const description =
            info?.querySelector("span")?.textContent.trim() || "";

        const category =
            cells[1]?.textContent.trim() || "";

        const project =
            cells[2]?.textContent.trim() || "";

        const quantity =
            cells[3]?.textContent.trim() || "";

        const unit =
            cells[4]?.textContent.trim() || "";

        const status =
            row.querySelector(".material-status")?.textContent.trim() || "";

        return {
            name,
            description,
            category,
            project,
            quantity,
            unit,
            status,
            icon: icon?.textContent.trim() || "📦"
        };

    }


    /* =========================================================
       ACTUALIZAR CONTADOR
       ========================================================= */

    function updateCount(count) {

        materialCount.textContent =
            `${count} ${count === 1 ? "material" : "materiales"}`;

    }


    /* =========================================================
       BUSCAR Y FILTRAR
       ========================================================= */

    function filterMaterials() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const selectedStatus =
            statusFilter.value;

        const selectedProject =
            projectFilter.value;

        const rows =
            materialsBody.querySelectorAll("tr");

        let visibleCount = 0;


        rows.forEach(row => {

            const data =
                getMaterialData(row);

            const completeText =
                `${data.name}
                 ${data.description}
                 ${data.category}
                 ${data.project}
                 ${data.unit}
                 ${data.status}`
                .toLowerCase();


            const matchesSearch =
                completeText.includes(searchText);

            const matchesStatus =
                selectedStatus === "all" ||
                data.status === selectedStatus;

            const matchesProject =
                selectedProject === "all" ||
                data.project === selectedProject;


            const visible =
                matchesSearch &&
                matchesStatus &&
                matchesProject;


            row.style.display =
                visible ? "" : "none";


            if (visible) {
                visibleCount++;
            }

        });


        updateCount(visibleCount);

    }


    /* =========================================================
       EVENTOS DE FILTROS
       ========================================================= */

    searchInput.addEventListener(
        "input",
        filterMaterials
    );

    statusFilter.addEventListener(
        "change",
        filterMaterials
    );

    projectFilter.addEventListener(
        "change",
        filterMaterials
    );


    /* =========================================================
       NUEVO MATERIAL
       ========================================================= */

    newMaterialBtn.addEventListener("click", () => {

        editingRow = null;

        materialForm.reset();

        materialFormTitle.textContent =
            "Nuevo material";

        materialFormSubtitle.textContent =
            "Registra un nuevo material para el proyecto.";

        saveMaterialBtn.textContent =
            "Crear material";

        openModal(formModal);

        materialName.focus();

    });


    /* =========================================================
       CREAR / EDITAR MATERIAL
       ========================================================= */

    materialForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            materialName.value.trim();

        const description =
            materialDescription.value.trim();

        const category =
            materialCategory.value.trim();

        const project =
            materialProject.value;

        const quantity =
            materialQuantity.value;

        const unit =
            materialUnit.value.trim();

        const status =
            materialStatus.value;


        /* -----------------------------------------------------
           EDITAR
           ----------------------------------------------------- */

        if (editingRow) {

            updateMaterialRow(
                editingRow,
                {
                    name,
                    description,
                    category,
                    project,
                    quantity,
                    unit,
                    status
                }
            );

            closeModal(formModal);

            filterMaterials();

            return;
        }


        /* -----------------------------------------------------
           NUEVO
           ----------------------------------------------------- */

        const newRow =
            createMaterialRow({
                name,
                description,
                category,
                project,
                quantity,
                unit,
                status
            });


        materialsBody.appendChild(newRow);

        closeModal(formModal);

        filterMaterials();

    });


    /* =========================================================
       CREAR FILA
       ========================================================= */

    function createMaterialRow(data) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="material-info">

                    <div class="material-icon">
                        📦
                    </div>

                    <div>

                        <strong>
                            ${data.name}
                        </strong>

                        <span>
                            ${data.description}
                        </span>

                    </div>

                </div>

            </td>


            <td>
                ${data.category}
            </td>


            <td>
                ${data.project}
            </td>


            <td>
                ${data.quantity}
            </td>


            <td>
                ${data.unit}
            </td>


            <td>

                <span class="material-status ${getStatusClass(data.status)}">
                    ${data.status}
                </span>

            </td>


            <td>

                <div class="material-actions">

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


        return row;

    }


    /* =========================================================
       ACTUALIZAR FILA
       ========================================================= */

    function updateMaterialRow(row, data) {

        const info =
            row.querySelector(".material-info");

        info.querySelector("strong")
            .textContent = data.name;

        info.querySelector("span")
            .textContent = data.description;


        const icon =
            info.querySelector(".material-icon");

        icon.textContent = "📦";


        const cells =
            row.querySelectorAll("td");

        cells[1].textContent =
            data.category;

        cells[2].textContent =
            data.project;

        cells[3].textContent =
            data.quantity;

        cells[4].textContent =
            data.unit;


        const statusElement =
            row.querySelector(".material-status");

        statusElement.textContent =
            data.status;

        statusElement.className =
            `material-status ${getStatusClass(data.status)}`;

    }


    /* =========================================================
       CLASE DEL ESTADO
       ========================================================= */

    function getStatusClass(status) {

        if (status === "Disponible") {
            return "available";
        }

        if (status === "Bajo stock") {
            return "low";
        }

        if (status === "Agotado") {
            return "empty";
        }

        return "";

    }


    /* =========================================================
       ACCIONES DE LA TABLA
       ========================================================= */

    materialsBody.addEventListener("click", event => {

        const button =
            event.target.closest("button");

        if (!button) return;


        const row =
            button.closest("tr");

        if (!row) return;


        const data =
            getMaterialData(row);


        /* -----------------------------------------------------
           VER
           ----------------------------------------------------- */

        if (button.title === "Ver") {

            showMaterial(data);

        }


        /* -----------------------------------------------------
           EDITAR
           ----------------------------------------------------- */

        if (button.title === "Editar") {

            editMaterial(row, data);

        }


        /* -----------------------------------------------------
           ELIMINAR
           ----------------------------------------------------- */

        if (button.title === "Eliminar") {

            const confirmDelete =
                confirm(
                    `¿Deseas eliminar el material "${data.name}"?`
                );


            if (confirmDelete) {

                row.remove();

                filterMaterials();

            }

        }

    });


    /* =========================================================
       MOSTRAR MATERIAL
       ========================================================= */

    function showMaterial(data) {

        document.getElementById("viewMaterialIcon")
            .textContent = data.icon;

        document.getElementById("viewMaterialName")
            .textContent = data.name;

        document.getElementById("viewMaterialDescription")
            .textContent = data.description;

        document.getElementById("viewMaterialCategory")
            .textContent = data.category;

        document.getElementById("viewMaterialProject")
            .textContent = data.project;

        document.getElementById("viewMaterialQuantity")
            .textContent =
                `${data.quantity} ${data.unit}`;

        document.getElementById("viewMaterialUnit")
            .textContent = data.unit;

        document.getElementById("viewMaterialStatus")
            .textContent = data.status;


        openModal(viewModal);

    }


    /* =========================================================
       EDITAR MATERIAL
       ========================================================= */

    function editMaterial(row, data) {

        editingRow = row;


        materialName.value =
            data.name;

        materialDescription.value =
            data.description;

        materialCategory.value =
            data.category;

        materialProject.value =
            data.project;

        materialQuantity.value =
            data.quantity;

        materialUnit.value =
            data.unit;

        materialStatus.value =
            data.status;


        materialFormTitle.textContent =
            "Editar material";

        materialFormSubtitle.textContent =
            "Actualiza la información del material.";

        saveMaterialBtn.textContent =
            "Guardar cambios";


        openModal(formModal);

        materialName.focus();

    }


    /* =========================================================
       INICIALIZAR
       ========================================================= */

    filterMaterials();

});

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