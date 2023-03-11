<?php
require_once '../vendor/autoload.php';

$data = $_GET;

if (empty($data['idCollection'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'missing collection id']);
    exit;
}

$idCollection = $data['idCollection'];

$collectionModel = new CollectionModel();
$result = $collectionModel->deleteCollection($idCollection);

if ($result) {
    echo json_encode(['success' => true, 'id' => $idCollection]);
    exit;
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error deleting collection']);
    exit;
}
