<?php

require_once '../autoload.php';

$errors = [];

$data = json_decode(file_get_contents('php://input'), true);

$idMovie = strip_tags(trim($data['id_movie']));
$movieTitle = strip_tags(trim($data['title']));


    if (!$idMovie or !$movieTitle) {
        $errors = 'error';
    }

    if (empty($errors)) {
        $movieModel = new MovieModel();
        $movieModel->editMovie($idMovie, $movieTitle);
        echo json_encode([
            "message" => "Movie edited successfully",
            'name' => $movieTitle,
            'id_movie' => $idMovie

        ]);
    } else {
        echo json_encode(["message" => "Error editing movie"]);
    }



//TODO: use PUT method