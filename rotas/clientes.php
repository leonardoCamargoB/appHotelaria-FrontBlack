<?php
require_once __DIR__ . "/../controllers/clienteController.php";
require_once __DIR__ . "/../helpers/token_jwt.php";


if ( $_SERVER['REQUEST_METHOD'] === "GET" ){
    $id = $segments[2] ?? null;

    if (isset($id)){
        clienteController::getById($conn, $id);
    }else{
        clienteController::getAll($conn);
    }
}
elseif ( $_SERVER['REQUEST_METHOD'] === "POST" ){
    validateTokenAPI("Funcionario");

    $data = json_decode( file_get_contents('php://input'), true );
    clienteController::create($conn, $data);
}
elseif ( $_SERVER['REQUEST_METHOD'] === "PUT" ){
    validateTokenAPI("Funcionario");

    $data = json_decode( file_get_contents('php://input'), true );
    $id = $data['id'];
    clienteController::update($conn, $id, $data);
}
elseif ( $_SERVER['REQUEST_METHOD'] === "DELETE" ){
    validateTokenAPI("Funcionario");

    $data = json_decode( file_get_contents('php://input'), true );
    $id = $data['id'];
    if (isset($id)){
        clienteController::delete($conn, $id);
    }else{
        jsonResponse(['message'=>"ID do quarto é obrigatório"], 400);
    }
}
else{
    jsonResponse([
        'status'=>'erro',
        'message'=>'Método não permitido'
    ], 405);
}

?>