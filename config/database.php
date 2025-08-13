<?php 
require_once "config.php";
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($conn->connect_error){
    die("Erro de conexão" . $conn->connect_error);
}

echo "Tudo Certo"

?>