<?php
require_once '../vendor/autoload.php';
require_once '../app/config.php';


$imgName = str_replace('/', '', $_GET['img']);


$imgUrl = 'https://image.tmdb.org/t/p/w185/' . $imgName;
$imgData = file_get_contents($imgUrl);

if ($imgData) {
    $savePath = MOVIE_POSTER_PATH . $imgName;
    file_put_contents($savePath, $imgData);
    echo  $imgName;
} else {
    echo 'Failed to download image from ' . $imgUrl;
}
