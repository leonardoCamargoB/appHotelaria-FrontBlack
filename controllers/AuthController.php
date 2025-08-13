<?php
require_once "../models/usermodel.php";
require_once "../helpers/response.php";
 
class AuthController{
    public static function login($conn, $data) {
        $data['email'] = trim($data['email']);
        $data['password'] = trim($data['password']);
 
        if (empty($data['email']) || empty($data['password'])) {
            return jsonResponse([
                "status" => "erro",
                "message" => "Preencha todos os campos!"
            ], 401);
        }
 
        $user = usermodel::validarUser($conn, $data['email'], $data['password']);
        if ($user) {
            return jsonResponse([
                "id" => $user['id'],
                "nome" => $user['nome'],
                "email" => $user['email'],
                "cargo" => $user['cargo_id']
            ]);
        } else {
            return jsonResponse([
                "status" => "erro",
                "message" => "Credenciais inválidas!"
            ], 401);
        }
    }
}
 