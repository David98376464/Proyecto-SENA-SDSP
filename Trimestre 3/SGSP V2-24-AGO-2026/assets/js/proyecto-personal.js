document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // LÓGICA DE PERSONAL ASIGNADO (Conectado a la empresa)
    // ==========================================
    const btnAddPersonal = document.getElementById('btnAddPersonal');
    const modalPersonal = document.getElementById('modalPersonal');
    const closeModalPersonal = document.getElementById('closeModalPersonal');
    const personalTableBody = document.querySelector('#personalTable tbody');
    const empleadosCount = document.getElementById('empleadosCount');
    
    // Tabla dentro de la ventana modal
    const empresaListBody = document.querySelector('#empresaListTable tbody'); 

    // Cargar datos guardados del proyecto o iniciar vacío
    let personalProyecto = JSON.parse(localStorage.getItem('proyectoPersonalActivo')) || [];

    // ==========================================
    // FUNCIÓN 1: Dibujar la tabla principal del proyecto
    // ==========================================
    function renderProyectoPersonal() {
        personalTableBody.innerHTML = '';
        
        if(personalProyecto.length === 0) {
            personalTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 20px;">No hay personal asignado a este proyecto.</td></tr>`;
            empleadosCount.textContent = `0 Empleados asignados`;
            return;
        }

        personalProyecto.forEach((emp, index) => {
            const badgeClass = (emp.cargo && (emp.cargo.includes('Ing') || emp.cargo.includes('Supervisor'))) ? 'ing' : 'gray';
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${emp.nombre}</td>
                <td>${emp.documento}</td>
                <td><span class="badge-oficio ${badgeClass}">${emp.cargo}</span></td>
                <td>${emp.fechaInicio}</td>
                <td><button class="btn-delete" data-index="${index}" title="Eliminar">🗑</button></td>
            `;
            personalTableBody.appendChild(tr);
        });

        empleadosCount.textContent = `${personalProyecto.length} Empleados asignados`;
        localStorage.setItem('proyectoPersonalActivo', JSON.stringify(personalProyecto));
    }

    // ==========================================
    // FUNCIÓN 2: Cargar la lista general en el Modal
    // ==========================================
    function cargarEmpleadosEmpresa() {
        if (!empresaListBody) return;
        
        empresaListBody.innerHTML = '';
        const empresaEmpleados = JSON.parse(localStorage.getItem('empresaEmpleados')) || [];

        if (empresaEmpleados.length === 0) {
            empresaListBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 20px;">No hay empleados registrados en la empresa. Ve a la sección 'Empleados' para agregar uno.</td></tr>`;
            return;
        }

        empresaEmpleados.forEach(emp => {
            if (emp.estado === 'Inactivo') return;

            const yaAsignado = personalProyecto.some(p => p.documento === emp.documento);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${emp.nombre}</strong></td>
                <td>${emp.cargo}</td>
                <td>${emp.documento}</td>
                <td>
                    ${yaAsignado 
                        ? '<span style="color: #16a34a; font-weight: 600; font-size: 12px;">Asignado ✓</span>' 
                        : `<button class="btn-add-row" data-nombre="${emp.nombre}" data-doc="${emp.documento}" data-cargo="${emp.cargo}" style="background: #0073a8; color: white; border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer;">+</button>`
                    }
                </td>
            `;
            empresaListBody.appendChild(tr);
        });
    }

    // ==========================================
    // EVENTOS: Abrir modal, agregar y eliminar
    // ==========================================

    if(btnAddPersonal) {
        // AQUÍ ESTÁ LA SOLUCIÓN: Cambiamos display a 'flex' para forzar que se vea
        btnAddPersonal.addEventListener('click', () => {
            modalPersonal.style.display = 'flex';
            cargarEmpleadosEmpresa(); 
        });
        
        // Cerramos cambiando el display a 'none'
        closeModalPersonal.addEventListener('click', () => modalPersonal.style.display = 'none');
        modalPersonal.addEventListener('click', (e) => {
            if (e.target === modalPersonal) modalPersonal.style.display = 'none';
        });
    }

    if(empresaListBody) {
        empresaListBody.addEventListener('click', (e) => {
            const addBtn = e.target.closest('.btn-add-row');
            
            if(addBtn) {
                const hoy = new Date();
                const fechaForm = `${hoy.getDate().toString().padStart(2, '0')}/${(hoy.getMonth() + 1).toString().padStart(2, '0')}/${hoy.getFullYear()}`;

                const nuevoEmp = {
                    nombre: addBtn.getAttribute('data-nombre'),
                    documento: addBtn.getAttribute('data-doc'),
                    cargo: addBtn.getAttribute('data-cargo'),
                    fechaInicio: fechaForm
                };

                personalProyecto.push(nuevoEmp);
                renderProyectoPersonal();
                cargarEmpleadosEmpresa(); 
            }
        });
    }

    if(personalTableBody) {
        personalTableBody.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.btn-delete');
            
            if(deleteBtn) {
                const index = deleteBtn.getAttribute('data-index');
                const empName = personalProyecto[index].nombre;
                
                if(confirm(`¿Estás seguro de retirar a ${empName} de este proyecto?`)) {
                    personalProyecto.splice(index, 1);
                    renderProyectoPersonal();
                }
            }
        });
    }

    // Ejecutar al iniciar
    renderProyectoPersonal();

});