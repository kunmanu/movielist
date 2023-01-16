<?php
require_once '../autoload.php';

$user = $_SESSION['user']['id'];

$errors = [];

if (!empty($_POST)) {
    $movieTitle = strip_tags(trim($_POST['movie_title']));
    $collectionId = strip_tags(trim($_POST['collection']));


    if (!$movieTitle OR !$collectionId) {
        $errors = 'error';
    }

    if (empty($errors)) {
        $movieModel = new MovieModel();
        try {
            $movieModel->addMovieIntoCollection($movieTitle, $collectionId, $user);
        } catch (Exception $e) {

        }
    }

        header('Location: ' . buildUrl('all_collection'));

}
