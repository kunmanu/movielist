<?php
require_once '../app/config.php';

// Make sure the request is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die();
}

// Verify that the uploaded file is an image
//if (!isset($_FILES['poster']) || !preg_match('/^image\/.*$/', $_FILES['poster']['type'])) {
//    http_response_code(400);
//    die();
//}


$upload = $_FILES["poster"];
$tempFile = $upload["tmp_name"];
$originalFileName = pathinfo($upload["name"], PATHINFO_FILENAME);
$fileExtension = pathinfo($upload["name"], PATHINFO_EXTENSION);

$finalFileName = $originalFileName . '_' . uniqid() . '.' . $fileExtension;

// Set the target directory and file name
$targetFile = MOVIE_POSTER_PATH . $finalFileName;

// Upload the file to the target directory
if (move_uploaded_file($_FILES["poster"]["tmp_name"], $targetFile)) {
    // Return the file path
    echo json_encode(['path' => $finalFileName]);
} else {
    http_response_code(500);
    die();
}
