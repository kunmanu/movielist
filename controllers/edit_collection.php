<?php


/*require_once '../autoload.php';

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

*/

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

//TODO: use PUT method