<?php
session_start();
if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] === true) {
    header("Location: home.php");
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../stylesheets/auth.css">
    <script src="../scripts/auth.js"></script>
    <title>Autenticação</title>
</head>

<body>
    <header>
        <h1>Minefield</h1>
        <img src="https://cdn-icons-png.flaticon.com/512/486/486968.png" alt="bomba">
    </header>
    <section class="register" id="register">
        <h2>Registro</h2>
        <form id="registerForm" onsubmit="return register()">
            <div class="options">
                <label> Nome completo </label>
                <br>
                <input type="text" name="name" id="name" required>
            </div>
            <div class="options">
                <label> Nascimento </label>
                <br>
                <input type="date" name="birthdate" id="birthdate" required>
            </div>
            <div class="options">
                <label> CPF </label>
                <br>
                <input type="text" name="cpf" id="cpf" required>
            </div>
            <div class="options">
                <label> Telefone </label>
                <br>
                <input type="tel" name="phone" id="phone" required>
            </div>
            <div class="options">
                <label> Email </label>
                <br>
                <input type="email" name="email" id="email" required>
            </div>
            <div class="options">
                <label> Username </label>
                <br>
                <input type="text" name="username" id="user" required>
            </div>
            <div class="options">
                <label> Senha </label>
                <br>
                <input type="password" name="password" id="password" required>
            </div>
            <input type="submit" value="Cadastrar">
        </form>
        <p class="loginText">
            Já possui Cadastro? Clique <a href="login.php">aqui</a> para entrar
        </p>
    </section>
    <footer>
        <img src="https://media-public.canva.com/GOViI/MAFqiyGOViI/1/tl.png" alt="explosao">
    </footer>
</body>

</html>