function redirectTo(location) {
    window.location.href = `${location}.html`;
}

function register() {
    const name = document.getElementById('name').value;
    const birthday = document.getElementById('birthday').value;
    const cpf = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    console.log(name, birthday, cpf, phone, email, user, password);

    redirectTo("login");
    return false;
}

function login() {
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    console.log(user, password);

    // ---- verifica se esta certo no BD ----

    // se sim:
    localStorage.setItem('user', user); // nao sei se vamos vir a precisar de mais coisas do usuario nesse momento. a principio só o user serve

    redirectTo("home");
    return false;
}

function signOut() {
    localStorage.setItem('user', "");

    redirectTo("login");
}