document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CARGAR DATOS ÚNICOS DEL PROYECTO SELECCIONADO
    // ==========================================
    const proyectoActivo = JSON.parse(localStorage.getItem('proyectoActivoDetalle'));

    if (proyectoActivo) {
        const nameEl = document.getElementById('det-projectName');
        const idEl = document.getElementById('det-projectId');
        const statusEl = document.getElementById('det-projectStatus');

        if (nameEl) nameEl.textContent = `Detalle del proyecto: ${proyectoActivo.nombre}`;
        if (idEl) idEl.textContent = `ID: ${proyectoActivo.id}`;
        if (statusEl) statusEl.textContent = proyectoActivo.estado;
    } else {
        alert("No se ha seleccionado ningún proyecto. Serás redirigido a la lista.");
        window.location.href = "proyectos.html";
    }

    // ==========================================
    // AGREGAR NUEVAS TAREAS DINÁMICAMENTE
    // ==========================================
    const btnAddTask = document.getElementById('btnAddTask');
    const newTaskInput = document.getElementById('newTaskInput');
    const unassignedTasks = document.getElementById('unassignedTasks');

    if (btnAddTask) {
        btnAddTask.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();
            
            if (taskText !== "") {
                const taskDiv = document.createElement('div');
                taskDiv.style.cssText = "display: flex; justify-content: space-between; padding: 12px 15px; border: 1px solid #f1f5f9; border-radius: 8px; margin-bottom: 10px; font-size: 13px; color: #475569;";
                taskDiv.innerHTML = `
                    <span>${taskText}</span>
                    <span style="color: #94a3b8; font-size: 11px;">Sin asignar</span>
                `;
                
                unassignedTasks.appendChild(taskDiv);
                newTaskInput.value = ''; // Limpiar el input
            }
        });
        
        // Permitir agregar con la tecla Enter
        newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                btnAddTask.click();
            }
        });
    }

});