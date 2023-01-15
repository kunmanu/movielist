<?php
include_once '../autoload.php';



$data = $_GET;




if (empty($data['idMovie'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing Movie movie']);
    exit;
}

$idMovie = $data['idMovie'];

$MovieModel = new MovieModel();
$MovieModel ->deleteMovie($idMovie);


try {
    $MovieModel->deleteMovie($idMovie);
    echo json_encode([
        'idMovie' => $idMovie,
        'success' => true ]);
    exit;

} catch (Exception $e) {
    error_log('Error deleting movie.phtml from collection: ' . $e->getMessage());
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    exit;
}




