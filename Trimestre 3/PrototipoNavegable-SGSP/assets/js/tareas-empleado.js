/* =========================================================
   TAREAS EMPLEADO - SGSP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const buscador =
        document.getElementById("buscarTarea");

    const filtroEstado =
        document.getElementById("filtroEstado");

    const filas =
        document.querySelectorAll("#tasksBody tr");

    const noResults =
        document.getElementById("noResults");


    /* =====================================================
       ACTUALIZAR RESUMEN
    ===================================================== */

    function actualizarResumen() {

        let pendientes = 0;
        let progreso = 0;
        let completadas = 0;


        filas.forEach((fila) => {

            const estado =
                fila.dataset.status;


            if (estado === "Pendiente") {
                pendientes++;
            }

            if (estado === "En progreso") {
                progreso++;
            }

            if (estado === "Completada") {
                completadas++;
            }

        });


        document.getElementById(
            "totalTareas"
        ).textContent = filas.length;


        document.getElementById(
            "tareasPendientes"
        ).textContent = pendientes;


        document.getElementById(
            "tareasProgreso"
        ).textContent = progreso;


        document.getElementById(
            "tareasCompletadas"
        ).textContent = completadas;

    }


    actualizarResumen();


    /* =====================================================
       FILTRAR TAREAS
    ===================================================== */

    function filtrarTareas() {

        const texto =
            buscador.value
                .toLowerCase()
                .trim();


        const estadoSeleccionado =
            filtroEstado.value;


        let encontradas = 0;


        filas.forEach((fila) => {

            const nombre =
                fila.querySelector(
                    ".task-name strong"
                ).textContent.toLowerCase();


            const proyecto =
                fila.querySelector(
                    ".project-name"
                ).textContent.toLowerCase();


            const estado =
                fila.dataset.status;


            const coincideTexto =
                nombre.includes(texto) ||
                proyecto.includes(texto);


            const coincideEstado =
                estadoSeleccionado === "todos" ||
                estado === estadoSeleccionado;


            if (
                coincideTexto &&
                coincideEstado
            ) {

                fila.style.display = "";

                encontradas++;

            } else {

                fila.style.display = "none";

            }

        });


        if (encontradas === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }


    /* =====================================================
       EVENTOS FILTROS
    ===================================================== */

    buscador.addEventListener(
        "input",
        filtrarTareas
    );


    filtroEstado.addEventListener(
        "change",
        filtrarTareas
    );


    /* =====================================================
       ACTUALIZAR ESTADO DE TAREA
    ===================================================== */

    const botones =
        document.querySelectorAll(".btn-status");


    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            const fila =
                boton.closest("tr");


            const estadoActual =
                fila.dataset.status;


            let nuevoEstado;


            if (estadoActual === "Pendiente") {

                nuevoEstado = "En progreso";

            } else if (
                estadoActual === "En progreso"
            ) {

                nuevoEstado = "Completada";

            } else {

                nuevoEstado = "Pendiente";

            }


            /* Actualizar atributo */

            fila.dataset.status =
                nuevoEstado;


            /* Elemento visual */

            const etiqueta =
                fila.querySelector(".task-status");


            etiqueta.textContent =
                nuevoEstado;


            /* Cambiar clases */

            etiqueta.classList.remove(
                "pending",
                "progress",
                "completed"
            );


            if (nuevoEstado === "Pendiente") {

                etiqueta.classList.add(
                    "pending"
                );

            }

            if (nuevoEstado === "En progreso") {

                etiqueta.classList.add(
                    "progress"
                );

            }

            if (nuevoEstado === "Completada") {

                etiqueta.classList.add(
                    "completed"
                );

            }


            /* Actualizar resumen */

            actualizarResumen();


            /* Mensaje */

            const nombre =
                boton.dataset.task;


            mostrarMensaje(
                `${nombre}: ${nuevoEstado}`
            );


            /* Aplicar filtros actuales */

            filtrarTareas();

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

        notificacion.addEventListener(
            "click",
            () => {

                if (punto) {
                    punto.style.display = "none";
                }


                mostrarMensaje(
                    "No tienes nuevas notificaciones."
                );

            }
        );

    }


    /* =====================================================
       CERRAR SESIÓN
    ===================================================== */

    const logout =
        document.querySelector(".logout");


    if (logout) {

        logout.addEventListener(
            "click",
            (event) => {

                const confirmar =
                    confirm(
                        "¿Deseas cerrar la sesión?"
                    );


                if (!confirmar) {
                    event.preventDefault();
                }

            }
        );

    }


    /* =====================================================
       MENSAJE
    ===================================================== */

    function mostrarMensaje(texto) {

        const anterior =
            document.querySelector(
                ".dashboard-message"
            );


        if (anterior) {
            anterior.remove();
        }


        const mensaje =
            document.createElement("div");


        mensaje.className =
            "dashboard-message";


        mensaje.textContent =
            texto;


        mensaje.style.position =
            "fixed";

        mensaje.style.right =
            "25px";

        mensaje.style.bottom =
            "25px";

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


        document.body.appendChild(
            mensaje
        );


        setTimeout(() => {

            mensaje.style.opacity =
                "0";

            mensaje.style.transition =
                "opacity 0.3s ease";


            setTimeout(() => {

                mensaje.remove();

            }, 300);

        }, 2500);

    }


    /* =====================================================
       MENÚ
    ===================================================== */

    const menuItems =
        document.querySelectorAll(
            ".sidebar-menu .menu-item"
        );


    menuItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                menuItems.forEach(
                    (elemento) => {

                        elemento.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       CONSOLA
    ===================================================== */

    console.log(
        "SGSP | Mis tareas - Empleado cargado correctamente."
    );

});