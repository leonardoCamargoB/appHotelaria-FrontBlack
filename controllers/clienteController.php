<?php
require_once __DIR__ . "/../models/clientesmodel.php";
require_once __DIR__ . "/../helpers/token_jwt.php";
require_once "AuthController.php";
require_once "PasswordController.php";
require_once "ValidatorController.php";


class clienteController{

    public static function create($conn, $data){
        ValidatorController::validate_data($data, ["nome", "cpf", "telefone", "email", "senha"]);

        $login = [
            "email" => $data['email'],
            "password" => $data['senha']
        ];

        $data['senha'] = PasswordController::passwordHash($data['senha']);
        $result = clientesmodel::create($conn, $data);
        if ($result){
            // se o usuario estiver -> efetuar o login
            // para retornar o Token JWT
            AuthController::loginClient($conn, $login);
        }else{
            return jsonResponse(['message'=>"Erro ao criar o cliente"], 400);
        }
    }

    public static function getAll($conn){
        $clientList = clientesmodel::getAll($conn);
        return jsonResponse($clientList);
    }

    public static function getById($conn, $id){
        $client = clientesmodel::getById($conn, $id);
        return jsonResponse($client);
    }

    public static function delete($conn, $id){
        $result = clientesmodel::delete($conn, $id);
        if ($result){
            return jsonResponse(['message'=>"Cliente excluido com sucesso"]);
        }else{
            return jsonResponse(['message'=>"Erro ao excluir o cliente"], 400);
        }
    }

    public static function update($conn, $id, $data){
        ValidatorController::validate_data($data, ["nome", "cpf", "telefone", "email"]);

        $result = clientesmodel::update($conn, $id, $data);
        if($result){
            return jsonResponse(['message'=> 'Cliente atualizado com sucesso']);
        }else{
            return jsonResponse(['message'=> 'Erro ao atualizar'], 400);
        }
    }

}

?>