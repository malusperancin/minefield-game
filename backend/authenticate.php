<?php
session_start();
require "connectToDatabase.php";
if (!isset($_SESSION["username"]) || !isset($_SESSION["password"]) || !isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] === false) {
    header("Location: ../views/login.php");
    exit();
}

$username = $_SESSION["username"];
$password = $_SESSION["password"];

$auth = $conn->query("SELECT * from 
                usuario WHERE
                username = '$username' AND pwd = '$password'");

$user = $auth->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    $_SESSION["loggedIn"] = false;
    //require "logout.php";
    header("Location: ../views/login.php");
} else {
    $_SESSION["loggedIn"] = true;
}
