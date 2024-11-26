<?php
session_start();
$_SESSION["loggedIn"] = false;
if (isset($_SESSION["username"]) && isset($_SESSION["password"])) {
    require "connectToDatabase.php";
    try {
        $username = $_SESSION["username"];
        $password = $_SESSION["password"];
        $auth = $conn->query("SELECT * from 
                    usuario WHERE
                    username = '$username' AND pwd = '$password'");

        $user = $auth->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $_SESSION["loggedIn"] = true;
        }
    } catch (Exception $e) {
        header("Location: ../views/login.php");
    }
}
if ($_SESSION["loggedIn"] === false) {
    header("Location: ../views/login.php");
}
