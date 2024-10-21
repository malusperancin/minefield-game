function redirectTo(location) {
    window.location.href = `${location}.html`;
}

function register() {
    const name = document.getElementById("name").value;
    const birthday = new Date(document.getElementById("birthday").value);
    const cpf = document.getElementById("cpf").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    // COLOCA INFORMAÇÕES NO BD

    if (validateRegisterForm(birthday, cpf, phone, email, user)) {
        redirectTo("login");
    }

    return false;
}

function validateRegisterForm(birthday, cpf, phone, email, user) {
    let errorMessage = "";
    const cpfRegex = new RegExp(
        "^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$|^\\d{11}$"
    );
    const phoneRegex = new RegExp("[0-9]{11}");

    const today = new Date();
    if (birthday > today) {
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

    // -- ainda precisa verificar se email e user nao estão em uso

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

    // ---- verifica se esta certo no BD ----

    // se sim:
    localStorage.setItem("user", user); // nao sei se vamos vir a precisar de mais coisas do usuario nesse momento. a principio só o user serve

    redirectTo("home");
    return false;
}

function signOut() {
    localStorage.setItem("user", "");

    redirectTo("login");
}
