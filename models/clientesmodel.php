<?php

class clientesmodel{
    public static function getAll($conn){
        $sql = "SELECT id, nome, cpf, telefone, email, cargo_id FROM clientes";
        $result = $conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    
    public static function getById($conn, $id){
        $sql = "SELECT id, nome, cpf, telefone, email, cargo_id FROM clientes WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    public static function create($conn, $data){
        $sql = "INSERT INTO clientes (nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss",
            $data['nome'],
            $data['cpf'],
            $data['telefone'],
            $data['email'],
            $data['senha'],
        );
        return $stmt->execute();
    }

    public static function update($conn, $id, $data){
        $sql = "UPDATE clientes SET nome=?, cpf=?, telefone=?, email=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssi",
            $data["nome"],
            $data["cpf"],
            $data["telefone"],
            $data["email"],
            $id
        );
        return $stmt->execute();
    }

    public static function delete($conn, $id){
        $sql = "DELETE FROM clientes WHERE id=?";
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public static function validateClient($conn, $email, $password) {
        $sql = "SELECT c.id, c.email, c.senha, c.nome, cargos.nome FROM clientes AS c 
        JOIN cargos ON cargos.id = c.cargo_id
        WHERE c.email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
 
        if($client = $result->fetch_assoc()) {
            if(PasswordController::validateHash($password, $client['senha'])) {
                unset($client['senha']);
                return $client;
            }
        return false;
        }
    }

}

?>