<?php


$user = $_SESSION['user']['id'];
require_once '../vendor/autoload.php';

$errors = [];

$data = $_GET;

if (empty($data['idCollection']) || empty($data['collection_name']) || empty($data['collection_description'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing collection id, collection name or collection description']);
    exit;
}

$idCollection = strip_tags(trim($data['idCollection']));
$collectionName = strip_tags(trim($data['collection_name']));
$collectionDescription = strip_tags(trim($data['collection_description']));

try {
    $collectionModel = new CollectionModel();
    $result = $collectionModel->editCollection(
        $idCollection,
        $collectionName,
        $collectionDescription
    );

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Collection edited successfully',
            'name' => $collectionName,
            'description' => $collectionDescription,
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