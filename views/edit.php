<?php
session_start();
if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] === false || !isset($_SESSION["username"])) {
    header("Location: login.php");
} else {
    try {
        require "../backend/connectToDatabase.php";

        $username = $_SESSION["username"];

        $stmt = $conn->query("SELECT nome, tel, email, pwd FROM usuario WHERE username = '$username'");

        $playerData = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        echo "<script>console.log(" . $e->getMessage() . ")</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar sua Conta</title>
    <link rel="stylesheet" href="../stylesheets/auth.css">
    <script src="../scripts/edit.js"></script>

</head>

<body>
    <header>
        <h1>Minefield</h1>
        <img
            src="https://cdn-icons-png.flaticon.com/512/486/486968.png"
            alt="bomba">
    </header>
    <section class="edit" id="edit">
        <h2>Editar sua Conta</h2>
        <form onsubmit="return edit()" id="editForm">
            <div class="options">
                <label> Nome completo </label>
                <br>
                <input type="text" name="name" id="name" <?php echo "value = '" . $playerData["nome"] . "'" ?>>
            </div>
            <div class="options">
                <label> Telefone </label>
                <br>
                <input type="tel" name="phone" id="phone" <?php echo "value = '" . $playerData["tel"] . "'" ?>>
            </div>
            <div class="options">
                <label> Email </label>
                <br>
                <input type="email" name="email" id="email" <?php echo "value = '" . $playerData["email"] . "'" ?>>
            </div>
            <div class="options">
                <label> Senha </label>
                <br>
                <input type="password" name="password" id="password" <?php echo "value = '" . $playerData["pwd"] . "'" ?>>
            </div>
            <input type="submit" value="Salvar">
        </form>
    </section>
    <footer>
        <img
            src="https://media-public.canva.com/GOViI/MAFqiyGOViI/1/tl.png"
            alt="explosao">
    </footer>
</body>

</html>