<?php
include_once '../autoload.php';

$id_movie = $_GET['id'];

$movieModel = new MovieModel();
$movie = $movieModel -> getOneMovie($id_movie);


$script = includeJavascript(['main', 'ajax']);

$template = "movie";
include '../templates/base.phtml';

