<?php
include_once "../autoload.php";

$userModel = new UserModel();
$collectionModel = new CollectionModel();
dump($_GET);

$idUser = $_GET['id'];
$collections = $collectionModel->getAllCollectionsFromUser($idUser);
foreach ($collections as $collection) {
    $collectionModel->deleteCollection($collection['idCollection']);

$userModel->deleteUser($idUser);

}

$template = 'login';
include "../templates/base.phtml";
exit;
