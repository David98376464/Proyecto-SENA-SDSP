/* =========================================================
   MATERIALES EMPLEADO - SGSP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const buscador =
        document.getElementById("buscarMaterial");

    const filtroEstado =
        document.getElementById("filtroEstado");

    const filas =
        document.querySelectorAll("#materialsBody tr");

    const noResults =
        document.getElementById("noResults");


    /* =====================================================
       ACTUALIZAR RESUMEN
    ===================================================== */

    function actualizarResumen() {

        let disponibles = 0;
        let enUso = 0;
        let agotados = 0;


        filas.forEach((fila) => {

            const estado =
                fila.dataset.status;


            if (estado === "Disponible") {
                disponibles++;
            }

            if (estado === "En uso") {
                enUso++;
            }

            if (estado === "Agotado") {
                agotados++;
            }

        });


        document.getElementById(
            "totalMateriales"
        ).textContent = filas.length;


        document.getElementById(
            "materialesDisponibles"
        ).textContent = disponibles;


        document.getElementById(
            "materialesUso"
        ).textContent = enUso;


        document.getElementById(
            "materialesAgotados"
        ).textContent = agotados;

    }


    actualizarResumen();


    /* =====================================================
       FILTRAR
    ===================================================== */

    function filtrarMateriales() {

        const texto =
            buscador.value
                .toLowerCase()
                .trim();


        const estadoSeleccionado =
            filtroEstado.value;


        let encontrados = 0;


        filas.forEach((fila) => {

            const material =
                fila.querySelector(
                    ".material-name strong"
                ).textContent.toLowerCase();


            const proyecto =
                fila.children[1]
                    .textContent
                    .toLowerCase();


            const estado =
                fila.dataset.status;


            const coincideTexto =
                material.includes(texto) ||
                proyecto.includes(texto);


            const coincideEstado =
                estadoSeleccionado === "todos" ||
                estado === estadoSeleccionado;


            if (
                coincideTexto &&
                coincideEstado
            ) {

                fila.style.display = "";

                encontrados++;

            } else {

                fila.style.display = "none";

            }

        });


        if (encontrados === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }


    buscador.addEventListener(
        "input",
        filtrarMateriales
    );


    filtroEstado.addEventListener(
        "change",
        filtrarMateriales
    );


    /* =====================================================
       REGISTRAR USO
    ===================================================== */

    const botones =
        document.querySelectorAll(".btn-material");


    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            const fila =
                boton.closest("tr");


            const nombre =
                boton.dataset.material;


            const cantidadCelda =
                fila.children[2];


            let cantidad =
                parseInt(
                    cantidadCelda.textContent
                );


            if (cantidad <= 0) {

                mostrarMensaje(
                    `${nombre} está agotado.`
                );

                return;

            }


            /* Reducir cantidad */

            cantidad--;

            cantidadCelda.textContent =
                cantidad;


            /* Actualizar estado */

            const etiqueta =
                fila.querySelector(
                    ".material-status"
                );


            etiqueta.classList.remove(
                "available",
                "used",
                "finished"
            );


            if (cantidad === 0) {

                fila.dataset.status =
                    "Agotado";

                etiqueta.textContent =
                    "Agotado";

                etiqueta.classList.add(
                    "finished"
                );

            } else {

                fila.dataset.status =
                    "En uso";

                etiqueta.textContent =
                    "En uso";

                etiqueta.classList.add(
                    "used"
                );

            }


            actualizarResumen();

            filtrarMateriales();


            mostrarMensaje(
                `Uso registrado: ${nombre}`
            );

        });

    });


    /* =====================================================
       NOTIFICACIÓN
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


        Object.assign(
            mensaje.style,
            {
                position: "fixed",
                right: "25px",
                bottom: "25px",
                padding: "12px 18px",
                background: "#ffffff",
                border: "1px solid #e5e8ee",
                borderRadius: "8px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.10)",
                color: "#273142",
                fontSize: "12px",
                zIndex: "9999"
            }
        );


        document.body.appendChild(
            mensaje
        );


        setTimeout(() => {

            mensaje.style.opacity = "0";

            mensaje.style.transition =
                "opacity 0.3s ease";


            setTimeout(() => {
                mensaje.remove();
            }, 300);

        }, 2500);

    }


    console.log(
        "SGSP | Materiales del empleado cargado correctamente."
    );

});