document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CARGAR DATOS DEL PROYECTO
    // ==========================================
    const proyectoActivo = JSON.parse(localStorage.getItem('proyectoActivoDetalle'));
    const personalProyecto = JSON.parse(localStorage.getItem('proyectoPersonalActivo')) || [];

    if (!proyectoActivo) {
        alert("No se ha seleccionado ningún proyecto. Serás redirigido.");
        window.location.href = "proyectos.html";
        return;
    }

    // Cabecera
    const nameEl = document.getElementById('det-projectName');
    const idEl = document.getElementById('det-projectId');
    const statusEl = document.getElementById('det-projectStatus');
    if (nameEl) nameEl.textContent = `Detalle del proyecto: ${proyectoActivo.nombre}`;
    if (idEl) idEl.textContent = `ID: ${proyectoActivo.id}`;
    if (statusEl) statusEl.textContent = proyectoActivo.estado;

    // ==========================================
    // 2. MEMORIA DE TAREAS (CON CONTADOR INDEPENDIENTE)
    // ==========================================
    const storageKey = `seguimiento_${proyectoActivo.id}`;
    
    // Agregamos "taskCounter: 0" para llevar la cuenta de este proyecto específico
    let seguimientoData = JSON.parse(localStorage.getItem(storageKey)) || {
        taskCounter: 0, 
        tareasNoAsignadas: [],
        tareasAsignadas: []
    };

    // Migración por seguridad (En caso de que hubieran datos viejos)
    seguimientoData.tareasNoAsignadas = seguimientoData.tareasNoAsignadas.map(t => 
        typeof t === 'string' ? { id: 'TAR000', descripcion: t, fecha: 'N/A', autor: 'Admin' } : t
    );

    const unassignedTasks = document.getElementById('unassignedTasks');
    const activeTasks = document.getElementById('activeTasks');
    const btnAddTask = document.getElementById('btnAddTask');
    const newTaskInput = document.getElementById('newTaskInput');

    // ==========================================
    // 3. RENDERIZAR TAREAS
    // ==========================================
    
    function renderTareasNoAsignadas() {
        if(!unassignedTasks) return;
        unassignedTasks.innerHTML = '';
        
        if (seguimientoData.tareasNoAsignadas.length === 0) {
            unassignedTasks.innerHTML = '<p style="font-size: 12px; color: #94a3b8; padding: 10px 0;">No hay tareas pendientes por asignar.</p>';
            return;
        }

        seguimientoData.tareasNoAsignadas.forEach((tarea, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; border: 1px solid #f1f5f9; border-radius: 8px; margin-bottom: 10px; background: #ffffff;";
            
            taskDiv.innerHTML = `
                <div>
                    <strong style="display: block; color: #0073a8; font-size: 11px; margin-bottom: 3px;">${tarea.id}</strong>
                    <span style="font-size: 13px; color: #475569;">${tarea.descripcion}</span>
                </div>
                <button class="btn-assign-task" data-index="${index}" title="Asignar tarea a personal" style="background: transparent; border: none; color: #0073a8; font-size: 24px; cursor: pointer;">+</button>
            `;
            unassignedTasks.appendChild(taskDiv);
        });
    }

    function renderTareasAsignadas() {
        if(!activeTasks) return;
        activeTasks.innerHTML = '';

        if (seguimientoData.tareasAsignadas.length === 0) {
            activeTasks.innerHTML = '<p style="font-size: 12px; color: #94a3b8; text-align: center;">Aún no hay tareas en seguimiento.</p>';
            return;
        }

        seguimientoData.tareasAsignadas.forEach((tarea) => {
            const badgeClass = tarea.estado === 'PENDIENTE' ? 'badge-pending' : 'badge-in-progress';
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-item';
            taskDiv.innerHTML = `
                <div class="task-info">
                    <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #1e293b;">${tarea.descripcion}</h4>
                    <span style="font-size: 11px; color: #94a3b8;">ID: ${tarea.id} | Asignado a: ${tarea.asignadoA} (${tarea.cargo})</span>
                </div>
                <span class="${badgeClass}">${tarea.estado}</span>
            `;
            activeTasks.appendChild(taskDiv);
        });
    }

    renderTareasNoAsignadas();
    renderTareasAsignadas();


    // ==========================================
    // 4. LÓGICA DEL NUEVO MODAL DE "CREAR TAREA"
    // ==========================================
    const modalCreateTask = document.getElementById('modalCreateTask');
    const closeCreateModal = document.getElementById('closeCreateModal');
    const formCreateTask = document.getElementById('formCreateTask');
    
    const displayNewTaskId = document.getElementById('displayNewTaskId');
    const displayNewTaskDate = document.getElementById('displayNewTaskDate');
    const displayNewTaskAuthor = document.getElementById('displayNewTaskAuthor');
    const newTaskDesc = document.getElementById('newTaskDesc');

    // ABRIR MODAL
    if (btnAddTask) {
        btnAddTask.addEventListener('click', () => {
            
            // --- NUEVA LÓGICA DE AUTOINCREMENTO ---
            // Calculamos cuál será el número de la siguiente tarea sin guardarlo aún
            const siguienteNumero = (seguimientoData.taskCounter || 0) + 1;
            
            // Formateamos para que tenga 3 dígitos (Ej: TAR001, TAR015)
            const uniqueId = `TAR${siguienteNumero.toString().padStart(3, '0')}`;
            
            // Fecha Actual
            const hoy = new Date();
            const fechaActual = `${hoy.getDate().toString().padStart(2, '0')}/${(hoy.getMonth() + 1).toString().padStart(2, '0')}/${hoy.getFullYear()}`;
            
            displayNewTaskId.textContent = uniqueId;
            displayNewTaskDate.textContent = fechaActual;
            displayNewTaskAuthor.textContent = "Eladio Villamizar"; // O "Usuario Administrador"
            
            if (newTaskInput.value.trim() !== "") {
                newTaskDesc.value = newTaskInput.value.trim();
                newTaskInput.value = ''; 
            } else {
                newTaskDesc.value = '';
            }

            modalCreateTask.style.display = 'flex';
        });
    }

    // CERRAR MODAL
    if (closeCreateModal) {
        closeCreateModal.addEventListener('click', () => modalCreateTask.style.display = 'none');
    }

    // GUARDAR TAREA Y ACTUALIZAR CONTADOR
    if (formCreateTask) {
        formCreateTask.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nuevaTarea = {
                id: displayNewTaskId.textContent,
                descripcion: newTaskDesc.value.trim(),
                fecha: displayNewTaskDate.textContent,
                autor: displayNewTaskAuthor.textContent
            };

            // 1. Guardamos la nueva tarea
            seguimientoData.tareasNoAsignadas.push(nuevaTarea);
            
            // 2. ACTUALIZAMOS EL CONTADOR OFICIALMENTE EN LA MEMORIA
            seguimientoData.taskCounter = (seguimientoData.taskCounter || 0) + 1;
            
            // 3. Guardamos todo en el LocalStorage
            localStorage.setItem(storageKey, JSON.stringify(seguimientoData));
            
            // 4. Refrescamos la pantalla
            renderTareasNoAsignadas();
            modalCreateTask.style.display = 'none';
        });
    }


    // ==========================================
    // 5. LÓGICA DEL MODAL DE "ASIGNAR TAREA"
    // ==========================================
    const modalAssignTask = document.getElementById('modalAssignTask');
    const closeAssignModal = document.getElementById('closeAssignModal');
    const formAssignTask = document.getElementById('formAssignTask');
    const selectAssignPerson = document.getElementById('selectAssignPerson');
    const displayTaskName = document.getElementById('displayTaskName');
    const hiddenTaskIndex = document.getElementById('hiddenTaskIndex');

    if (closeAssignModal) {
        closeAssignModal.addEventListener('click', () => modalAssignTask.style.display = 'none');
    }

    if (unassignedTasks) {
        unassignedTasks.addEventListener('click', (e) => {
            const assignBtn = e.target.closest('.btn-assign-task');
            if (assignBtn) {
                const index = assignBtn.getAttribute('data-index');
                const tareaObj = seguimientoData.tareasNoAsignadas[index];

                hiddenTaskIndex.value = index;
                displayTaskName.textContent = `${tareaObj.id} - ${tareaObj.descripcion}`;

                selectAssignPerson.innerHTML = '<option value="">Seleccione personal...</option>';
                if (personalProyecto.length === 0) {
                    selectAssignPerson.innerHTML += `<option disabled>No hay personal asignado a la obra aún</option>`;
                } else {
                    personalProyecto.forEach(persona => {
                        selectAssignPerson.innerHTML += `<option value="${persona.nombre}|${persona.cargo}">${persona.nombre} - ${persona.cargo}</option>`;
                    });
                }
                modalAssignTask.style.display = 'flex';
            }
        });
    }

    if (formAssignTask) {
        formAssignTask.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const indexToRemove = hiddenTaskIndex.value;
            const tareaObj = seguimientoData.tareasNoAsignadas[indexToRemove];
            const personaSeleccionada = selectAssignPerson.value;

            if(personaSeleccionada) {
                const partes = personaSeleccionada.split('|');
                
                seguimientoData.tareasAsignadas.push({
                    id: tareaObj.id,
                    descripcion: tareaObj.descripcion,
                    fecha: tareaObj.fecha,
                    autor: tareaObj.autor,
                    asignadoA: partes[0], 
                    cargo: partes[1],     
                    estado: 'PENDIENTE'
                });

                seguimientoData.tareasNoAsignadas.splice(indexToRemove, 1);
                
                localStorage.setItem(storageKey, JSON.stringify(seguimientoData));
                renderTareasNoAsignadas();
                renderTareasAsignadas();

                modalAssignTask.style.display = 'none';
                formAssignTask.reset();
            }
        });
    }

});