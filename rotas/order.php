<?php
require_once __DIR__ . "/../controllers/orderController.php";
require_once __DIR__ . "/../helpers/token_jwt.php";

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $id = $segments[2] ?? null;
 
    if (isset($id)) {
        orderController::getById($conn, $id);
    } else {
        orderController::getAll($conn);
    }
}

elseif ($_SERVER['REQUEST_METHOD'] === "POST") {
    $user = validateTokenAPI('cliente');
    $opcao = $segments[2] ?? null;
    $data = json_decode(file_get_contents('php://input'), true);
    $data['cliente_id'] = $user['id'];

    if ($opcao == "reservation"){
        orderController::createOrder($conn, $data);
    }else{
        orderController::create($conn, $data);
    }
}

else{
    jsonResponse(['status'=>'erro','message'=>'Método não permitido'], 405);
}

?>