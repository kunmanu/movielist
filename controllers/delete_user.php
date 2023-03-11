<?php
require_once '../vendor/autoload.php';
include_once '../lib/functions.php';

$userModel = new UserModel();
$collectionModel = new CollectionModel();
dump($_GET);

$idUser = $_GET['id'];
$collections = $collectionModel->getAllCollectionsFromUser($idUser);
foreach ($collections as $collection) {
    $collectionModel->deleteCollection($collection['idCollection']);

$userModel->deleteUser($idUser);

}

logout();
header("Location: " . buildUrl('home'));
exit;
