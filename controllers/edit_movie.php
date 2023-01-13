<?php

require_once '../autoload.php';

$errors = [];

$data = $_GET;


$idMovie = strip_tags(trim($data['id_movie']));
$movieTitle = strip_tags(trim($data['movie_name']));


    if (!$idMovie or !$movieTitle) {
        $errors = 'error';
    }

    if (empty($errors)) {
        $movieModel = new MovieModel();
        $movieModel->editMovie($idMovie, $movieTitle);
        echo json_encode([
            'success' => true,
            "message" => "Movie edited successfully",
            'name' => $movieTitle,
            'id_movie' => $idMovie


        ]);
    } else {
        echo json_encode(["message" => "Error editing movie.phtml"]);
    }



