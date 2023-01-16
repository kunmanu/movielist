<?php
include_once '../autoload.php';

$idMovie = $_GET['id'];

$movieModel = new MovieModel();
$movie = $movieModel -> getOneMovie($idMovie);

if (!$movie){
    http_response_code(404);
    echo 'film introuvable';
    exit;
}

$script = includeJavascript(['main']);

$template = "movie";
include '../templates/base.phtml';

