<?php
//include_once '../autoload.php';
//
//
//
//$data = $_GET;
//
//
//
//
//if (empty($data['idMovie'])) {
//    http_response_code(400);
//    echo json_encode(['success' => false, 'message' => 'Missing Movie movie']);
//    exit;
//}
//
//$idMovie = $data['idMovie'];
//
//$MovieModel = new MovieModel();
//$MovieModel ->deleteMovie($idMovie);
//
//
//try {
//    $MovieModel->deleteMovie($idMovie);
//    echo json_encode([
//        'idMovie' => $idMovie,
//        'success' => true ]);
//    exit;
//
//} catch (Exception $e) {
//    error_log('Error deleting movie.phtml from collection: ' . $e->getMessage());
//    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
//    exit;
//}


include_once '../autoload.php';

$data = $_GET;

if (empty($data['idMovie'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing Movie id']);
    exit;
}

$idMovie = $data['idMovie'];
$movieModel = new MovieModel();

try {
    $result = $movieModel->deleteMovie($idMovie);

    if ($result) {
        echo json_encode([
            'idMovie' => $idMovie,
            'success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error deleting movie']);
    }
    exit;

} catch (Exception $e) {
    error_log('Error deleting movie: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}


