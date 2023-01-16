<?php
require_once '../autoload.php';

$errors = [];
$user = $_SESSION['user']['id'];

if (!empty($_POST)) {
    var_dump($_POST['collection']);
    $title = strip_tags(trim($_POST['collectionTitle']));
    $description = strip_tags(trim($_POST['collectionDescription']));
    $isFavorite = strip_tags(trim($_POST['collectionIsFavorite']));



    if (empty($errors)) {
        $collectionModel = new CollectionModel();
        $collectionModel->createCollection($title, $user, $isFavorite, $description);
    }

    header('Location: ' . buildUrl('all_collection_from_user'));
    exit;
}



/*TODO
add collection in ajax


*/