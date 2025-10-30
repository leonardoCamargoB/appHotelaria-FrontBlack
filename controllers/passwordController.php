<?php 

    class passwordController{
        public static function passwordHash($value){
        return password_hash($value,PASSWORD_BCRYPT);
    }
        public static function passwordVerificar($value, $hash){
        return password_verify($value , $hash);
    }
    }




?>