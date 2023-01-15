<?php
require_once '../autoload.php';




$errors = [];


$user = $_SESSION['user']['id'];

if (!empty($_POST)) {
    var_dump($_POST['collection']);
    $collection = strip_tags(trim($_POST['collection']));

    if (!$collection) {
        $errors['collection'] = 'cannot be empty';
    }


    if (empty($errors)) {


        $collectionModel = new CollectionModel();
        $collectionModel-> createCollection($collection, $user);

    }

    header('Location: ' . buildUrl('all_collection_from_user'));
    exit;
}


/*TODO
add collection in ajax


*/