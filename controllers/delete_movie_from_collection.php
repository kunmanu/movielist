<?php
/*include_once '../autoload.php';


$data = $_GET;

$idCollection = $data['idCollection'];
$idMovie = $data['idMovie'];


$collectionModel = new CollectionModel();
try {
    $collectionModel->deleteMovieFromCollection($idCollection, $idMovie);
    echo json_encode([
        'idCollection' => $idCollection,
        'idMovie' => $idMovie,
        'success' => true ]);
    exit;

} catch (Exception $e) {
    error_log('Error deleting movie from collection: ' . $e->getMessage());
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    exit;
}
*/


include_once '../autoload.php';

$data = $_GET;

if (empty($data['idCollection']) || empty($data['idMovie'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing collection or movie id']);
    exit;
}

$idCollection = $data['idCollection'];
$idMovie = $data['idMovie'];

$collectionModel = new CollectionModel();

try {
    $result = $collectionModel->deleteMovieFromCollection($idCollection, $idMovie);

    if ($result) {
        echo json_encode([
            'idCollection' => $idCollection,
            'idMovie' => $idMovie,
            'success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error deleting movie from collection']);
    }
    exit;

} catch (Exception $e) {
    error_log('Error deleting movie from collection: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}
