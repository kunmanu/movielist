<?php


require_once '../autoload.php';

$errors = [];

$data = $_GET;



$idCollection = strip_tags(trim($data['idCollection']));
$collection_name = strip_tags(trim($data['collection_name']));


if (!$idCollection or !$collection_name) {
    $errors = 'error';
}

if (empty($errors)) {
    $collectionModel = new CollectionModel();
    $collectionModel->editCollection($idCollection, $collection_name);
    echo json_encode([
        'success' => true,
        "message" => "Collection edited successfully",
        'name' => $collection_name,
        'idCollection' => $idCollection

            ]);
} else {
    echo json_encode(["message" => "Error editing movie"]);
}



//TODO: use PUT method