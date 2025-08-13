<?php 

$conn = new mysqli("localhost","root","","apphoelaria");

if ($conn->connect_error){
    die("Erro de conexão" . $conn->connect_error);
}

echo "Tudo Certo"

?>