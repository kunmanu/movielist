<?php
require_once '../autoload.php';




$errors = [];




if (!empty($_POST)) {
    var_dump($_POST['list']);
    $list = strip_tags(trim($_POST['list']));

    if (!$list) {
        $errors['list'] = 'cannot be empty';
    }


    if (empty($errors)) {


        $articleModel = new ListModel();
        $articleModel-> createList($list);

    }


    header("Location: ../controllers/lists.php");
    exit;
}
