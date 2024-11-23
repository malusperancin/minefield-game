<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["user"]) && isset($_POST["password"])) {
        try {
            $username = $_POST["user"];
            $password = $_POST["password"];

            require "connectToDatabase.php";

            $auth = $conn->query("SELECT * from 
                usuario WHERE
                username = '$username' AND pwd = '$password'");

            $user = $auth->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                $_SESSION["username"] = $username;
                $_SESSION["loggedIn"] = true;

                header("Location: ../views/home.php");
            } else {
                http_response_code(401);
                echo "Usuário ou senha incorretos";
                exit();
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo "Ocorreu um erro ao fazer login: " . $e->getMessage();
        }
    } else {
        http_response_code(400);
        echo "Parametros inválidos";
    }
}
