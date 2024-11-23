<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_SESSION["username"])) {
    try {
        $lines = $_POST["lines"];
        $columns = $_POST["columns"];
        $bombs = $_POST["bombs"];
        $mode = $_POST["mode"];
        $time = $_POST["time"];
        $result = $_POST["result"];
        $datetime = $_POST["datetime"];
        $username = $_SESSION["username"];

        require "connectToDatabase.php";

        $sql = "INSERT INTO partida(linhas, colunas, bombas, modalidade, tempo, resultado, datahora, username) 
        VALUES ($lines, $columns, $bombs, $mode, $time, $result, '$datetime', '$username')";

        $conn->exec($sql);
    } catch (Exception $e) {
        http_response_code(500);
        echo "Ocorreu um erro ao adicionar partida: " . $e->getMessage();
    }
} else {
    http_response_code(403);
    echo "Acesso negado";
}
