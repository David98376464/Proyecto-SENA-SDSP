
// ==================================================
// SELECCIÓN DEL TIPO DE USUARIO
// ==================================================


const roleButtons = document.querySelectorAll(".role-btn");

let selectedRole = null;

roleButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Quitar selección de todos los botones
        roleButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activar el botón seleccionado
        button.classList.add("active");

        // Guardar el tipo de usuario
        selectedRole = button.textContent.trim();

        // Quitar mensaje de error del rol
        const roleError = document.getElementById("roleError");

        if (roleError) {
            roleError.textContent = "";
            roleError.classList.remove("show");
        }

        // Quitar estado de error de los botones
        roleButtons.forEach(btn => {
            btn.classList.remove("input-error");
        });

        console.log("Tipo de usuario:", selectedRole);

    });

});


// ==================================================
// MOSTRAR / OCULTAR CONTRASEÑA
// ==================================================

const passwordInput = document.getElementById("password");
const showPasswordButton = document.querySelector(".show-password");

showPasswordButton.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        showPasswordButton.textContent = "🙈";

    } else {

        passwordInput.type = "password";
        showPasswordButton.textContent = "👁";

    }

});


// ==================================================
// ELEMENTOS DEL FORMULARIO
// ==================================================

const loginForm = document.getElementById("loginForm");
const correoInput = document.getElementById("correo");


// ==================================================
// FUNCIÓN PARA MOSTRAR ERROR
// ==================================================

function mostrarError(input, mensaje, errorId) {

    input.classList.add("input-error");

    const errorElement = document.getElementById(errorId);

    if (errorElement) {

        errorElement.textContent = "⚠ " + mensaje;
        errorElement.classList.add("show");

    }

}


// ==================================================
// FUNCIÓN PARA QUITAR ERROR
// ==================================================

function quitarError(input, errorId) {

    input.classList.remove("input-error");

    const errorElement = document.getElementById(errorId);

    if (errorElement) {

        errorElement.textContent = "";
        errorElement.classList.remove("show");

    }

}


// ==================================================
// VALIDAR CORREO
// ==================================================

correoInput.addEventListener("input", () => {

    const correo = correoInput.value.trim();

    if (correo) {

        quitarError(correoInput, "correoError");

    }

});


// ==================================================
// VALIDAR CONTRASEÑA MIENTRAS SE ESCRIBE
// ==================================================

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value.trim();

    if (password) {

        quitarError(passwordInput, "passwordError");

    }

});


// ==================================================
// FORMULARIO DE LOGIN
// ==================================================

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const correo = correoInput.value.trim();
    const password = passwordInput.value.trim();

    let formularioValido = true;


    // ==================================================
    // VALIDAR TIPO DE USUARIO
    // ==================================================

    if (!selectedRole) {

        const roleError = document.getElementById("roleError");

        if (roleError) {

            roleError.textContent = "⚠ Por favor, selecciona un tipo de usuario.";
            roleError.classList.add("show");

        }

        roleButtons.forEach(btn => {
            btn.classList.add("input-error");
        });

        formularioValido = false;

    }


    // ==================================================
    // VALIDAR CORREO
    // ==================================================

    if (!correo) {

        mostrarError(
            correoInput,
            "Por favor, ingresa tu correo electrónico.",
            "correoError"
        );

        formularioValido = false;

    }


    // ==================================================
    // VALIDAR CONTRASEÑA
    // ==================================================

    if (!password) {

        mostrarError(
            passwordInput,
            "Por favor, ingresa tu contraseña.",
            "passwordError"
        );

        formularioValido = false;

    }


    // ==================================================
    // DETENER LOGIN SI HAY ERRORES
    // ==================================================

    if (!formularioValido) {

        return;

    }


    // ==================================================
    // INICIO DE SESIÓN
    // ==================================================

    console.log("Inicio de sesión");
    console.log("Usuario:", selectedRole);
    console.log("Correo:", correo);


    // ==================================================
    // REDIRECCIÓN SEGÚN EL TIPO DE USUARIO
    // ==================================================

    if (selectedRole === "Administrador") {

        window.location.href = "dashboard-admin.html";

    } else if (selectedRole === "Supervisor") {

        alert("El Dashboard del Supervisor estará disponible próximamente.");

    } else if (selectedRole === "Empleado") {

        alert("El Dashboard del Empleado estará disponible próximamente.");

    }

    });