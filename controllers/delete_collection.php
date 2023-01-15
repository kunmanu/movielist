<?php
include_once '../autoload.php';

$data = $_GET;

if (empty($data['idCollection'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'missing collection id']);
    exit;
}
$idCollection = $data['idCollection'];

$collectionModel = new CollectionModel();
$collectionModel ->deleteCollection($idCollection);


echo json_encode(['success' => true,'id' => $idCollection]);
exit;

