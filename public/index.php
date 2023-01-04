<?php




$routes = include '../app/routes.php';


$page = $_GET['page'] ?? 'home';


if (!array_key_exists($page, $routes)) {
    http_response_code(404);
    echo 'Page introuvable';
    exit;
}

$controllerFile = $routes[$page];
include '../controllers/' . $controllerFile;