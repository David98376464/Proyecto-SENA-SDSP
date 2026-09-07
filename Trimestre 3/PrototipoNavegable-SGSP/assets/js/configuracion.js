/* =====================================================
   CONFIGURACIÓN - SGSP
   ===================================================== */


/* =====================================================
   FORMULARIO DE PERFIL
   ===================================================== */

const profileForm = document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        // Validar nombre
        if (fullName === "") {

            alert("Por favor, ingresa tu nombre completo.");

            return;
        }

        // Validar correo
        if (email === "") {

            alert("Por favor, ingresa tu correo electrónico.");

            return;
        }

        // Guardar los datos del perfil
        localStorage.setItem("sgsp_fullName", fullName);
        localStorage.setItem("sgsp_email", email);
        localStorage.setItem("sgsp_phone", phone);

        alert("Los cambios se guardaron correctamente.");

    });

}


/* =====================================================
   CARGAR DATOS GUARDADOS
   ===================================================== */

const savedName = localStorage.getItem("sgsp_fullName");
const savedEmail = localStorage.getItem("sgsp_email");
const savedPhone = localStorage.getItem("sgsp_phone");

if (savedName) {

    const fullNameInput = document.getElementById("fullName");

    if (fullNameInput) {
        fullNameInput.value = savedName;
    }

}

if (savedEmail) {

    const emailInput = document.getElementById("email");

    if (emailInput) {
        emailInput.value = savedEmail;
    }

}

if (savedPhone) {

    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.value = savedPhone;
    }

}

/* =====================================================
   FORMULARIO DE CONTRASEÑA
===================================================== */

const passwordForm = document.getElementById("passwordForm");


if (passwordForm) {

    passwordForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const currentPassword =
            document.getElementById("currentPassword").value.trim();

        const newPassword =
            document.getElementById("newPassword").value.trim();

        const confirmPassword =
            document.getElementById("confirmPassword").value.trim();


        /* ---------------------------------------------
           REFERENCIAS A LOS ERRORES
        --------------------------------------------- */

        const currentPasswordError =
            document.getElementById("currentPasswordError");

        const newPasswordError =
            document.getElementById("newPasswordError");

        const confirmPasswordError =
            document.getElementById("confirmPasswordError");


        /* ---------------------------------------------
           LIMPIAR ERRORES ANTERIORES
        --------------------------------------------- */

        clearPasswordErrors();


        let valid = true;


        /* ---------------------------------------------
           CONTRASEÑA ACTUAL
        --------------------------------------------- */

        if (currentPassword === "") {

            currentPasswordError.textContent =
                "⚠ Por favor, ingresa tu contraseña actual.";

            currentPasswordError.classList.add("show");

            currentPasswordError
                .parentElement
                .classList.add("input-error");

            valid = false;
        }


        /* ---------------------------------------------
           NUEVA CONTRASEÑA
        --------------------------------------------- */

        if (newPassword === "") {

            newPasswordError.textContent =
                "⚠ Por favor, ingresa una nueva contraseña.";

            newPasswordError.classList.add("show");

            newPasswordError
                .parentElement
                .classList.add("input-error");

            valid = false;

        } else if (newPassword.length < 6) {

            newPasswordError.textContent =
                "⚠ La nueva contraseña debe tener mínimo 6 caracteres.";

            newPasswordError.classList.add("show");

            newPasswordError
                .parentElement
                .classList.add("input-error");

            valid = false;
        }


        /* ---------------------------------------------
           CONFIRMAR CONTRASEÑA
        --------------------------------------------- */

        if (confirmPassword === "") {

            confirmPasswordError.textContent =
                "⚠ Por favor, confirma tu contraseña.";

            confirmPasswordError.classList.add("show");

            confirmPasswordError
                .parentElement
                .classList.add("input-error");

            valid = false;

        } else if (newPassword !== confirmPassword) {

            confirmPasswordError.textContent =
                "⚠ Las contraseñas no coinciden.";

            confirmPasswordError.classList.add("show");

            confirmPasswordError
                .parentElement
                .classList.add("input-error");

            valid = false;
        }


        /* ---------------------------------------------
           SI HAY ERRORES
        --------------------------------------------- */

        if (!valid) {
            return;
        }


        /* ---------------------------------------------
           GUARDAR CONTRASEÑA
        --------------------------------------------- */

        localStorage.setItem(
            "sgsp_password",
            newPassword
        );


        /* ---------------------------------------------
           MENSAJE DE ÉXITO
        --------------------------------------------- */

        alert(
            "La contraseña se cambió correctamente."
        );


        /* Limpiar formulario */

        passwordForm.reset();


        /* Limpiar errores */

        clearPasswordErrors();

    });

}


/* =====================================================
   LIMPIAR ERRORES DE CONTRASEÑA
===================================================== */

function clearPasswordErrors() {

    const errors = document.querySelectorAll(
        ".form-error"
    );

    const groups = document.querySelectorAll(
        ".form-group.input-error"
    );


    errors.forEach(function (error) {

        error.textContent = "";

        error.classList.remove("show");

    });


    groups.forEach(function (group) {

        group.classList.remove("input-error");

    });

}


/* =====================================================
   MOSTRAR / OCULTAR CONTRASEÑA
===================================================== */

const passwordToggles =
    document.querySelectorAll(".password-toggle");


passwordToggles.forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId =
            button.getAttribute("data-target");

        const passwordInput =
            document.getElementById(targetId);


        if (!passwordInput) {
            return;
        }


        /* Cambiar tipo del input */

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            button.textContent = "🙈";

            button.setAttribute(
                "aria-label",
                "Ocultar contraseña"
            );

        } else {

            passwordInput.type = "password";

            button.textContent = "👁";

            button.setAttribute(
                "aria-label",
                "Mostrar contraseña"
            );

        }

    });

});

/* =====================================================
   PREFERENCIAS - NOTIFICACIONES
   ===================================================== */

const notifications =
    document.getElementById("notifications");

if (notifications) {

    // Recuperar configuración

    const savedNotifications =
        localStorage.getItem("sgsp_notifications");


    if (savedNotifications !== null) {

        notifications.checked =
            savedNotifications === "true";

    }


    // Detectar cambios

    notifications.addEventListener("change", function () {

        localStorage.setItem(
            "sgsp_notifications",
            notifications.checked
        );

    });

}


/* =====================================================
   PREFERENCIAS - RECORDATORIOS
   ===================================================== */

const reminders =
    document.getElementById("reminders");

if (reminders) {

    // Recuperar configuración

    const savedReminders =
        localStorage.getItem("sgsp_reminders");


    if (savedReminders !== null) {

        reminders.checked =
            savedReminders === "true";

    }


    // Detectar cambios

    reminders.addEventListener("change", function () {

        localStorage.setItem(
            "sgsp_reminders",
            reminders.checked
        );

    });

}


/* =====================================================
   CERRAR SESIÓN
   ===================================================== */

const logoutButton =
    document.querySelector(".logout-btn");

if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmLogout =
            confirm("¿Estás seguro de que deseas cerrar sesión?");

        if (confirmLogout) {

            window.location.href = "index.html";

        }

    });

}