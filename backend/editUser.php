<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_SESSION["username"])) {
    try {
        $username = $_SESSION["username"];
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];
        $password = $_POST["password"];

        require "connectToDatabase.php";

        $sql = "UPDATE usuario
        SET nome = '$name', tel = '$phone', email = '$email', pwd = '$password'
        WHERE username = '$username'";

        $conn->exec($sql);

        $_SESSION["password"] = $password;
    } catch (Exception $e) {
        http_response_code(500);
        echo "Erro ao editar usuario";
    }
} else {
    http_response_code(403);
    echo "Acesso proibido";
}
