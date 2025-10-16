<?php
require_once "PasswordController.php";
require_once "ValidatorController.php";

require_once __DIR__ . "/../models/usermodel.php";
require_once __DIR__ . "/../models/clientesmodel.php";

require_once __DIR__ . "/../helpers/token_jwt.php";

class AuthController{

    public static function login($conn, $data){
        ValidatorController::validate_data($data, ["email", "password"]);

        $data['email'] = trim($data['email']);
        $data['password'] = trim($data['password']);

        // confirmar se tem algum campo vazio
        if ( empty($data['email']) || empty($data['password'])){
            return jsonResponse([
                "status"=>"erro",
                "message"=>"Preencha todos os campos!!!"
            ], 401);
        }

        $user = usermodel::validateUser($conn, $data['email'], $data['password']);
        if ($user){
            $token = createToken($user);
            return jsonResponse([ "token" => $token ]);
        }else{
            jsonResponse([
                "status"=>"erro",
                "message"=>"Credenciais inválidas!!"
            ], 401);
        }

    }

    public static function loginClient($conn, $data){
        ValidatorController::validate_data($data, ["email", "password"]);

        $data['email'] = trim($data['email']);
        $data['password'] = trim($data['password']);

        // confirmar se tem algum campo vazio
        if ( empty($data['email']) || empty($data['password'])){
            return jsonResponse([
                "status"=>"erro",
                "message"=>"Preencha todos os campos!!!"
            ], 401);
        }

        $user = clientesmodel::validateClient($conn, $data['email'], $data['password']);
        if ($user){
            $token = createToken($user);
            return jsonResponse([ "token" => $token ]);
        }else{
            jsonResponse(["status"=>"erro","message"=>"Credenciais inválidas!!"], 401);
        }
    }

}
?>