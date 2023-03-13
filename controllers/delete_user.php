<?php
require_once '../vendor/autoload.php';
include_once '../lib/functions.php';

$userModel = new UserModel();
$collectionModel = new CollectionModel();


$idUser = $_GET['id'];
$collections = $collectionModel->getAllCollectionsFromUser($idUser);

if (!empty($collections)) {
    foreach ($collections as $collection) {
        $collectionModel->deleteCollection($collection['idCollection']);
    }
}

$userModel->deleteUser($idUser);



if (isAdmin()){
    header("Location: " . buildUrl('admin'));
    exit;
}
logout();
header("Location: " . buildUrl('home'));
exit;
