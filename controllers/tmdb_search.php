<?php
include_once '../app/config.php';
include_once '../autoload.php';



if (!empty($_POST["searchString"])){
    $searchString = urlencode($_POST["searchString"]);
    $request = BASE_URL_SEARCH . API_KEY . "&language=en-US&query=". $searchString."&page=1";
    $data = file_get_contents($request);
    $json = json_decode($data, true);

    $allPages = [];

    if ($json['total_pages']>=1){

        for ($x = 1; $x <= $json['total_pages']; $x++) {
            $request = BASE_URL_SEARCH . API_KEY . "&language=en-US&query=". $searchString."&page=".$x;
            $data = file_get_contents($request);
            $json = json_decode($data, true);
            $allPages = array_merge($allPages, $json['results']);
        }

    }

    echo json_encode($allPages);

}



