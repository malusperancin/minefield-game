function redirectTo(location) {
    window.location.href = `${location}.php`;
}

let xhttp;

function edit() {
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (validateEditData(phone, email)) {
        xhttp = new XMLHttpRequest();
        if (!xhttp) {
            console.log("Erro ao criar objeto xhttp");
            return;
        }

        xhttp.onreadystatechange = authServer;
        editData = new FormData(document.getElementById("editForm"));
        xhttp.open("POST", "../backend/editUser.php");
        xhttp.send(editData);
    }

    return false;
}

function authServer() {
    try {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                redirectTo("home");
            } else if (xhttp.status == 401) {
                generateAuthError(xhttp.responseText);
            } else {
                console.log(xhttp.responseText);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function validateEditData(phone) {
    let regex = new RegExp("[0-9]{11}");
    if (regex.test(phone)) {
        return true;
    } else {
        generateEditError("Telefone inválido");
        return false;
    }
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
