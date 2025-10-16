<?php

class pedidosmodel{
    public static function create($conn, $data){
        $sql = 'INSERT INTO pedidos(usuario_id, cliente_id, pagamento) VALUES(?,?,?)';
       
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iis",
        $data['usuario_id'],
        $data['cliente_id'],
        $data['pagamento']
    );
    return $stmt->execute();
    }

    public static function getAll($conn){
        $Myssql = "SELECT * FROM reservas";
        $result = $conn->query("$Mysql");
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public static function getById($conn,$id){
        $sql = "SELECT * FROM reservas WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function delete($conn $id){
        $sql = "DELETE FROM reservas WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt_bin_param("i", $id);
        return $stmt->execute();
    }

    public static function update($conn, $id, $data){
        $sql = "UPDATE reservas SET usuario_id = ?, cliente_id = ?, pagamento = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iis",
            $data["usuario_id"],
            $data["cliente_id"],
            $data["pagamento"]
        )/
        return $stmt->execute();
    }



}













?>