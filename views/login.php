<!DOCTYPE html>
<html lang="en">

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
    <section class="login" id="login">
        <h2>Login</h2>
        <form action="../backend/login.php" method="post">
            <div class="options">
                <label> Username </label>
                <br>
                <input type="text" name="user" id="user" required>
            </div>
            <div class="options">
                <label> Senha </label>
                <br>
                <input type="password" name="password" id="password" required>
            </div>
            <input type="submit" class="enterButton" value="Login">
        </form>
        <p class="registerText">
            Não possui Cadastro? Clique <a href="register.php">aqui</a> para se
            cadastrar
        </p>
    </section>
    <footer>
        <img src="https://media-public.canva.com/GOViI/MAFqiyGOViI/1/tl.png" alt="explosao">
    </footer>
</body>

</html>