<?php


require_once '../vendor/autoload.php';

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
