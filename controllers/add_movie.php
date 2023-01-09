<?php
require_once '../autoload.php';



$errors = [];

if (!empty($_POST)) {
    $movieTitle = strip_tags(trim($_POST['movie_title']));
    $listId = strip_tags(trim($_POST['list']));


    if (!$movieTitle OR !$listId) {
        $errors = 'error';
    }

    if (empty($errors)) {
        $movieModel = new MovieModel();
        $movieModel -> addMovieIntoList($movieTitle, $listId);
    }


        header("Location: ../controllers/lists.php");
        exit;
}
