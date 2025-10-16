<?php
require_once __DIR__ . "/../controllers/adicionaisController.php";


if ( $_SERVER['REQUEST_METHOD'] === "GET" ){
    $id = $segments[2] ?? null;

    if (isset($id)){
        adicionaisController::getById($conn, $id);
    }else{
        adicionaisController::getAll($conn);
    }
}
elseif ( $_SERVER['REQUEST_METHOD'] === "POST" ){
    $data = json_decode( file_get_contents('php://input'), true );
    adicionaisController::create($conn, $data);
}
elseif ( $_SERVER['REQUEST_METHOD'] === "PUT" ){
    $data = json_decode( file_get_contents('php://input'), true );
    $id = $data['id'];
    adicionaisController::update($conn, $id, $data);
}
elseif ( $_SERVER['REQUEST_METHOD'] === "DELETE" ){
    $data = json_decode( file_get_contents('php://input'), true );
    $id = $data['id'];
    if (isset($id)){
        adicionaisController::delete($conn, $id);
    }else{
        jsonResponse(['message'=>"ID do item é obrigatório"], 400);
    }
}
else{
    jsonResponse([
        'status'=>'erro',
        'message'=>'Método não permitido'
    ], 405);
}

?>