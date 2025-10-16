<?php
    class userModel{
        public static function validarUser($conn, $email, $password){
            $sql = "SELECT usuarios.id, usuarios.nome, usuarios.email,usuarios.senha, cargos.nome AS cargos FROM usuarios JOIN cargos ON cargos.id = usuarios.cargo_id WHERE usuarios.email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if($user = $result->fetch_assoc()){
                if($user['senha'] === $password){
                    unset($user ['senha']); 
                    return $user;
                }
                 
            }
            return false;
        }   
    }
    class clientesModel {
    public static function  validarCliente($conn, $cpf, $telefone){
         $sql = "SELECT cliente.id, cliente.nome, cliente.cpf, cliente.telefone, cliente.email ,cargos.nome AS cargos FROM clientes JOIN cargos ON cargos.id = cliente.cargo_id WHERE cliente.email = ?";
         $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

             if($cliente = $result->fetch_assoc()){
                if($cliente['cpf'] === $cpf){
                    unset($cliente ['cpf']); 
                    return $cliente;
                }
            }
            return false;
         }
    }       
?>
