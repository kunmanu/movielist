<?php
require_once '../autoload.php';
require_once '../lib/functions.php';


$errors = [];

if (!empty($_POST)) {
    dump($_POST);
    $movieTitle = strip_tags(trim($_POST['movie_title']));
    $listId = strip_tags(trim($_POST['list']));


    if (!$movieTitle OR !$listId) {
        $errors = 'error';
    }

    if (empty($errors)) {
        $movieModel = new MovieModel();
        $movieModel -> addMovieIntoList($movieTitle, $listId);
    }


        header("Location: ../public/index.php");
        exit;
}
