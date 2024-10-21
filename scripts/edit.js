function redirectTo(location) {
    window.location.href = `${location}.html`;
}

document.addEventListener("DOMContentLoaded", function () {
    setUserInfosByUsername();
});

function setUserInfosByUsername() {
    const storedUser = localStorage.getItem("user");

    // get no banco

    document.getElementById("name").value = storedUser;
    document.getElementById("phone").value = "19999000206";
    document.getElementById("email").value = "teste@gmail.com";
    document.getElementById("password").value = "*****";
}

function edit() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // put no banco

    if (validateEditData(phone, email)) {
        redirectTo("home");
    }

    return false;
}

function validateEditData(phone, email) {
    let regex = new RegExp("[0-9]{11}");
    if (regex.test(phone)) {
        return true;
    } else {
        generateEditError("Telefone inválido");
        return false;
    }

    // -- verificação de email em uso
}

function generateEditError(message) {
    const existingError = document.getElementById("errorMessage");

    if (existingError) {
        existingError.remove();
    }

    const errorElement = document.createElement("div");
    errorElement.id = "errorMessage";
    errorElement.style.color = "red";
    errorElement.style.textAlign = "center";
    errorElement.textContent = message;
    document.getElementById("editForm").appendChild(errorElement);
}
