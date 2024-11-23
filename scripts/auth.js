function redirectTo(location) {
    window.location.href = `${location}.php`;
}

let authXHTTP;

function register() {
    const birthdate = new Date(document.getElementById("birthdate").value);
    const cpf = document.getElementById("cpf").value;
    const phone = document.getElementById("phone").value;

    if (validateRegisterForm(birthdate, cpf, phone)) {
        authXHTTP = new XMLHttpRequest();
        if (!authXHTTP) {
            console.log("Erro ao criar objeto xhttp");
            return;
        }
        const registerData = new FormData(
            document.getElementById("registerForm")
        );
        authXHTTP.onreadystatechange = authServer;
        authXHTTP.open("POST", "../backend/registerUser.php");
        authXHTTP.send(registerData);
    }

    return false;
}

function validateRegisterForm(birthdate, cpf, phone) {
    let errorMessage = "";
    const cpfRegex = new RegExp(
        "^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$|^\\d{11}$"
    );
    const phoneRegex = new RegExp("[0-9]{11}");

    const today = new Date();
    if (birthdate > today) {
        errorMessage = "Data de nascimento inválida";
    } else if (!cpfRegex.test(cpf)) {
        errorMessage = "CPF inválido";
    } else if (!phoneRegex.test(phone)) {
        errorMessage = "Telefone inválido";
    }

    if (errorMessage) {
        generateAuthError(errorMessage);
        return false;
    }

    return true;
}

function login(e) {
    e.preventDefault();
    authXHTTP = new XMLHttpRequest();
    if (!authXHTTP) {
        console.log("Erro ao criar objeto xhttp");
        return;
    }
    const loginData = new FormData(document.getElementById("loginForm"));
    authXHTTP.onreadystatechange = authServer;
    authXHTTP.open("POST", "../backend/loginUser.php");
    authXHTTP.send(loginData);
    return false;
}

function signOut() {
    authXHTTP = new XMLHttpRequest();
    if (!authXHTTP) {
        console.log("Erro ao criar objeto xhttp");
        return;
    }
    authXHTTP.open("POST", "../backend/logout.php");
    authXHTTP.send();
    location.reload();
}

function generateAuthError(message) {
    const existingError = document.getElementById("errorMessage");

    if (existingError) {
        existingError.remove();
    }

    const errorElement = document.createElement("div");
    errorElement.id = "errorMessage";
    errorElement.style.color = "red";
    errorElement.style.textAlign = "center";
    errorElement.textContent = message;

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (registerForm) {
        registerForm.appendChild(errorElement);
    } else if (loginForm) {
        loginForm.appendChild(errorElement);
    }
}

function authServer() {
    try {
        if (authXHTTP.readyState == XMLHttpRequest.DONE) {
            if (authXHTTP.status == 200) {
                redirectTo("home");
            } else if (authXHTTP.status == 401 || authXHTTP.status == 409) {
                generateAuthError(authXHTTP.responseText);
            } else {
                console.log(authXHTTP.responseText);
            }
        }
    } catch (e) {
        console.log(e);
    }
}
