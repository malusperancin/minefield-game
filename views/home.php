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
    <link rel="stylesheet" type="text/css" href="../stylesheets/home.css">
    <script src="../scripts/game.js"></script>
    <script src="../scripts/auth.js"></script>
    <script src="../scripts/home.js"></script>
    <title>Minefield</title>
</head>

<body>
    <header>
        <h1>Minefield</h1>
        <img src="https://cdn-icons-png.flaticon.com/512/486/486968.png" alt="bomba">
        <button class="logout" onclick="signOut()"> Trocar de Conta </button>
        <button class="edit" onclick="redirectTo('edit')"> Editar Conta </button>
    </header>
    <section class="inicio" id="inicio">
        <form class="gameForm" id="gameForm" onsubmit="return generateGame()">
            <div class="options">
                <label> Quantas linhas? </label>
                <input type="number" name="lines" id="lines">
            </div>
            <div class="options">
                <label> Quantas colunas? </label>
                <input type="number" name="columns" id="columns">
            </div>
            <div class="options">
                <label> Quantas bombas? </label>
                <input type="number" name="bombs" id="bombs">
            </div>
            <div class="mode">
                <label>Qual modo de jogo?</label>
            </div>
            <div class="options">
                <label for="normal">Normal</label>
                <input type="radio" name="gameMode" id="normal" value="Normal">
                <label for="rivotril">Rivotril</label>
                <input type="radio" name="gameMode" id="rivotril" value="Rivotril">
            </div>
            <div class="options buttons">
                <input type="submit" value="Iniciar">
                <button onclick="redirectTo('ranking')">Ranking Global</button>
            </div>
        </form>
        <div class="history">
            <h2>Meu Histórico</h2>
            <table class="tableHistory">
                <tr>
                    <th> Dimensões </th>
                    <th> Bombas </th>
                    <th> Modalidade </th>
                    <th> Tempo </th>
                    <th> Resultado </th>
                    <th> Data</th>
                    <th> Hora </th>
                </tr>
            </table>
        </div>
    </section>
    <div class="game" id="game">
        <nav>
            <div class="item timer" id="timer">
                <p class="label"> Tempo Restante </p>
                <p class="timerInfo" id="timerInfo"> 00:00 </p>
            </div>
            <div class="item stopwatch" id="stopwatch">
                <p class="label"> Tempo Corrido </p>
                <p class="stopwatchInfo" id="stopwatchInfo"> 00:00 </p>
            </div>
            <div class="item">
                <p class="label"> Dimensão </p>
                <p class="dimensionInfo" id="dimensionInfo"></p>
            </div>
            <div class="item">
                <p class="label"> Modo </p>
                <p class="modeInfo" id="modeInfo"> Rivotril </p>
            </div>
            <button class="item cheat" onclick="cheatMode()">
                <span class="label"> Trapaça </span>
                <span class="flag" id="cheatFlag"> OFF </span>
            </button>
        </nav>
        <div class="grid" id="grid">
            <table class="table" id="table">
            </table>
        </div>
        <nav>
            <button class="item quit" onclick="onLose()">
                <span class="flag"> Desistir </span>
            </button>
        </nav>
    </div>
    <div class="overlay" id="overlay"></div>
    <div class="modal" id="modal">
        <p id="modalText"> Você perdeu! </p>
        <div class="options">
            <button onclick="inicialPageScreen()">Tela inicial</button>
            <button onclick="newGame()">Jogar Novamente</button>
        </div>
    </div>
</body>

</html>