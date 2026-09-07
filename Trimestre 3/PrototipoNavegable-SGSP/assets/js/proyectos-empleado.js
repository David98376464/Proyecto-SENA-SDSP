/* =========================================================
   PROYECTOS EMPLEADO - SGSP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DATOS DE LOS PROYECTOS
    ===================================================== */

    const proyectos = [
        {
            nombre: "Proyecto Alfa",
            estado: "En progreso",
            porcentaje: 75,
            tareas: 4
        },

        {
            nombre: "Proyecto Beta",
            estado: "En progreso",
            porcentaje: 50,
            tareas: 3
        },

        {
            nombre: "Proyecto Gamma",
            estado: "Completado",
            porcentaje: 100,
            tareas: 2
        }
    ];


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const buscador =
        document.getElementById("buscarProyecto");

    const filtroEstado =
        document.getElementById("filtroEstado");

    const tarjetas =
        document.querySelectorAll(".project-card");

    const contenedor =
        document.getElementById("projectsContainer");

    const noResults =
        document.getElementById("noResults");


    /* =====================================================
       ACTUALIZAR RESUMEN
    ===================================================== */

    const totalProyectos =
        document.getElementById("totalProyectos");

    const proyectosProgreso =
        document.getElementById("proyectosProgreso");

    const proyectosCompletados =
        document.getElementById("proyectosCompletados");


    if (totalProyectos) {
        totalProyectos.textContent =
            proyectos.length;
    }


    if (proyectosProgreso) {

        proyectosProgreso.textContent =
            proyectos.filter(
                proyecto => proyecto.estado === "En progreso"
            ).length;

    }


    if (proyectosCompletados) {

        proyectosCompletados.textContent =
            proyectos.filter(
                proyecto => proyecto.estado === "Completado"
            ).length;

    }


    /* =====================================================
       FILTRAR PROYECTOS
    ===================================================== */

    function filtrarProyectos() {

        const texto =
            buscador.value.toLowerCase().trim();

        const estado =
            filtroEstado.value;

        let encontrados = 0;


        tarjetas.forEach((tarjeta) => {

            const nombre =
                tarjeta.querySelector("h3")
                .textContent
                .toLowerCase();


            const estadoTarjeta =
                tarjeta.querySelector(".status")
                .textContent
                .trim();


            const coincideNombre =
                nombre.includes(texto);


            const coincideEstado =
                estado === "todos" ||
                estadoTarjeta === estado;


            if (coincideNombre && coincideEstado) {

                tarjeta.style.display = "flex";

                encontrados++;

            } else {

                tarjeta.style.display = "none";

            }

        });


        if (encontrados === 0) {

            noResults.style.display = "block";

            contenedor.style.display = "none";

        } else {

            noResults.style.display = "none";

            contenedor.style.display = "grid";

        }

    }


    /* =====================================================
       EVENTOS DE BÚSQUEDA
    ===================================================== */

    buscador.addEventListener(
        "input",
        filtrarProyectos
    );


    filtroEstado.addEventListener(
        "change",
        filtrarProyectos
    );


    /* =====================================================
       BOTONES "VER PROYECTO"
    ===================================================== */

    const botones =
        document.querySelectorAll(".btn-view");


    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            const proyecto =
                boton.dataset.project;


            mostrarMensaje(
                `Has seleccionado ${proyecto}.`
            );

        });

    });


    /* =====================================================
       NOTIFICACIONES
    ===================================================== */

    const notificacion =
        document.querySelector(".notification");

    const punto =
        document.querySelector(".notification-dot");


    if (notificacion) {

        notificacion.addEventListener("click", () => {

            if (punto) {
                punto.style.display = "none";
            }

            mostrarMensaje(
                "No tienes nuevas notificaciones."
            );

        });

    }


    /* =====================================================
       CERRAR SESIÓN
    ===================================================== */

    const logout =
        document.querySelector(".logout");


    if (logout) {

        logout.addEventListener("click", (event) => {

            const confirmar =
                confirm("¿Deseas cerrar la sesión?");


            if (!confirmar) {
                event.preventDefault();
            }

        });

    }


    /* =====================================================
       MENSAJES
    ===================================================== */

    function mostrarMensaje(texto) {

        const anterior =
            document.querySelector(".dashboard-message");

        if (anterior) {
            anterior.remove();
        }


        const mensaje =
            document.createElement("div");

        mensaje.className =
            "dashboard-message";

        mensaje.textContent =
            texto;


        mensaje.style.position = "fixed";
        mensaje.style.right = "25px";
        mensaje.style.bottom = "25px";

        mensaje.style.padding =
            "12px 18px";

        mensaje.style.background =
            "#ffffff";

        mensaje.style.border =
            "1px solid #e5e8ee";

        mensaje.style.borderRadius =
            "8px";

        mensaje.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.10)";

        mensaje.style.color =
            "#273142";

        mensaje.style.fontSize =
            "12px";

        mensaje.style.zIndex =
            "9999";


        document.body.appendChild(mensaje);


        setTimeout(() => {

            mensaje.style.opacity = "0";

            mensaje.style.transition =
                "opacity 0.3s ease";


            setTimeout(() => {

                mensaje.remove();

            }, 300);

        }, 2500);

    }


    /* =====================================================
       MENÚ LATERAL
    ===================================================== */

    const menuItems =
        document.querySelectorAll(
            ".sidebar-menu .menu-item"
        );


    menuItems.forEach((item) => {

        item.addEventListener("click", () => {

            menuItems.forEach((elemento) => {

                elemento.classList.remove("active");

            });


            item.classList.add("active");

        });

    });


    /* =====================================================
       MENSAJE CONSOLA
    ===================================================== */

    console.log(
        "SGSP | Mis proyectos - Empleado cargado correctamente."
    );

});