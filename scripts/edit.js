function redirectTo(location) {
    window.location.href = `${location}.html`;
}

document.addEventListener('DOMContentLoaded', function() {
    setUserInfosByUsername();
});

function setUserInfosByUsername() {
    const storedUser = localStorage.getItem('user');

    // get no banco

    document.getElementById('name').value = "Oi";
    document.getElementById('phone').value = "19999000206";
    document.getElementById('email').value = "teste@gmail.com";
    document.getElementById('password').value = "*****";
}

function edit() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // put no banco

    redirectTo("home");

    return false;

}