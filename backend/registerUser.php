<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $username = $_POST["username"];
        $name = $_POST["name"];
        $birthdate = $_POST["birthdate"];
        $cpf = preg_replace("/[^0-9]/", "", $_POST["cpf"]);
        $tel = $_POST["phone"];
        $email = $_POST["email"];
        $password = $_POST["password"];

        if (empty($username) || empty($name) || empty($birthdate) || empty($cpf) || empty($tel) || empty($email) || empty($password)) {
            http_response_code(400);
            echo "Parâmetros inválidos";
            exit();
        }

        require "connectToDatabase.php";

        $stmt = $conn->query("SELECT * FROM usuario WHERE username = '$username'");
        $registerUser = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($registerUser) {
            http_response_code(409);
            echo "Username em uso";
            exit();
        }

        $sql = "INSERT INTO usuario VALUES('$username', '$name', '$birthdate', '$cpf', '$tel', '$email', '$password')";
        $conn->exec($sql);

        $_SESSION["username"] = $username;
        $_SESSION["password"] = $password;
        $_SESSION["loggedIn"] = true;

        header("Location: ../views/home.php");
    } catch (Exception $ex) {
        http_response_code(500);
        echo $ex->getMessage();
    }
}
