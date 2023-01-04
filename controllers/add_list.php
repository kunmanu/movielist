<?php
require_once '../autoload.php';




$errors = [];




if (!empty($_POST)) {
    var_dump($_POST['list']);
    $list = strip_tags(trim($_POST['list']));

    if (!$list) {
        $errors['list'] = 'cannot be empty';
    }

    // Si tout est OK (pas d'erreurs)...
    if (empty($errors)) {

        // On enregistre l'article
        $articleModel = new ListModel();
        $articleModel-> createList($list);

    }


    header("Location: ../public/index.php");
    exit;
}
