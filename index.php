<?php
require_once "config/database.php";
require_once "helpers/response.php";
 
if ($erroDB) {
    echo "Erro no Site";
    exit;
}
 
$uri = Strtolower(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];
 
$baseFolder = Strtolower(basename(dirname(__FILE__)));
$uri = str_replace("/$baseFolder", "", $uri);
$segment = explode("/", trim($uri, "/"));
 
$route = $segment[0] ?? null;
$subRoute = $segment[1] ?? null;
if ($route != "api"){
    require __DIR__ . "/public/index.html";
    //require  'teste.php';
    exit;
}
elseif($route === "api"){
    if(in_array($subRoute, ["login", "quartos", "clientes", "adicionais", "order", "pictures"])){ 
        require "rotas/${subRoute}.php";
    }else{
        return jsonResponse(['message'=>'rota nao encontrada'], 404);  
    }
    exit;
}
else{
    echo "404 pagina nao encontrada";
    exit;
}
echo var_dump($segment);
?>
 