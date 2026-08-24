document.addEventListener('DOMContentLoaded', () => {

    const btnAddMat = document.getElementById('btnAddMat');
    const modalMat = document.getElementById('modalMat');
    const closeModalMat = document.getElementById('closeModalMat');
    const formMat = document.getElementById('formMat');
    const matTableBody = document.querySelector('#matTable tbody');
    const matCount = document.getElementById('matCount');

    // 1. Abrir y cerrar el modal
    if(btnAddMat) {
        btnAddMat.addEventListener('click', () => modalMat.classList.add('show'));
        closeModalMat.addEventListener('click', () => modalMat.classList.remove('show'));
        modalMat.addEventListener('click', (e) => {
            if (e.target === modalMat) modalMat.classList.remove('show');
        });
    }

    function updateMatCount() {
        const count = matTableBody.querySelectorAll('tr').length;
        matCount.textContent = `${count} Registros de uso`;
    }

    // 2. Agregar nuevo material con los campos libres del formulario
    if(formMat) {
        formMat.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('useMatName').value.trim();
            const qty = document.getElementById('useMatQty').value;
            const unit = document.getElementById('useMatUnit').value;
            
            // Crear la fila con la cantidad en color negro normal
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="mat-name-col">
                        <div class="mat-icon">📦</div>
                        <strong>${name}</strong>
                    </div>
                </td>
                <td><strong class="text-normal">${qty}</strong></td>
                <td>${unit}</td>
                <td><button class="btn-delete" title="Eliminar registro">🗑</button></td>
            `;

            matTableBody.appendChild(tr);
            updateMatCount();
            
            // Limpiar formulario y cerrar modal
            formMat.reset();
            modalMat.classList.remove('show');
        });
    }

    // 3. Eliminar registro de la tabla
    if(matTableBody) {
        matTableBody.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.btn-delete');
            
            if(deleteBtn) {
                const row = deleteBtn.closest('tr');
                const matName = row.querySelector('.mat-name-col strong').textContent;
                
                if(confirm(`¿Desea eliminar el registro de ${matName}?`)) {
                    row.remove();
                    updateMatCount();
                }
            }
        });
    }

});