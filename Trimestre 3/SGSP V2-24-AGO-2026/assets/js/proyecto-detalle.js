document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CARGAR DATOS ÚNICOS DEL PROYECTO SELECCIONADO
    // ==========================================
    const proyectoActivo = JSON.parse(localStorage.getItem('proyectoActivoDetalle'));

    if (proyectoActivo) {
        // Seleccionar los elementos del DOM en el HTML de detalles
        const nameEl = document.getElementById('det-projectName');
        const idEl = document.getElementById('det-projectId');
        const clientEl = document.getElementById('det-projectClient');
        const managerEl = document.getElementById('det-projectManager');
        const statusSelect = document.getElementById('statusSelect');

        // Inyectar la información única correspondiente a este proyecto
        if (nameEl) nameEl.textContent = proyectoActivo.nombre;
        if (idEl) idEl.textContent = `ID: ${proyectoActivo.id}`;
        if (clientEl) clientEl.textContent = `Cliente: ${proyectoActivo.cliente}`;
        if (managerEl) managerEl.textContent = proyectoActivo.responsable;
        if (statusSelect) statusSelect.value = proyectoActivo.estado;
        
    } else {
        // En caso de que un usuario intente entrar directamente por la URL sin seleccionar un proyecto previo
        alert("No se ha seleccionado ningún proyecto. Serás redirigido a la lista.");
        window.location.href = "proyectos.html";
    }

});