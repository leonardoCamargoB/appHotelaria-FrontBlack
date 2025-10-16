<?php 

    class passwordController{
        public static function passwordHash($password){
        return password_hash('$password',PASSWORD_BCRYPT);
    }
        public static function passwordVerificar($password, $hash){
        return password_verify('$password' , '$hash');
    }
    }




?>