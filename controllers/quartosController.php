<?php
require_once __DIR__ . "/../models/quartomodel.php";
require_once __DIR__ . "/../models/PhotoModel.php";
require_once "ValidatorController.php";
require_once "UploadController.php";



class quartosController{

    public static function create($conn, $data){
        ValidatorController::validate_data($data, ["nome", "numero", "qtd_casal", "qtd_solteiro", "preco", "disponivel"]);

        $result = quartomodel::create($conn, $data);
        if ($result){
            if($data['foto']){
                $pictures = UploadController::upload($data['foto']);
                foreach($pictures['saves'] as $photos){
                    $idPhoto = PhotoModel::create($conn, $name);
                    if ($idPhoto){
                        PhotoModel::createRelationRomm($conn, $result, $idPhoto);
                    }
                }
            
            }
            return jsonResponse(['message'=>"Quarto criado com sucesso"]);
        }else{
            return jsonResponse(['message'=>"Erro ao criar o quarto"], 400);
        }
    }
    
    public static function getAll($conn){
        $roomList = quartomodel::getAll($conn);
        return jsonResponse($roomList);
    }

    public static function getById($conn, $id){
        $buscarId = quartomodel::getById($conn, $id);
        return jsonResponse($buscarId);
    }

    public static function delete($conn, $id){
        $result = quartomodel::delete($conn, $id);
        if ($result){
            return jsonResponse(['message'=>"Quarto excluido com sucesso"]);
        }else{
            return jsonResponse(['message'=>"Erro ao excluir o quarto"], 400);
        }
    }

    public static function update($conn, $id, $data){
        ValidatorController::validate_data($data, ["nome", "numero", "qtd_casal", "qtd_solteiro", "preco", "disponivel"]);
        $result = quartomodel::update($conn, $id, $data);
        if($result){
            return jsonResponse(['message'=> 'Quarto atualizado com sucesso']);
        }else{
            return jsonResponse(['message'=> 'Erro ao atualizar o quarto !'], 400);
        }
    }
    
    // $result = quartomodel::get_available($conn, $data);
    //     if($result){
    //         foreach ($result as &$quarto) {
    //             $quarto['fotos'] = PhotoModel::getByRoomId($conn, $quarto['id']);
    //         }
    //         return jsonResponse(['Quartos'=> $result]);
    //     }else{
    //         return jsonResponse(['message'=> 'não tem quartos disponiveis'], 400);

}

?>