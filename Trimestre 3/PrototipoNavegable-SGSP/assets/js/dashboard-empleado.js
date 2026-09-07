/* =========================================================
   DASHBOARD EMPLEADO - SGSP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DATOS DEL EMPLEADO
    ===================================================== */

    const empleado = {
        nombre: "José",
        nombreCompleto: "José Vega",
        iniciales: "JV",
        rol: "Empleado"
    };


    /* =====================================================
       DATOS DEL DASHBOARD
    ===================================================== */

    const datosDashboard = {
        proyectosAsignados: 3,
        tareasAsignadas: 8,
        tareasPendientes: 3,
        tareasCompletadas: 5
    };


    /* =====================================================
       ACTUALIZAR INFORMACIÓN DEL USUARIO
    ===================================================== */

    const tituloBienvenida = document.querySelector(".top-header h1");
    const nombreUsuario = document.querySelector(".user-data strong");
    const avatar = document.querySelector(".user-avatar");

    if (tituloBienvenida) {
        tituloBienvenida.textContent = `Bienvenido, ${empleado.nombre}`;
    }

    if (nombreUsuario) {
        nombreUsuario.textContent = empleado.nombreCompleto;
    }

    if (avatar) {
        avatar.textContent = empleado.iniciales;
    }


    /* =====================================================
       ACTUALIZAR ESTADÍSTICAS
    ===================================================== */

    const estadisticas = document.querySelectorAll(".stat-info strong");

    if (estadisticas.length >= 4) {

        estadisticas[0].textContent =
            datosDashboard.proyectosAsignados;

        estadisticas[1].textContent =
            datosDashboard.tareasAsignadas;

        estadisticas[2].textContent =
            datosDashboard.tareasPendientes;

        estadisticas[3].textContent =
            datosDashboard.tareasCompletadas;
    }


    /* =====================================================
       PROYECTOS Y PORCENTAJES
    ===================================================== */

    const proyectos = [
        {
            nombre: "Proyecto Alfa",
            porcentaje: 75
        },
        {
            nombre: "Proyecto Beta",
            porcentaje: 50
        },
        {
            nombre: "Proyecto Gamma",
            porcentaje: 35
        }
    ];


    const barras = document.querySelectorAll(".progress-fill");
    const porcentajes = document.querySelectorAll(".progress-info span");
    const nombresProyectos =
        document.querySelectorAll(".progress-info strong");


    proyectos.forEach((proyecto, index) => {

        if (barras[index]) {
            barras[index].style.width =
                `${proyecto.porcentaje}%`;
        }

        if (porcentajes[index]) {
            porcentajes[index].textContent =
                `${proyecto.porcentaje}%`;
        }

        if (nombresProyectos[index]) {
            nombresProyectos[index].textContent =
                proyecto.nombre;
        }

    });


    /* =====================================================
       NOTIFICACIONES
    ===================================================== */

    const notificacion =
        document.querySelector(".notification");

    const puntoNotificacion =
        document.querySelector(".notification-dot");

    if (notificacion) {

        notificacion.addEventListener("click", () => {

            if (puntoNotificacion) {
                puntoNotificacion.style.display = "none";
            }

            mostrarMensaje(
                "No tienes nuevas notificaciones."
            );

        });

    }


    /* =====================================================
       BOTÓN "VER TODAS"
    ===================================================== */

    const verTodas =
        document.querySelector(".card-header a");

    if (verTodas) {

        verTodas.addEventListener("click", (event) => {

            event.preventDefault();

            window.location.href =
                "tareas-empleado.html";

        });

    }


    /* =====================================================
       INTERACCIÓN CON LAS TAREAS
    ===================================================== */

    const tareas =
        document.querySelectorAll(".task-item");

    tareas.forEach((tarea) => {

        tarea.style.cursor = "pointer";

        tarea.addEventListener("click", () => {

            const nombreTarea =
                tarea.querySelector(".task-content strong");

            if (nombreTarea) {

                mostrarMensaje(
                    `Seleccionaste la tarea: ${nombreTarea.textContent}`
                );

            }

        });

    });


    /* =====================================================
       MENÚ LATERAL
    ===================================================== */

    const menuItems =
        document.querySelectorAll(".sidebar-menu .menu-item");

    menuItems.forEach((item) => {

        item.addEventListener("click", () => {

            menuItems.forEach((elemento) => {
                elemento.classList.remove("active");
            });

            item.classList.add("active");
        });

    });


    /* =====================================================
       MENSAJE TEMPORAL
    ===================================================== */

    function mostrarMensaje(mensaje) {

        const mensajeAnterior =
            document.querySelector(".dashboard-message");

        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }


        const elemento =
            document.createElement("div");

        elemento.className =
            "dashboard-message";

        elemento.textContent = mensaje;


        elemento.style.position = "fixed";
        elemento.style.bottom = "25px";
        elemento.style.right = "25px";
        elemento.style.padding = "12px 18px";
        elemento.style.background = "#ffffff";
        elemento.style.color = "#273142";
        elemento.style.border = "1px solid #e5e8ee";
        elemento.style.borderRadius = "8px";
        elemento.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.10)";
        elemento.style.fontSize = "12px";
        elemento.style.zIndex = "9999";


        document.body.appendChild(elemento);


        setTimeout(() => {

            elemento.style.opacity = "0";
            elemento.style.transition =
                "opacity 0.3s ease";

            setTimeout(() => {
                elemento.remove();
            }, 300);

        }, 2500);

    }


    /* =====================================================
       CERRAR SESIÓN
    ===================================================== */

    const cerrarSesion =
        document.querySelector(".logout");

    if (cerrarSesion) {

        cerrarSesion.addEventListener("click", (event) => {

            const confirmar =
                confirm("¿Deseas cerrar la sesión?");

            if (!confirmar) {
                event.preventDefault();
            }

        });

    }


    /* =====================================================
       MENSAJE DE CONSOLA
    ===================================================== */

    console.log(
        "SGSP | Dashboard del empleado cargado correctamente."
    );

});