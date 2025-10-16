<?php
require_once __DIR__ . "/../controllers/orderController.php";

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $id = $segments[2] ?? null;
 
    if (isset($id)) {
        orderController::getById($conn, $id);
    } else {
        orderController::getAll($conn);
    }
}

elseif ($_SERVER['REQUEST_METHOD'] === "POST") {
    $opcao = $segments[2] ?? null;
    $data = json_decode(file_get_contents('php://input'), true);

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