<?php
require_once "ValidatorController.php";
require_once __DIR__ . "/../models/ordermodel.php";


class orderController {

    public static function create($conn, $data){
        return;
    }

    public static function getById($conn, $id){
        return;
    }
    
    public static function getAll($conn){
        return;
    }

    public static function update($conn, $data){
        return;
    }

    public static function delete($conn, $id){
        return;
    }

    public static function createOrder($conn, $data){
       $data['usuario_id'] = isset($data['usuario_id']) ?  $data['usuario_id'] : null;

        ValidatorController::validate_data($data, ["cliente_id", "pagamento", "quartos"]);

        foreach($data['quartos'] as $quarto){
          ValidatorController::validate_data($quarto,["id","inicio", "fim"]);
          $quarto['inicio'] = ValidatorController::fix_dateHour($quarto['inicio'], 14);
          $quarto['fim'] = ValidatorController::fix_dateHour($quarto['fim'], 12);
        }

        if(count ($data ["quartos"]) == 0){
            return jsonResponse(['message'=> 'não existe reserva'], 400);
        }
        try {
            $resultado = ordersmodel::createOrder($conn, $data);
            return jsonResponse(['message'=> $resultado]);
        } catch(RuntimeException $erro){
            return jsonResponse(['message' => "erro ao criar a reserva"], 500);
        }
    }
    
    /*
    public static function getAll($conn){
        $roomList = ordermodel::getAll($conn);
        return jsonResponse($roomList);
    }

    public static function getById($conn, $id){
         $buscId = ordermodel::getById($conn, $id);
        return jsonResponse($buscId);
    }
 
    public static function delete($conn, $id){
        $delet = ordermodel::delete($conn, $data);
        if ($delet){
            return jsonResponse(['mesage'=>"quarto excluido com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"Não foi possivel ser deletar esse quarto"]);
        }
    }*/
     /* public static function update($conn, $id, $data){
        $resultado = ordermodel::update($conn, $id, $data);
        if($resultado){
            return jsonResponse(['message'=> 'Roomatualizado']);
        } else{
            return jsonResponse(['message'=> 'Não possivel atulizar esse quarto, tente novamente'], 400);
        }
    }*/

  
}




?>