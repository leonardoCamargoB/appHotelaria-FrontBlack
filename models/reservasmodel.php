<?php

class reservasomodel{
    public static function create($conn, $data){
        $sql = "INSERT INTO reservas(pedido_id, quarto_id, adicional_id, fim, inicio) VALUES(?, ?, ?, ?, ?)"; 

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiiss",
            $data['pedido_id'],
            $data['quarto_id'],
            $data['adicional_id'],
            $data['fim'],
            $data['inicio'],
        );
        return $stmt->execute();
    }

        public static function getAll($conn){
        $Mysql = "SELECT * FROM reservas";
        $result = $conn->query($Mysql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }  
 
     public static function getById($conn, $id){
        $sql = "SELECT * FROM reservas WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

        public static function delete($conn, $id){
        $sql = "DELETE FROM reservas WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
        public static function update($conn, $id, $data) {
            $sql = "UPDATE reservas SET pedido_id = ?, quarto_id = ?, adicional_id = ?, fim = ?, inicio = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("iiiss",
                $data["pedido_id"],
                $data["quarto_id"],
                $data["adicional_id"],
                $data["fim"],
                $data["inicio"],
                $id
            );
           return $stmt->execute();
        }
        
        //KEVEN - RETORNA TRUE SE NAO TEM CONFLITO
        public static function isQuartoDisponivel($conn, $quarto_id, $inicio, $fim) {
            $sql = "SELECT COUNT(*) as conflitos
                    FROM reservas
                    WHERE quarto_id = ?
                    AND (
                        (inicio <= ? AND fim > ?) OR
                        (inicio < ? AND fim >= ?) OR
                        (inicio >= ? AND fim <= ?)
                    )";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("issssss",
                $quarto_id,
                $fim, $inicio,
                $inicio, $fim,
                $inicio, $fim
            );
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            return $row['conflitos'] == 0;
    }

    


}








?>
