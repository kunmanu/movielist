<?php
require_once '../autoload.php';
require_once '../app/config.php';

$userId = $_SESSION['user']['id'];

$errors = [];

if (!empty($_POST)) {
    $title = strip_tags(trim($_POST['movieTitle']));
    $releaseYear = strip_tags(trim($_POST['movieYear']));
    $userRating = strip_tags(trim($_POST['movieRating']));
    $summary = strip_tags(trim($_POST['movieSummary']));
    $isFavorite = isset($_POST['movieIsFavorite']) ? strip_tags(trim($_POST['movieIsFavorite'])) : 0;

    $collectionId = strip_tags(trim($_POST['movieCollection']));
    $internetRating = 2;
    $poster = "";



    $upload = $_FILES["movieImg"];
    $tempFile = $upload["tmp_name"];
    $originalFileName = pathinfo($upload["name"], PATHINFO_FILENAME);
    $fileExtension = pathinfo($upload["name"], PATHINFO_EXTENSION);

    $finalFileName = $originalFileName . '_' . uniqid() . '.' . $fileExtension;
    $targetFile = MOVIE_POSTER_PATH . $finalFileName;

    move_uploaded_file($tempFile, $targetFile);



    $movieModel = new MovieModel();

    $movieModel->addMovieIntoCollection(
        $title,
        $collectionId,
        $userId,
        $summary,
        $finalFileName,
        $releaseYear,
        $internetRating,
        $userRating,
        $summary,
        $isFavorite,
    );

    header('Location: ' . buildUrl('all_collection'));
}



