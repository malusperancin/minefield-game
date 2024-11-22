function redirectTo(location) {
    window.location.href = `${location}.php`;
}

let xhttp;

function register() {
    const birthdate = new Date(document.getElementById("birthdate").value);
    const cpf = document.getElementById("cpf").value;
    const phone = document.getElementById("phone").value;

    if (validateRegisterForm(birthdate, cpf, phone)) {
        xhttp = new XMLHttpRequest();
        if (!xhttp) {
            console.log("Erro ao criar objeto xhttp");
            return;
        }
        const registerData = new FormData(
            document.getElementById("registerForm")
        );
        xhttp.onreadystatechange = authServer;
        xhttp.open("POST", "../backend/registerUser.php");
        xhttp.send(registerData);
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
    xhttp = new XMLHttpRequest();
    if (!xhttp) {
        console.log("Erro ao criar objeto xhttp");
        return;
    }
    const loginData = new FormData(document.getElementById("loginForm"));
    xhttp.onreadystatechange = authServer;
    xhttp.open("POST", "../backend/loginUser.php");
    xhttp.send(loginData);
    return false;
}

function signOut() {
    xhttp = new XMLHttpRequest();
    if (!xhttp) {
        console.log("Erro ao criar objeto xhttp");
        return;
    }
    xhttp.open("POST", "../backend/logout.php");
    xhttp.send();
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
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                redirectTo("home");
            } else if (xhttp.status == 401 || xhttp.status == 409) {
                generateAuthError(xhttp.responseText);
            } else {
                console.log(xhttp.responseText);
            }
        }
    } catch (e) {
        console.log(e);
    }
}
