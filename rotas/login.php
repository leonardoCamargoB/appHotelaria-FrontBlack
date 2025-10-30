<?php
require_once __DIR__ . "/../controllers/AuthController.php";
 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $opcao = $segment[2] ?? null;
    $data = json_decode(file_get_contents('php://input'), true);

    //   Login do cliente
    if ($opcao == "cliente") {
        AuthController::loginClient($conn, $data);
    }
 
    //       Login do funcionario
    else if ($opcao == "employee") {
        AuthController::login($conn, $data);
    }
 
    else {
        
        jsonResponse([ 'status'=>'erro', 'message'=>'rota não existe'], 405);
    }
} else {
    jsonResponse([ "status"=>"Erro!", "message"=>"Método não permitido!"], 405);
}
 
?>
 