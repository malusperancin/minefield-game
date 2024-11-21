<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $username = $_POST["username"];
        $name = $_POST["name"];
        $birthdate = $_POST["birthdate"];
        $cpf = $_POST["cpf"];
        $tel = $_POST["tel"];
        $email = $_POST["email"];
        $pwd = $_POST["pwd"];

        $host = "localhost";
        $dbname = "minefield";
        $user = "root";
        $pwd = "";
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pwd);

        $sql = "INSERT INTO usuario VALUES('$username', '$name', '$birthdate', '$cpf', '$tel', '$email', '$pwd')";
        $conn->exec($sql);

        $_SESSION["username"] = $username;
        $_SESSION["loggedIn"] = true;

        header("Location: ../views/home.php");
    } catch (Exception $ex) {
        http_response_code(500);
        echo $ex->getMessage();
    }
}
