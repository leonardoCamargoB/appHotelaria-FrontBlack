<?php 
require_once __DIR__ . "/../controllers/reservasController.php";

if ($_SERVER ['REQUEST_METHOD'] === "GET"){
    $id = $segment[2] ?? null;
    if ($id == null){
      reservasController::getaLL($conn);
    }else{
        reservasController::getById($conn, $id);  
    } 
} 
    elseif($_SERVER['REQUEST_METHOD'] == "POST"){
        $data = json_decode(file_get_contents('php://input'), true);
        reservasController::create($conn, $data);
    }
    elseif($_SERVER['REQUEST_METHOD'] == "PUT"){
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
            reservasController::update($conn, $id, $data);
        }
    elseif ($_SERVER['REQUEST_METHOD'] === "DELETE"){
    $id = $segment[2] ?? null;
    if (isset($id) == null){
        reservasController::delete($conn, $id);
    }else{
        jsonResponse(['message'=>'É necessario adicionar um id'],400);
        }
    }else{
    jsonResponse([
        'status'=>'erro',
        'message'=>'Metodo não permitido'
    ], 405);
}


?>