<?php
//use MyProject\Core;
//use MyProject\Model\UserModel;
//use MyProject\Lib;

include_once "../lib/functions.php";
include_once "../autoload.php";



if (session_status() === PHP_SESSION_NONE) {
    session_start();
}



//dump($_GET);

$routes = include '../app/routes.php';

$page = $_GET['page'] ?? 'home';


if (!array_key_exists($page, $routes)) {
    http_response_code(404);
    echo 'Page introuvable';
    exit;
}

$controllerFile = $routes[$page];
include '../controllers/' . $controllerFile;