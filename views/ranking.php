<?php
session_start();
if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] === false || !isset($_SESSION["username"])) {
    header("Location: login.php");
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../stylesheets/ranking.css">
    <script src="../scripts/ranking.js"></script>
    <title>Ranking Global</title>
</head>

<body>
    <header>
        <h1>Minefield</h1>
        <img src="https://cdn-icons-png.flaticon.com/512/486/486968.png" alt="bomba">
    </header>
    <section class="ranking">
        <h2>Ranking Global</h2>
        <table class="tableRanking">
            <tr>
                <th> Username </th>
                <th> Dimensões </th>
                <th> Bombas </th>
                <th> Modalidade </th>
                <th> Tempo </th>
                <th> Resultado </th>
                <th> Data</th>
                <th> Hora </th>
            </tr>
        </table>
        <div class="buttons">
            <button onclick="redirectTo('home')">Voltar</button>
        </div>
    </section>
</body>

</html>