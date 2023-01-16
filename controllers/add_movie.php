<?php
require_once '../autoload.php';

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


    $movieModel = new MovieModel();

    $movieModel->addMovieIntoCollection(
        $title,
        $collectionId,
        $userId,
        $summary,
        $poster,
        $releaseYear,
        $internetRating,
        $userRating,
        $summary,
        $isFavorite,
    );

    header('Location: ' . buildUrl('all_collection'));
}



