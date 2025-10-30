<?php 
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/passwordController.php';
require_once __DIR__ . "/helpers/jwt/jwt_include.php";
require_once __DIR__ . "/controllers/quartosController.php";
require_once __DIR__ . "/controllers/clienteController.php";



// $title = "HOME";


echo passwordController::passwordHash("123");



//clienteController::getAll($conn);

//artosController::create($conn, $data);                    

//AuthController::login($conn, $data);

//$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtZXVzaXRlIiwiaWF0IjoxNzU2OTMwNTQ3LCJleHAiOjE3NTY5MzQxNDcsInN1YiI6eyJpZCI6Mywibm9tZSI6Imp1anVkb3BpeCIsImVtYWlsIjoianVqdWRvcGl4QGdtYWlsLmNvbSIsImNhcmdvcyI6IkphcmRpbmVpcm8ifX0.Xe_DRwBM3I9Wu6M1tz9Cv7KJy6uwVAcllPEtSpBJElE';
//echo validateToken($token);

//echo passwordController::passwordHash($data,['password']);

//echo password_hash("teste123",  PASSWORD_BCRYPT);

//$oi = '$2y$10$j/nTs8hD8hTMlWkPPRlUq.vvKyCn6mVk.zJiBg94Qd.MvdvuBXnbW';
//echo password_verify("teste123", $oi); 

//echo passwordController::passwordVerificar($data,['password']);




 

?> 