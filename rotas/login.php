<?php
require_once '../controllers/AuthController.php'

if($__SERVER['REQUEEST-METHOO' == "POST"]){
    $data = json_decode(file_get_contents['php://input'], true)
    AuthController::login($conn, $data);
}else{
    jsonResponse([
        'status'=>'erro'
        'message'=>'Método não permetido!'
    ],405);
}


?>