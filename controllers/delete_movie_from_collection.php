<?php
include_once '../autoload.php';


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



