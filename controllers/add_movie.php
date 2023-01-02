<?php
include_once "../src/Model/MovieModel.php";


$errors = [];

if (!empty($_POST)) {

    $movie = strip_tags(trim($_POST['movie']));

    if (!$movie) {
        $errors['movie'] = 'Le champ "movie" est obligatoire';
    }

    // Si tout est OK (pas d'erreurs)...
    if (empty($errors)) {


        // On enregistre l'article
        $articleModel = new MovieModel();
        $articleModel->addMovie($movie);

    }
        header("Location: ../public/index.phtml");
        exit;
}
