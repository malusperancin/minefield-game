<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_SESSION["username"])) {
    try {
        require "connectToDatabase.php";

        $username = $_SESSION["username"];
        $stmt = $conn->query("SELECT * FROM partida WHERE username = '$username' ORDER BY datahora DESC");

        $playerMatches = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($playerMatches);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao obter histórico de usuário"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["error" => "Acesso negado."]);
}
