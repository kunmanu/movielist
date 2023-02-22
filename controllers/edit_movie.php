<?php
/*
require_once '../autoload.php';

$errors = [];

$data = $_GET;


$idMovie = strip_tags(trim($data['idMovie']));
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
            'idMovie' => $idMovie


        ]);
    } else {
        echo json_encode(["message" => "Error editing movie.phtml"]);
    }*/


//require_once '../autoload.php';
//
//$errors = [];
//$data = $_GET;
//
//try {
//    $idMovie = strip_tags(trim($data['idMovie']));
//    $movieTitle = strip_tags(trim($data['movie_name']));
//
//    if (!$idMovie or !$movieTitle) {
//        throw new Exception("Missing movie id or title");
//    }
//
//    $movieModel = new MovieModel();
//    $result = $movieModel->editMovie($idMovie, $movieTitle);
//
//
//    if ($result){
//        echo json_encode([
//            'success' => true,
//            "message" => "Movie edited successfully",
//            'name' => $movieTitle,
//            'idMovie' => $idMovie
//        ]);
//
//
//    } else {
//        http_response_code(500);
//        echo json_encode(['success' => false, 'message' => 'Error editing collection']);
//    }
//    exit;
//
//} catch (Exception $e) {
//    echo json_encode([
//        "error" => true,
//        "message" => $e->getMessage()
//    ]);
//}

require_once '../autoload.php';

$errors = [];
$data = $_GET;

try {
    $idMovie = strip_tags(trim($data['idMovie']));
    $movieTitle = strip_tags(trim($data['movie_name']));
    $summary = strip_tags(trim($data['summary']));
    $poster = strip_tags(trim($data['poster']));
    $releaseYear = strip_tags(trim($data['releaseYear']));

    $userRating = strip_tags(trim($data['userRating']));

    if (!$idMovie or !$movieTitle) {
        throw new Exception("Missing movie id or title");
    }

    $movieModel = new MovieModel();
    $result = $movieModel->editMovie(
        $idMovie,
        $movieTitle,
        $summary,
        $poster,
        $releaseYear,
        $userRating
    );

    if ($result){
        echo json_encode([
            'success' => true,
            "message" => "Movie edited successfully",
            'title' => $movieTitle,
            'summary' => $summary,
            'poster' => $poster,
            'releaseYear' => $releaseYear,
            'userRating' => $userRating,
            'idMovie' => $idMovie
        ]);

    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error editing collection']);
    }
    exit;

} catch (Exception $e) {
    echo json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}
