<?php


include_once '../app/config.php';
include_once '../autoload.php';


if (!empty($_POST["movie_id"])) {
    $movie_id = $_POST["movie_id"];
    $request = BASE_URL_GET_ONE . $movie_id. "?" . API_KEY."&language=en-US";
    $data = file_get_contents($request);
    $json = json_decode($data, true);

    var_dump($json);

}



//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US