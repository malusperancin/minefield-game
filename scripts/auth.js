function redirectTo(location) {
    window.location.href = `${location}.php`;
}

let xhttp;

function register() {
    const name = document.getElementById("name").value;
    const birthdate = new Date(document.getElementById("birthdate").value);
    const cpf = document.getElementById("cpf").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

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

function authServer() {
    try {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                redirectTo("home");
            } else if (xhttp.status == 400) {
                generateAuthError(xhttp.responseText);
            } else {
                console.log(xhttp.responseText);
            }
        }
    } catch (e) {
        console.log(e);
    }
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
    document.getElementById("registerForm").appendChild(errorElement);
}

function login() {
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    return false;
}

function signOut() {
    localStorage.setItem("user", "");

    redirectTo("login");
}
