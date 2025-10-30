<?php
    class userModel{
        public static function validarUser($conn, $email, $password){
            $sql = "SELECT usuarios.id, usuarios.nome, usuarios.email,usuarios.senha, cargos.nome AS cargo FROM usuarios JOIN cargos ON cargos.id = usuarios.cargo_id WHERE usuarios.email = ?";
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
?>
