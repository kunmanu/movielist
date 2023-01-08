<?php
include_once '../autoload.php';


$data = json_decode(file_get_contents('php://input'), true);

$idList = $data['id_list'];
$idMovie = $data['id_movie'];


$listModel = new ListModel();
try {
    $listModel->deleteMovieFromList($idList, $idMovie);
    echo json_encode([
        'idList' => $idList,
        'idMovie' => $idMovie,
        'success' => true ]);
    exit;

} catch (Exception $e) {
    error_log('Error deleting movie from list: ' . $e->getMessage());
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    exit;
}



