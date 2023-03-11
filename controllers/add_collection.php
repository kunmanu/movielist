<?php
require_once '../vendor/autoload.php';

$errors = [];
$user = $_SESSION['user']['id'];

$data = $_GET;

$title = strip_tags(trim($data['collection_name']));
$description = strip_tags(trim($data['collection_description']));


try {
    $collectionModel = new CollectionModel();
    $newCollection = $collectionModel->createCollection($title,$user,$description);

    if ($newCollection) {
        echo json_encode([
            'success' => true,
            'message' => 'Collection created successfully',
            'collection'=> $newCollection,
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error ading collection']);
    }
    exit;

} catch (Exception $e) {
    error_log('Error adding collection: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}
