document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // PROTECCIÓN DEL ROL SUPERVISOR
    // ==================================================

    const usuarioActivo = sessionStorage.getItem("sgspUsuario");
    const rolActivo = sessionStorage.getItem("sgspRol");

    /*
     * Si el usuario no ha iniciado sesión como Supervisor,
     * no permitimos el acceso a las páginas del Supervisor.
     */

    if (
        usuarioActivo !== "true" ||
        rolActivo !== "Supervisor"
    ) {

        window.location.replace("index.html");

        return;
    }


    // ================================
    // MENÚ LATERAL
    // ================================

    const menuItems = document.querySelectorAll(
        ".sidebar-menu .menu-item"
    );

    menuItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            const link = this.getAttribute("href");


            // ==========================================
            // EVITAR QUE href="#" MUEVA LA PÁGINA
            // ==========================================

            if (link === "#") {
                event.preventDefault();
            }


            // ==========================================
            // CERRAR SESIÓN
            // ==========================================

            if (this.classList.contains("logout")) {

                event.preventDefault();

                cerrarSesion();

                return;
            }


            // ==========================================
            // QUITAR ACTIVO DE TODOS
            // ==========================================

            menuItems.forEach(function (menu) {

                menu.classList.remove("active");

            });


            // ==========================================
            // ACTIVAR EL SELECCIONADO
            // ==========================================

            this.classList.add("active");


            const texto = this.querySelector(
                "span:last-child"
            );


            if (texto) {

                console.log(
                    "Sección seleccionada:",
                    texto.textContent
                );

            }

        });

    });


    // ================================
    // BOTÓN DE NOTIFICACIONES
    // ================================

    const notificationButton =
        document.querySelector(
            ".notification-button"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                mostrarNotificacion();

            }
        );

    }


    // ================================
    // ANIMACIÓN DE LAS BARRAS
    // ================================

    const progressBars =
        document.querySelectorAll(
            ".progress-bar"
        );


    progressBars.forEach(function (bar) {

        const porcentaje =
            bar.style.width;


        // Comenzar desde 0

        bar.style.width = "0%";


        // Animar hasta el porcentaje original

        setTimeout(function () {

            bar.style.width =
                porcentaje;

        }, 300);

    });


    // ================================
    // TARJETAS DEL DASHBOARD
    // ================================

    const statCards =
        document.querySelectorAll(
            ".stat-card"
        );


    statCards.forEach(function (card, index) {

        card.style.cursor = "pointer";


        card.addEventListener(
            "click",
            function () {

                switch (index) {

                    // --------------------------
                    // PROYECTOS
                    // --------------------------

                    case 0:

                        window.location.href =
                            "proyectos-supervisor.html";

                        break;


                    // --------------------------
                    // TAREAS
                    // --------------------------

                    case 1:

                        window.location.href =
                            "tareas-supervisor.html";

                        break;


                    // --------------------------
                    // INCIDENCIAS
                    // --------------------------

                    case 2:

                        window.location.href =
                            "incidencias-supervisor.html";

                        break;


                    // --------------------------
                    // MATERIALES
                    // --------------------------

                    case 3:

                        window.location.href =
                            "materiales-supervisor.html";

                        break;

                }

            }
        );

    });


    // ================================
    // ENLACE "VER TODOS"
    // ================================

    const viewLink =
        document.querySelector(
            ".view-link"
        );


    if (viewLink) {

        viewLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.location.href =
                    "proyectos-supervisor.html";

            }
        );

    }


    // ================================
    // MENSAJE INICIAL
    // ================================

    console.log(
        "SGSP - Dashboard del Supervisor cargado correctamente."
    );

    console.log(
        "Rol activo:",
        rolActivo
    );

});


// ====================================
// MOSTRAR NOTIFICACIÓN
// ====================================

function mostrarNotificacion() {

    // Si ya existe una notificación,
    // la eliminamos antes de crear otra.

    const anterior =
        document.querySelector(
            ".system-notification"
        );


    if (anterior) {

        anterior.remove();

    }


    // Crear la notificación

    const notificacion =
        document.createElement("div");


    notificacion.className =
        "system-notification";


    // Contenido

    notificacion.innerHTML =
        '<span class="notification-icon">🔔</span>' +
        '<div>' +
        '<strong>Notificaciones</strong>' +
        '<p>Tienes 3 notificaciones pendientes.</p>' +
        '</div>' +
        '<button class="notification-close" type="button">×</button>';


    // Agregar al documento

    document.body.appendChild(
        notificacion
    );


    // Botón cerrar

    const botonCerrar =
        notificacion.querySelector(
            ".notification-close"
        );


    if (botonCerrar) {

        botonCerrar.addEventListener(
            "click",
            function () {

                cerrarNotificacion(
                    notificacion
                );

            }
        );

    }


    // Cerrar automáticamente después de 4 segundos

    setTimeout(function () {

        cerrarNotificacion(
            notificacion
        );

    }, 4000);

}


// ====================================
// CERRAR NOTIFICACIÓN
// ====================================

function cerrarNotificacion(
    notificacion
) {

    if (!notificacion) {

        return;

    }


    notificacion.classList.add(
        "hide"
    );


    setTimeout(function () {

        if (
            notificacion &&
            notificacion.parentNode
        ) {

            notificacion.remove();

        }

    }, 300);

}


// ====================================
// CERRAR SESIÓN
// ====================================

function cerrarSesion() {

    console.log(
        "Cerrando sesión del Supervisor..."
    );


    // ==========================================
    // ELIMINAR DATOS DE LA SESIÓN
    // ==========================================

    sessionStorage.removeItem(
        "sgspUsuario"
    );

    sessionStorage.removeItem(
        "sgspRol"
    );

    sessionStorage.removeItem(
        "sgspCorreo"
    );


    // ==========================================
    // REGRESAR AL LOGIN
    // ==========================================

    window.location.replace(
        "index.html"
    );

}