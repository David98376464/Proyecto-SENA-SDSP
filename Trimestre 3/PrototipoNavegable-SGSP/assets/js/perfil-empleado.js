/* =========================================================
   PERFIL EMPLEADO - SGSP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const editarPerfil =
        document.getElementById("editarPerfil");

    const cancelarEdicion =
        document.getElementById("cancelarEdicion");

    const perfilForm =
        document.getElementById("perfilForm");

    const formActions =
        document.getElementById("formActions");

    const inputs =
        perfilForm.querySelectorAll("input");

    const passwordModal =
        document.getElementById("passwordModal");

    const cambiarPassword =
        document.getElementById("cambiarPassword");

    const cerrarModal =
        document.getElementById("cerrarModal");

    const cancelarPassword =
        document.getElementById("cancelarPassword");

    const passwordForm =
        document.getElementById("passwordForm");

    const notificaciones =
        document.getElementById("notificaciones");


    /* =====================================================
       EDITAR PERFIL
    ===================================================== */

    editarPerfil.addEventListener("click", () => {

        inputs.forEach((input) => {

            /*
             * No permitimos modificar
             * documento, cargo y rol.
             */

            if (
                input.id !== "documento" &&
                input.id !== "cargo"
            ) {

                input.disabled = false;

            }

        });


        formActions.style.display =
            "flex";


        editarPerfil.style.display =
            "none";

    });


    /* =====================================================
       CANCELAR EDICIÓN
    ===================================================== */

    cancelarEdicion.addEventListener("click", () => {

        inputs.forEach((input) => {

            input.disabled = true;

        });


        formActions.style.display =
            "none";


        editarPerfil.style.display =
            "block";

    });


    /* =====================================================
       GUARDAR PERFIL
    ===================================================== */

    perfilForm.addEventListener("submit", (event) => {

        event.preventDefault();


        inputs.forEach((input) => {

            input.disabled = true;

        });


        formActions.style.display =
            "none";


        editarPerfil.style.display =
            "block";


        mostrarMensaje(
            "Información actualizada correctamente."
        );

    });


    /* =====================================================
       ABRIR MODAL CONTRASEÑA
    ===================================================== */

    cambiarPassword.addEventListener("click", () => {

        passwordModal.classList.add("show");

    });


    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    function cerrarPasswordModal() {

        passwordModal.classList.remove("show");

        passwordForm.reset();

    }


    cerrarModal.addEventListener(
        "click",
        cerrarPasswordModal
    );


    cancelarPassword.addEventListener(
        "click",
        cerrarPasswordModal
    );


    passwordModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === passwordModal
            ) {

                cerrarPasswordModal();

            }

        }
    );


    /* =====================================================
       ACTUALIZAR CONTRASEÑA
    ===================================================== */

    passwordForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const nueva =
                document.getElementById(
                    "passwordNueva"
                ).value;


            const confirmar =
                document.getElementById(
                    "passwordConfirmar"
                ).value;


            if (nueva.length < 6) {

                mostrarMensaje(
                    "La contraseña debe tener mínimo 6 caracteres."
                );

                return;

            }


            if (nueva !== confirmar) {

                mostrarMensaje(
                    "Las contraseñas no coinciden."
                );

                return;

            }


            cerrarPasswordModal();


            mostrarMensaje(
                "Contraseña actualizada correctamente."
            );

        }
    );


    /* =====================================================
       NOTIFICACIONES
    ===================================================== */

    notificaciones.addEventListener(
        "change",
        () => {

            if (notificaciones.checked) {

                mostrarMensaje(
                    "Las notificaciones están activadas."
                );

            } else {

                mostrarMensaje(
                    "Las notificaciones están desactivadas."
                );

            }

        }
    );


    /* =====================================================
       NOTIFICACIONES DEL HEADER
    ===================================================== */

    const notification =
        document.querySelector(".notification");

    const notificationDot =
        document.querySelector(
            ".notification-dot"
        );


    notification.addEventListener(
        "click",
        () => {

            notificationDot.style.display =
                "none";


            mostrarMensaje(
                "No tienes nuevas notificaciones."
            );

        }
    );


    /* =====================================================
       CERRAR SESIÓN
    ===================================================== */

    const logout =
        document.querySelector(".logout");


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


    /* =====================================================
       MENSAJE
    ===================================================== */

    function mostrarMensaje(texto) {

        const existente =
            document.querySelector(
                ".profile-message"
            );


        if (existente) {
            existente.remove();
        }


        const mensaje =
            document.createElement("div");


        mensaje.className =
            "profile-message";


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
                zIndex: "9999",
                transition: "opacity 0.3s ease"
            }
        );


        document.body.appendChild(
            mensaje
        );


        setTimeout(() => {

            mensaje.style.opacity =
                "0";


            setTimeout(() => {

                mensaje.remove();

            }, 300);

        }, 2500);

    }


    console.log(
        "SGSP | Perfil del empleado cargado correctamente."
    );

});