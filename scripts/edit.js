function redirectTo(location) {
    window.location.href = `${location}.php`;
}

let editXHTTP;

function edit() {
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (validateEditData(phone, email)) {
        editXHTTP = new XMLHttpRequest();
        if (!editXHTTP) {
            console.log("Erro ao criar objeto xhttp");
            return;
        }

        editXHTTP.onreadystatechange = authServer;
        editData = new FormData(document.getElementById("editForm"));
        editXHTTP.open("POST", "../backend/editUser.php");
        editXHTTP.send(editData);
    }

    return false;
}

function authServer() {
    try {
        if (editXHTTP.readyState == XMLHttpRequest.DONE) {
            if (editXHTTP.status == 200) {
                redirectTo("home");
            } else if (editXHTTP.status == 401) {
                generateAuthError(editXHTTP.responseText);
            } else {
                console.log(editXHTTP.responseText);
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
