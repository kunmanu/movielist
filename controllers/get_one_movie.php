<?php
include_once '../autoload.php';

try {
    $idMovie = $_GET['id'];

    $movieModel = new MovieModel();
    $movie = $movieModel -> getOneMovie($idMovie);

    if (!$movie){
        throw new Exception("Movie not found");
    }

    header('Content-Type: application/json');
    echo json_encode($movie);
} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(array("error" => $e->getMessage()));
}
