/* =========================================================
   AVANCES EMPLEADO - SGSP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const buscador =
        document.getElementById("buscarProyecto");

    const filtro =
        document.getElementById("filtroProyecto");

    const tarjetas =
        document.querySelectorAll(".progress-card");

    const noResults =
        document.getElementById("noResults");


    /* =====================================================
       FILTRAR PROYECTOS
    ===================================================== */

    function filtrarProyectos() {

        const texto =
            buscador.value
                .toLowerCase()
                .trim();

        const estado =
            filtro.value;

        let encontrados = 0;


        tarjetas.forEach((tarjeta) => {

            const nombre =
                tarjeta.dataset.project.toLowerCase();

            const estadoProyecto =
                tarjeta.dataset.status;


            const coincideNombre =
                nombre.includes(texto);


            const coincideEstado =
                estado === "todos" ||
                estadoProyecto === estado;


            if (
                coincideNombre &&
                coincideEstado
            ) {

                tarjeta.style.display = "";

                encontrados++;

            } else {

                tarjeta.style.display = "none";

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
        filtrarProyectos
    );


    filtro.addEventListener(
        "change",
        filtrarProyectos
    );


    /* =====================================================
       ACTUALIZAR AVANCE
    ===================================================== */

    const botones =
        document.querySelectorAll(".btn-update");


    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            const tarjeta =
                boton.closest(".progress-card");


            const proyecto =
                boton.dataset.project;


            const porcentaje =
                tarjeta.querySelector(".percentage");


            const barra =
                tarjeta.querySelector(".progress-fill");


            const avanceActual =
                parseInt(
                    porcentaje.textContent
                );


            let nuevoAvance =
                prompt(
                    `Ingresa el nuevo avance de ${proyecto} (0 - 100):`,
                    avanceActual
                );


            if (nuevoAvance === null) {
                return;
            }


            nuevoAvance =
                parseInt(nuevoAvance);


            if (
                isNaN(nuevoAvance) ||
                nuevoAvance < 0 ||
                nuevoAvance > 100
            ) {

                mostrarMensaje(
                    "Ingresa un porcentaje válido entre 0 y 100."
                );

                return;

            }


            /* =============================================
               ACTUALIZAR VISUAL
            ============================================= */

            porcentaje.textContent =
                `${nuevoAvance}%`;


            barra.style.width =
                `${nuevoAvance}%`;


            /* =============================================
               CAMBIAR ESTADO
            ============================================= */

            const estado =
                tarjeta.querySelector(
                    ".project-status"
                );


            if (nuevoAvance === 100) {

                estado.textContent =
                    "Finalizado";

                estado.classList.remove(
                    "execution",
                    "review"
                );

                estado.style.background =
                    "#edf9f3";

                estado.style.color =
                    "#29965d";

                tarjeta.dataset.status =
                    "Finalizado";

            } else if (nuevoAvance >= 70) {

                estado.textContent =
                    "En revisión";

                estado.classList.remove(
                    "execution"
                );

                estado.classList.add(
                    "review"
                );

                estado.style.background = "";

                estado.style.color = "";

                tarjeta.dataset.status =
                    "En revisión";

            } else {

                estado.textContent =
                    "En ejecución";

                estado.classList.remove(
                    "review"
                );

                estado.classList.add(
                    "execution"
                );

                estado.style.background = "";

                estado.style.color = "";

                tarjeta.dataset.status =
                    "En ejecución";

            }


            actualizarPromedio();


            agregarHistorial(
                proyecto,
                avanceActual,
                nuevoAvance
            );


            mostrarMensaje(
                `Avance de ${proyecto} actualizado correctamente.`
            );


            filtrarProyectos();

        });

    });


    /* =====================================================
       ACTUALIZAR PROMEDIO
    ===================================================== */

    function actualizarPromedio() {

        let total = 0;

        let cantidad = 0;


        tarjetas.forEach((tarjeta) => {

            const porcentaje =
                tarjeta.querySelector(
                    ".percentage"
                );


            const valor =
                parseInt(
                    porcentaje.textContent
                );


            total += valor;

            cantidad++;

        });


        const promedio =
            Math.round(
                total / cantidad
            );


        document.getElementById(
            "avancePromedio"
        ).textContent =
            `${promedio}%`;

    }


    /* =====================================================
       AGREGAR HISTORIAL
    ===================================================== */

    function agregarHistorial(
        proyecto,
        anterior,
        nuevo
    ) {

        const tbody =
            document.getElementById(
                "historyBody"
            );


        const fila =
            document.createElement("tr");


        const fecha =
            new Date();


        const opciones = {
            day: "2-digit",
            month: "short",
            year: "numeric"
        };


        const fechaTexto =
            fecha.toLocaleDateString(
                "es-ES",
                opciones
            );


        fila.innerHTML = `

            <td>
                ${proyecto}
            </td>

            <td>
                ${anterior}%
            </td>

            <td>
                <span class="new-progress">
                    ${nuevo}%
                </span>
            </td>

            <td>
                ${fechaTexto}
            </td>

        `;


        tbody.prepend(fila);

    }


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
       INICIALIZACIÓN
    ===================================================== */

    actualizarPromedio();


    console.log(
        "SGSP | Avances del empleado cargado correctamente."
    );

});