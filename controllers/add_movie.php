<?php
//require_once '../autoload.php';
//require_once '../app/config.php';
//
//$userId = $_SESSION['user']['id'];
//
//$errors = [];
//
//if (!empty($_GET)) {
//    $title = strip_tags(trim($_GET['movieTitle']));
//    $releaseYear = strip_tags(trim($_GET['movieYear']));
//    $userRating = strip_tags(trim($_GET['movieRating']));
//    $summary = strip_tags(trim($_GET['movieSummary']));
//    $isFavorite = isset($_GET['movieIsFavorite']) ? strip_tags(trim($_POST['movieIsFavorite'])) : 0;
//
//    $collectionId = strip_tags(trim($_GET['movieCollection']));
//    $internetRating = 2;
//    $poster = "";
//
//
//
//
//
//
//
//
//    $movieModel = new MovieModel();
//
//    $movieModel->addMovieIntoCollection(
//        $title,
//        $collectionId,
//        $userId,
//        $summary,
//        $poster,
//        $releaseYear,
//        $internetRating,
//        $userRating,
//        $summary,
//        $isFavorite,
//    );
//
//    header('Location: ' . buildUrl('all_collection'));
//}
//
//
//

//require_once '../autoload.php';
//
//$errors = [];
//$user = $_SESSION['user']['id'];
//
//$data = $_GET;
//
//$title = strip_tags(trim($data['movieTitle']));
//$summary = strip_tags(trim($data['movieSummary']));
//$rating = strip_tags(trim($data['movieRating']));
//$imgPath = strip_tags(trim($data['movieImg']));
//$isFavorite = 0;
//
//if (isset($data['movieIsFavorite'])) {
//   $isFavorite=  strip_tags(trim($data['movieIsFavorite']));
//
//}
//
//$idCollection = strip_tags(trim($data['idCollection']));
//$releaseYear = strip_tags(trim($data['releaseYear']));
//
//$userText = 'good movie';
//
//$internetRating = 5;
//
//try {
//    $movieModel = new MovieModel();
//    $newMovie = $movieModel->addMovieIntoCollection(
//        $title,
//        $idCollection,
//        $user,
//        $summary,
//        $imgPath,
//        $releaseYear,
//        $internetRating,
//        $rating,
//        $userText,
//        $isFavorite
//    );
//
//    if ($newMovie) {
//        echo json_encode([
//            'success' => true,
//            'message' => 'Movie added successfully',
//            'movie' => $newMovie,
//        ]);
//    } else {
//        http_response_code(500);
//        echo json_encode(['success' => false, 'message' => 'Error adding movie']);
//    }
//    exit;
//
//} catch (Exception $e) {
//    error_log('Error adding movie: ' . $e->getMessage());
//    http_response_code(500);
//    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
//    exit;
//}


require_once '../vendor/autoload.php';

$errors = [];
$user = $_SESSION['user']['id'] ;

$data = $_GET;

$title = isset($data['movieTitle']) ? strip_tags(trim($data['movieTitle'])) : null;
$summary = isset($data['movieSummary']) ? strip_tags(trim($data['movieSummary'])) : null;
$rating = isset($data['movieRating']) ? strip_tags(trim($data['movieRating'])) : null;
$imgPath = isset($data['movieImg']) ? strip_tags(trim($data['movieImg'])) : null;
$idCollection = isset($data['idCollection']) ? strip_tags(trim($data['idCollection'])) : null;
$releaseYear = isset($data['releaseYear']) ? strip_tags(trim($data['releaseYear'])) : null;
$internetRating = isset($data['internetRating']) ? strip_tags(trim($data['internetRating'])) : null;
$genres = isset($data['movieGenre']) ? strip_tags(trim($data['movieGenre'])) : null;


try {
    $movieModel = new MovieModel();
    $newMovie = $movieModel->addMovieIntoCollection(
        $title,
        $idCollection,
        $user,
        $summary,
        $imgPath,
        $releaseYear,
        $genres,
        $internetRating,
        $rating,
    );

    if ($newMovie) {
        echo json_encode([
            'success' => true,
            'message' => 'Movie added successfully',
            'movie' => $newMovie,
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error adding movie']);
    }
    exit;

} catch (Exception $e) {
    error_log('Error adding movie: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}
