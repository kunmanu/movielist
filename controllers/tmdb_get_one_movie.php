<?php


include_once '../app/config.php';
include_once '../autoload.php';


if (!empty($_GET["id"])) {
    $movie_id = $_GET["id"];
    $request = BASE_URL_GET_ONE . $movie_id. "?" . API_KEY."&language=en-US";
    $data = file_get_contents($request);
    $json = json_decode($data, true);

    echo json_encode($json);

}



