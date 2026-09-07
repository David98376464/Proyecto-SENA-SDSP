/* =========================================================
   SGSP - CONFIGURACIÓN DEL SUPERVISOR
   Validaciones + LocalStorage + Interactividad
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const nombre = document.getElementById("nombreSupervisor");
    const correo = document.getElementById("correoSupervisor");

    const passwordActual = document.getElementById("passwordActual");
    const passwordNueva = document.getElementById("passwordNueva");
    const passwordConfirmar = document.getElementById("passwordConfirmar");

    const idioma = document.getElementById("idioma");
    const vistaGantt = document.getElementById("vistaPredeterminada");

    const notifProyectos =
        document.getElementById("notificacionesProyectos");

    const alertasTareas =
        document.getElementById("alertasTareas");

    const notifIncidencias =
        document.getElementById("notificacionesIncidencias");

    const btnGuardar = document.getElementById("saveConfig");
    const btnCancelar = document.getElementById("cancelConfig");

    const mensajeGeneral = document.getElementById("configMessage");

    const STORAGE_KEY = "sgsp_configuracion_supervisor";


    /* =====================================================
       CONFIGURACIÓN POR DEFECTO
    ===================================================== */

    const configuracionDefault = {
        nombre: "Supervisor",
        correo: "supervisor@sgsp.com",

        notificacionesProyectos: true,
        alertasTareas: true,
        notificacionesIncidencias: true,

        idioma: "es",
        vistaPredeterminada: "week"
    };


    /* =====================================================
       CREAR MENSAJES DE VALIDACIÓN
    ===================================================== */

    function crearMensaje(input, id) {

        let mensaje = document.getElementById(id);

        if (!mensaje) {

            mensaje = document.createElement("small");

            mensaje.id = id;

            mensaje.style.display = "block";
            mensaje.style.marginTop = "5px";
            mensaje.style.fontSize = "11px";
            mensaje.style.fontWeight = "500";

            input.parentElement.appendChild(mensaje);
        }

        return mensaje;
    }


    const errorNombre =
        crearMensaje(nombre, "errorNombre");

    const errorCorreo =
        crearMensaje(correo, "errorCorreo");

    const errorPasswordActual =
        crearMensaje(passwordActual, "errorPasswordActual");

    const errorPasswordNueva =
        crearMensaje(passwordNueva, "errorPasswordNueva");

    const errorPasswordConfirmar =
        crearMensaje(passwordConfirmar, "errorPasswordConfirmar");


    /* =====================================================
       FUNCIONES DE VALIDACIÓN
    ===================================================== */

    function campoCorrecto(input, mensaje, texto = "") {

        input.style.borderColor = "#16A34A";

        mensaje.textContent = texto;
        mensaje.style.color = "#16A34A";
    }


    function campoError(input, mensaje, texto) {

        input.style.borderColor = "#DC2626";

        mensaje.textContent = texto;
        mensaje.style.color = "#DC2626";
    }


    function limpiarEstado(input, mensaje) {

        input.style.borderColor = "#dce3eb";
        mensaje.textContent = "";
    }


    /* =====================================================
       VALIDAR NOMBRE
    ===================================================== */

    function validarNombre() {

        const valor = nombre.value.trim();

        if (valor === "") {

            campoError(
                nombre,
                errorNombre,
                "El nombre completo es obligatorio."
            );

            return false;
        }

        if (valor.length < 3) {

            campoError(
                nombre,
                errorNombre,
                "El nombre debe tener mínimo 3 caracteres."
            );

            return false;
        }

        campoCorrecto(
            nombre,
            errorNombre,
            "✓ Nombre válido"
        );

        return true;
    }


    /* =====================================================
       VALIDAR CORREO
    ===================================================== */

    function validarCorreo() {

        const valor = correo.value.trim();

        if (valor === "") {

            campoError(
                correo,
                errorCorreo,
                "El correo electrónico es obligatorio."
            );

            return false;
        }

        const formatoCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoCorreo.test(valor)) {

            campoError(
                correo,
                errorCorreo,
                "Ingresa un correo electrónico válido."
            );

            return false;
        }

        campoCorrecto(
            correo,
            errorCorreo,
            "✓ Correo válido"
        );

        return true;
    }


    /* =====================================================
       VALIDAR CONTRASEÑA ACTUAL
    ===================================================== */

    function validarPasswordActual() {

        const valor = passwordActual.value;

        /*
           Este campo solamente es obligatorio
           cuando el usuario quiere cambiar la contraseña.
        */

        if (
            passwordNueva.value !== "" ||
            passwordConfirmar.value !== ""
        ) {

            if (valor === "") {

                campoError(
                    passwordActual,
                    errorPasswordActual,
                    "Ingresa tu contraseña actual."
                );

                return false;
            }

            campoCorrecto(
                passwordActual,
                errorPasswordActual,
                "✓ Contraseña actual ingresada"
            );

            return true;
        }

        limpiarEstado(
            passwordActual,
            errorPasswordActual
        );

        return true;
    }


    /* =====================================================
       VALIDAR NUEVA CONTRASEÑA
    ===================================================== */

    function validarPasswordNueva() {

        const valor = passwordNueva.value;

        /*
           Si todos los campos están vacíos,
           no se está cambiando la contraseña.
        */

        if (
            valor === "" &&
            passwordActual.value === "" &&
            passwordConfirmar.value === ""
        ) {

            limpiarEstado(
                passwordNueva,
                errorPasswordNueva
            );

            return true;
        }


        if (valor === "") {

            campoError(
                passwordNueva,
                errorPasswordNueva,
                "Ingresa una nueva contraseña."
            );

            return false;
        }


        if (valor.length < 6) {

            campoError(
                passwordNueva,
                errorPasswordNueva,
                "La contraseña debe tener mínimo 6 caracteres."
            );

            return false;
        }


        if (valor.length >= 6 && valor.length < 8) {

            campoCorrecto(
                passwordNueva,
                errorPasswordNueva,
                "✓ Contraseña válida"
            );

            return true;
        }


        campoCorrecto(
            passwordNueva,
            errorPasswordNueva,
            "✓ Contraseña segura"
        );

        return true;
    }


    /* =====================================================
       VALIDAR CONFIRMACIÓN
    ===================================================== */

    function validarPasswordConfirmar() {

        const valor = passwordConfirmar.value;

        /*
           Si no se está cambiando la contraseña,
           no mostramos error.
        */

        if (
            passwordActual.value === "" &&
            passwordNueva.value === "" &&
            valor === ""
        ) {

            limpiarEstado(
                passwordConfirmar,
                errorPasswordConfirmar
            );

            return true;
        }


        if (valor === "") {

            campoError(
                passwordConfirmar,
                errorPasswordConfirmar,
                "Confirma tu nueva contraseña."
            );

            return false;
        }


        if (valor !== passwordNueva.value) {

            campoError(
                passwordConfirmar,
                errorPasswordConfirmar,
                "✕ Las contraseñas no coinciden."
            );

            return false;
        }


        if (valor === passwordNueva.value) {

            campoCorrecto(
                passwordConfirmar,
                errorPasswordConfirmar,
                "✓ Las contraseñas coinciden."
            );

            return true;
        }

        return false;
    }


    /* =====================================================
       VALIDACIÓN EN TIEMPO REAL
    ===================================================== */

    nombre.addEventListener("input", validarNombre);

    correo.addEventListener("input", validarCorreo);

    passwordActual.addEventListener(
        "input",
        () => {
            validarPasswordActual();
            validarPasswordNueva();
            validarPasswordConfirmar();
        }
    );

    passwordNueva.addEventListener(
        "input",
        () => {
            validarPasswordActual();
            validarPasswordNueva();
            validarPasswordConfirmar();
        }
    );

    passwordConfirmar.addEventListener(
        "input",
        validarPasswordConfirmar
    );


    /* =====================================================
       MOSTRAR / OCULTAR CONTRASEÑAS
    ===================================================== */

    const botonesPassword =
        document.querySelectorAll(".config-password-button");

    botonesPassword.forEach((boton) => {

        boton.addEventListener("click", () => {

            const id =
                boton.getAttribute("data-target");

            const input =
                document.getElementById(id);

            const icono =
                boton.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                icono.classList.remove("fa-eye");
                icono.classList.add("fa-eye-slash");

                boton.setAttribute(
                    "title",
                    "Ocultar contraseña"
                );

            } else {

                input.type = "password";

                icono.classList.remove("fa-eye-slash");
                icono.classList.add("fa-eye");

                boton.setAttribute(
                    "title",
                    "Mostrar contraseña"
                );
            }
        });
    });


    /* =====================================================
       CARGAR CONFIGURACIÓN
    ===================================================== */

    function cargarConfiguracion() {

        const datos =
            localStorage.getItem(STORAGE_KEY);

        let config = {
            ...configuracionDefault
        };

        if (datos) {

            try {

                config = {
                    ...configuracionDefault,
                    ...JSON.parse(datos)
                };

            } catch (error) {

                console.error(
                    "Error al cargar configuración:",
                    error
                );
            }
        }


        nombre.value = config.nombre;
        correo.value = config.correo;

        notifProyectos.checked =
            config.notificacionesProyectos;

        alertasTareas.checked =
            config.alertasTareas;

        notifIncidencias.checked =
            config.notificacionesIncidencias;

        idioma.value =
            config.idioma;

        vistaGantt.value =
            config.vistaPredeterminada;


        /* Limpiar mensajes iniciales */

        limpiarEstado(nombre, errorNombre);
        limpiarEstado(correo, errorCorreo);
        limpiarEstado(passwordActual, errorPasswordActual);
        limpiarEstado(passwordNueva, errorPasswordNueva);
        limpiarEstado(passwordConfirmar, errorPasswordConfirmar);
    }


    /* =====================================================
       GUARDAR
    ===================================================== */

    btnGuardar.addEventListener("click", () => {

        const nombreValido = validarNombre();
        const correoValido = validarCorreo();
        const passwordActualValida =
            validarPasswordActual();

        const passwordNuevaValida =
            validarPasswordNueva();

        const passwordConfirmarValida =
            validarPasswordConfirmar();


        /* ================================================
           COMPROBAR ERRORES
        ================================================ */

        if (
            !nombreValido ||
            !correoValido ||
            !passwordActualValida ||
            !passwordNuevaValida ||
            !passwordConfirmarValida
        ) {

            mostrarMensajeGeneral(
                "Por favor corrige los campos marcados en rojo.",
                "error"
            );

            return;
        }


        /* ================================================
           GUARDAR DATOS
        ================================================ */

        const configuracion = {

            nombre: nombre.value.trim(),

            correo: correo.value.trim(),

            notificacionesProyectos:
                notifProyectos.checked,

            alertasTareas:
                alertasTareas.checked,

            notificacionesIncidencias:
                notifIncidencias.checked,

            idioma:
                idioma.value,

            vistaPredeterminada:
                vistaGantt.value
        };


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(configuracion)
        );


        /* Limpiar contraseñas */

        passwordActual.value = "";
        passwordNueva.value = "";
        passwordConfirmar.value = "";

        limpiarEstado(
            passwordActual,
            errorPasswordActual
        );

        limpiarEstado(
            passwordNueva,
            errorPasswordNueva
        );

        limpiarEstado(
            passwordConfirmar,
            errorPasswordConfirmar
        );


        mostrarMensajeGeneral(
            "✓ Los cambios se guardaron correctamente.",
            "success"
        );
    });


    /* =====================================================
       CANCELAR
    ===================================================== */

    btnCancelar.addEventListener("click", () => {

        cargarConfiguracion();

        passwordActual.value = "";
        passwordNueva.value = "";
        passwordConfirmar.value = "";

        mostrarMensajeGeneral(
            "Los cambios fueron cancelados.",
            "info"
        );
    });


    /* =====================================================
       MENSAJE GENERAL
    ===================================================== */

    function mostrarMensajeGeneral(texto, tipo) {

        mensajeGeneral.textContent = texto;

        mensajeGeneral.style.display = "block";

        if (tipo === "error") {

            mensajeGeneral.style.background = "#fff1f1";
            mensajeGeneral.style.borderColor = "#f5caca";
            mensajeGeneral.style.color = "#dc2626";

        } else if (tipo === "info") {

            mensajeGeneral.style.background = "#edf6fc";
            mensajeGeneral.style.borderColor = "#d4e8f7";
            mensajeGeneral.style.color = "#1671b9";

        } else {

            mensajeGeneral.style.background = "#eaf8ef";
            mensajeGeneral.style.borderColor = "#d2efdc";
            mensajeGeneral.style.color = "#15945b";
        }


        setTimeout(() => {

            mensajeGeneral.style.display = "none";

        }, 4000);
    }


    /* =====================================================
       INICIAR
    ===================================================== */

    cargarConfiguracion();


    console.log(
        "SGSP - Configuración del supervisor cargada correctamente."
    );

});