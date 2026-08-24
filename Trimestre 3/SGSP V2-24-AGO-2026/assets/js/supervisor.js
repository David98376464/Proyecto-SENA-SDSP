document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // MENÚ LATERAL
    // ================================

    const menuItems = document.querySelectorAll(
        ".sidebar-menu .menu-item"
    );

    menuItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            const link = this.getAttribute("href");

            // Evita que href="#" mueva la página
            if (link === "#") {
                event.preventDefault();
            }

            // No cambiar el activo al cerrar sesión
            if (this.classList.contains("logout")) {
                return;
            }

            // Quitar activo de todos
            menuItems.forEach(function (menu) {
                menu.classList.remove("active");
            });

            // Activar el seleccionado
            this.classList.add("active");

            const texto = this.querySelector("span:last-child");

            if (texto) {
                console.log("Sección seleccionada:", texto.textContent);
            }

        });

    });


    // ================================
    // BOTÓN DE NOTIFICACIONES
    // ================================

    const notificationButton = document.querySelector(
        ".notification-button"
    );

    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            mostrarNotificacion();

        });

    }


    // ================================
    // ANIMACIÓN DE LAS BARRAS
    // ================================

    const progressBars = document.querySelectorAll(
        ".progress-bar"
    );

    progressBars.forEach(function (bar) {

        const porcentaje = bar.style.width;

        bar.style.width = "0%";

        setTimeout(function () {

            bar.style.width = porcentaje;

        }, 300);

    });


    // ================================
    // MENSAJE INICIAL
    // ================================

    console.log(
        "SGSP - Dashboard del Supervisor cargado correctamente."
    );

});


// ====================================
// MOSTRAR NOTIFICACIÓN
// ====================================

function mostrarNotificacion() {

    // Si ya existe una notificación, la eliminamos
    const anterior = document.querySelector(
        ".system-notification"
    );

    if (anterior) {
        anterior.remove();
    }


    // Crear la notificación
    const notificacion = document.createElement("div");

    notificacion.className = "system-notification";


    // Contenido
    notificacion.innerHTML =
        '<span class="notification-icon">🔔</span>' +
        '<div>' +
        '<strong>Notificaciones</strong>' +
        '<p>Tienes 3 notificaciones pendientes.</p>' +
        '</div>' +
        '<button class="notification-close">×</button>';


    // Agregar al documento
    document.body.appendChild(notificacion);


    // Botón cerrar
    const botonCerrar = notificacion.querySelector(
        ".notification-close"
    );

    botonCerrar.addEventListener("click", function () {

        cerrarNotificacion(notificacion);

    });


    // Cerrar automáticamente después de 4 segundos
    setTimeout(function () {

        cerrarNotificacion(notificacion);

    }, 4000);

}


// ====================================
// CERRAR NOTIFICACIÓN
// ====================================

function cerrarNotificacion(notificacion) {

    if (!notificacion) {
        return;
    }

    notificacion.classList.add("hide");

    setTimeout(function () {

        if (notificacion) {
            notificacion.remove();
        }

    }, 300);

}