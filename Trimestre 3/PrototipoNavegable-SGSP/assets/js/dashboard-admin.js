// ==================================================
// DASHBOARD ADMINISTRADOR
// ==================================================


// ==================================================
// TARJETAS DEL DASHBOARD
// ==================================================

const dashboardCards =
    document.querySelectorAll(".dashboard-card");


// ==================================================
// NAVEGACIÓN DE LAS TARJETAS
// ==================================================

dashboardCards.forEach((card, index) => {

    card.style.cursor = "pointer";


    card.addEventListener("click", () => {

        switch (index) {

            // ------------------------------------------
            // PROYECTOS
            // ------------------------------------------

            case 0:

                window.location.href =
                    "proyectos.html";

                break;


            // ------------------------------------------
            // EMPLEADOS
            // ------------------------------------------

            case 1:

                window.location.href =
                    "empleados.html";

                break;


            // ------------------------------------------
            // TAREAS
            // ------------------------------------------

            case 2:

                window.location.href =
                    "tareas.html";

                break;


            // ------------------------------------------
            // MATERIALES
            // ------------------------------------------

            case 3:

                window.location.href =
                    "materiales.html";

                break;

        }

    });

});


// ==================================================
// BOTÓN "VER TODOS"
// ==================================================

const viewAllProjects =
    document.querySelector(".panel-header a");


if (viewAllProjects) {

    viewAllProjects.addEventListener(
        "click",
        event => {

            event.preventDefault();

            window.location.href =
                "proyectos.html";

        }
    );

}


// ==================================================
// PROYECTOS RECIENTES
// ==================================================

const projectRows =
    document.querySelectorAll(
        ".dashboard-panel:first-child tbody tr"
    );


projectRows.forEach(row => {

    row.style.cursor = "pointer";


    row.addEventListener("click", () => {

        window.location.href =
            "proyectos.html";

    });

});


// ==================================================
// NOTIFICACIONES
// ==================================================

const notificationButton =
    document.querySelector(
        ".notification-button"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        () => {

            alert(
                "🔔 Notificaciones recientes:\n\n" +
                "• Nuevo proyecto registrado\n" +
                "• Tarea completada\n" +
                "• Material con bajo inventario\n" +
                "• Nuevo empleado registrado"
            );

        }
    );

}


// ==================================================
// PERFIL DEL ADMINISTRADOR
// ==================================================

const headerUser =
    document.querySelector(".header-user");


if (headerUser) {

    headerUser.style.cursor = "pointer";


    headerUser.addEventListener(
        "click",
        () => {

            window.location.href =
                "configuracion.html";

        }
    );

}


// ==================================================
// ACTIVIDADES RECIENTES
// ==================================================

const activityItems =
    document.querySelectorAll(
        ".activity-item"
    );


activityItems.forEach(item => {

    item.style.cursor = "pointer";


    item.addEventListener("click", () => {

        const activityText =
            item.querySelector("strong");


        if (!activityText) {
            return;
        }


        const activity =
            activityText.textContent.trim();


        // ------------------------------------------
        // NUEVO PROYECTO
        // ------------------------------------------

        if (
            activity.includes(
                "Nuevo proyecto"
            )
        ) {

            window.location.href =
                "proyectos.html";

        }


        // ------------------------------------------
        // TAREA
        // ------------------------------------------

        else if (
            activity.includes(
                "Tarea"
            )
        ) {

            window.location.href =
                "tareas.html";

        }


        // ------------------------------------------
        // MATERIAL
        // ------------------------------------------

        else if (
            activity.includes(
                "Material"
            )
        ) {

            window.location.href =
                "materiales.html";

        }


        // ------------------------------------------
        // EMPLEADO
        // ------------------------------------------

        else if (
            activity.includes(
                "empleado"
            )
        ) {

            window.location.href =
                "empleados.html";

        }

    });

});


// ==================================================
// MENSAJE INICIAL EN CONSOLA
// ==================================================

console.log(
    "SGSP - Dashboard administrador cargado correctamente."
);