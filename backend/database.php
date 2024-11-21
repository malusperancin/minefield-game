<?php
$host = "localhost";
$dbname = "minefield";
$user = "root";
$pwd = "";


try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pwd);

    $usuario =
        "CREATE TABLE IF NOT EXISTS usuario(
	    username varchar(20) NOT NULL,
        nome varchar(50) NOT NULL,
        nascimento date NOT NULL,
        cpf char(11) NOT NULL,
        tel char(11) NOT NULL,
        email varchar(50) NOT NULL,
        pwd varchar(50) NOT NULL,
        PRIMARY KEY(username)
    );";

    $conn->exec($usuario);

    $partida =
        "CREATE TABLE IF NOT EXISTS partida(
        codigo int NOT NULL AUTO_INCREMENT,
        linhas int NOT NULL,
        colunas int NOT NULL,
        bombas int NOT NULL,
        modalidade tinyint(1) NOT NULL, -- 0: normal; 1: rivotril
        tempo int NOT NULL, -- tempo em segundos
        resultado tinyint(1) NOT NULL, -- 0: derrota; 1: vitoria
        datahora datetime NOT NULL,
        username varchar(20) NOT NULL,
        PRIMARY KEY(codigo),
        FOREIGN KEY(username) REFERENCES usuario(username)
    );
    CREATE INDEX IF NOT EXISTS idx_partida_user ON partida(username);";

    $conn->exec($partida);

    $view_ranking =
        "CREATE VIEW ranking_global
        AS
        SELECT * FROM partida
        WHERE resultado = 1
        ORDER BY (linhas*colunas) DESC, bombas DESC, tempo DESC
        LIMIT 10";

    $conn->exec($view_ranking);

    echo "Banco criado!";
} catch (Exception $e) {
    echo "Ocorreu um erro na criação do banco de dados: " . $e->getMessage();
}
