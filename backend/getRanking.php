<?php
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    try {
        $host = "localhost";
        $dbname = "minefield";
        $dbuser = "root";
        $pwd = "";
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $dbuser, $pwd);

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
