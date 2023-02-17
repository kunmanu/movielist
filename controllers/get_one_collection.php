<?php
include_once '../autoload.php';

try {
    $idCollection = $_GET['id'];

    $collectionModel = new CollectionModel();
    $collection = $collectionModel -> getOneCollection($idCollection);

    if (!$collection){
        throw new Exception("Collection not found");
    }

    header('Content-Type: application/json');
    echo json_encode($collection);
} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(array("error" => $e->getMessage()));
}
