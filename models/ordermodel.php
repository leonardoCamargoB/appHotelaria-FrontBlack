<?php
require_once __DIR__ . "/../models/quartomodel.php";
require_once __DIR__ . "/../models/reservasmodel.php";

class ordersmodel{
/*/public static function create($conn, $data){
        $sql = 'INSERT INTO pedidos(usuario_id, cliente_id, pagamento) VALUES(?,?,?)';
       
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iis",
        $data['usuario_id'],
        $data['cliente_id'],
        $data['pagamento']
        );
        $result = $stmt->execute();
        if($result){
            return $conn->$insert_id();
        }else{
            return false;
        }
    }

   /* public static function getAll($conn){
        $Myssql = "SELECT * FROM pedidos";
        $result = $conn->query("$Mysql");
        return $result->fetch_all(MYSQLI_ASSOC);
    }*/


    /*public static function getById($conn,$id){
        $sql = "SELECT * FROM pedidos WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

   /* public static function delete($conn $id){
        $sql = "DELETE FROM pedidos WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt_bin_param("i", $id);
        return $stmt->execute();
    }*/

   /* public static function update($conn, $id, $data){
        $sql = "UPDATE pedidos SET usuario_id = ?, cliente_id = ?, pagamento = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iis",
            $data["usuario_id"],
            $data["cliente_id"],
            $data["pagamento"]
        );
        return $stmt->execute();
    }*/

    public static function createOrder($conn, $data){
        $cliente_id = $data['cliente_id'];
        $usuario_id = $data['usuario_id'];
        $pagamento = $data['pagamento'];

        $reservas = [];
        $reservou = false;
       
        $conn->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);

        try {
            $order_id = self::create($conn, [
                "usuario_id" => $usuario_id,
                "cliente_id" => $cliente_id,
                "pagamento" => $pagamento
            ]);

            if(!$order_id){
                throw new RuntimeException("erro ao criar o pedido");
            }

            foreach($data['quartos'] as $quarto){
                $id = $quarto["id"];
                $inicio = $quarto["inicio"];
                $fim = $quarto["fim"];

                if(!reservasmodel::lockById($conn, $id)){
                    $reservas[] = "quarto ($id) indisponivel";
                    continue;
                }
                

               if ( !reservasmodel::isQuartoDisponivel($conn, $id, $inicio, $fim)) {
                    $reservas[] = "quarto {$id} indisponivel no periodo de {$inicio} a {$fim}";
                    continue;
                }

                $reserveResult = reservasmodel::create($conn, [
                    "pedido_id" => $order_id,
                    "quarto_id" => $id,
                    "adicional_id" => $null,
                    "inicio" => $inicio,
                    "fim" => $fim
                ]);

                $reservou = true;
                $reservas [] = [
                    "reserva_id" => $conn->insert_id,
                    "quarto_id" => $id
                ];
            }

            if ( $reservou == true ) {
                $conn->commit();
                return [
                    "pedido_id" => $order_id,
                    "reservas" => $reservas,
                    "message" => "Reservas criadas com sucesso!"
                ];

            } else {
                throw new RuntimeException("Pedido não realizado, nenhum quarto reservado.");
            }

        }catch (\Throwable $th) {
            try {
                $conn->rollback();
            } catch (\Throwable $th) {
               throw $th; 
            }
            //throw $th;
        }
    }
}
?>