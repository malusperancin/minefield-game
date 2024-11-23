<?php
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        require "connectToDatabase.php";

        $stmt = $conn->query("SELECT * FROM ranking_global");

        $ranking = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($ranking);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro ao obter ranking global"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["error" => "Acesso negado."]);
}
