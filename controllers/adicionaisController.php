<?php
require_once __DIR__ . "/../models/adicionaismodel.php";
require_once "ValidatorController.php";

class adicionaisController{

    public static function create($conn, $data){
        ValidatorController::validate_data($data, ["nome", "preco"]);
        $result =adicionaismodel::create($conn, $data);
        if ($result){
            return jsonResponse(['message'=>"Adicional criado com sucesso"]);
        }else{
            return jsonResponse(['message'=>"Erro ao criar o adicional"], 400);
        }
    }

    public static function getAll($conn){
        $additionalList = adicionaismodel::getAll($conn);
        return jsonResponse($additionalList);
    }

    public static function getById($conn, $id){
        $additional = adicionaismodel::getById($conn, $id);
        return jsonResponse($additional);
    }

    public static function delete($conn, $id){
        $result = AdditionadicionaismodelalModel::delete($conn, $id);
        if ($result){
            return jsonResponse(['message'=>"Adicional excluido com sucesso"]);
        }else{
            return jsonResponse(['message'=>"Erro ao excluir o adicional"], 400);
        }
    }

    public static function update($conn, $id, $data){
        ValidatorController::validate_data($data, ["nome", "preco"]);

        $result = adicionaismodel::update($conn, $id, $data);
        if($result){
            return jsonResponse(['message'=> 'Adicional atualizado com sucesso']);
        }else{
            return jsonResponse(['message'=> 'Erro ao atualizar'], 400);
        }
    }

}

?>