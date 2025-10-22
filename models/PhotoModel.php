<?php 

    class PhotoModel{
    public static function getAll($conn){
        $sql = "SELECT * FROM foto";
        $result = $conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    
    public static function getById($conn, $id){
        $sql = "SELECT * FROM foto WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    public static function getByRoomId($conn, $id){
        $sql = "SELECT f.nome* FROM imagens qf
                JOIN foto  ON qf.foto_id = f.id
                WHERE qf.quarto_id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $photos = [];
        while($row = $result->fetch_assoc()){
            $photos[] = $row['nome'];
        }
        return $photos;
    }

    public static function create($conn, $name){
        $sql = "INSERT INTO foto (nome) VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $name);
        if($stmt->execute()){
            return $conn->insert_id;
        } return false;
        
    }

     public static function createRelationRomm($conn, $idRomm, $idPhopo){
        $sql = "INSERT INTO imagens (quarto_id, foto_id) VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $idRomm, $idPhopo);
        if($stmt->execute()){
            return $conn->insert_id;
        } return false;
        
    }

    public static function update($conn, $id, $name){
        $sql = "UPDATE foto SET nome=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sdi",
            $data["nome"],
            $data["preco"],
            $id
        );
        return $stmt->execute();
    }

    public static function delete($conn, $id){
        $sql = "DELETE FROM foto WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

}

?>