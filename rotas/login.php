<?php
require_once __DIR__ . "/../controllers/AuthController.php";
 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $opcao = $segments[2] ?? null;
    $data = json_decode(file_get_contents('php://input'), true);
  
    //   Login do cliente
    if ($opcao == "cliente") {
        AuthController::clienteLogin($conn, $data);
    }
 
    //       Login do funcionario
    else if ($opcao == "employee") {
        AuthController::login($conn, $data);
    }
 
    else {
        jsonResponse([
            'status'=>'erro',
            'message'=>'rota não existe'], 405);
    }
}
    else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        validateTokenAPI();
        
        jsonResponse(['message' => $headers], 200);
 
        jsonResponse(["message"=>$headers], 200);
}
else {
    jsonResponse([
        "status"=>"Erro!",
        "message"=>"Método não permitido!"], 405);
}
 
?>
 