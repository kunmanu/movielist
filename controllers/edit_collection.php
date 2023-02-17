<?php


require_once '../autoload.php';

$errors = [];

$data = $_GET;

if (empty($data['idCollection']) || empty($data['collection_name'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing collection id or collection name']);
    exit;
}

$idCollection = strip_tags(trim($data['idCollection']));
$collectionName = strip_tags(trim($data['collection_name']));

try {
    $collectionModel = new CollectionModel();
    $result = $collectionModel->editCollection($idCollection, $collectionName);

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Collection edited successfully',
            'name' => $collectionName,
            'idCollection' => $idCollection
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error editing collection']);
    }
    exit;

} catch (Exception $e) {
    error_log('Error editing collection: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}

