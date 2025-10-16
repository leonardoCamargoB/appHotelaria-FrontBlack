<?php

require_once __DIR__ . "/../models/pedidosmodel.php";

class pedidosController{

    public static function create($conn, $data){
        $result = pedidosmodel::create($conn, $data);

        if($result){
            return jsonResponse(['mesage'=>"quarto criado com sucesso!"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao criar o quarto, tente novamente"]);
        }

    }
    
    public static function getAll($conn){
        $roomList = pedidosmodel::getAll($conn);
        return jsonResponse($roomList);
    }

  public static function getById($conn, $id){
        $buscId = pedidosmodel::getById($conn, $id);
        return jsonResponse($buscId);
    }
 
    public static function delete($conn, $id){
        $delet = pedidosmodel::delete($conn, $data);
        if ($delet){
            return jsonResponse(['mesage'=>"quarto excluido com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"Não foi possivel ser deletar esse quarto"]);
        }
    }
    public static function update($conn, $id, $data){
        $resultado = pedidosmodel::update($conn, $id, $data);
        if($resultado){
            return jsonResponse(['message'=> 'Roomatualizado']);
        } else{
            return jsonResponse(['message'=> 'Não possivel atulizar esse quarto, tente novamente'], 400);
        }
    }
}
 
?>
 
 