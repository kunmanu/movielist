<?php
include_once '../autoload.php';

if (!isConnected()) {
    header('Location: ' . buildUrl('login'));
    exit;
}

$user = $_SESSION['user']['id'];

$collectionModel = new CollectionModel();
$collections = $collectionModel->getAllCollectionsFromUser($user);


$script = includeJavascript(['main', "ajax"]);
$template = 'add_collection_&_movie';
include '../templates/base.phtml';
