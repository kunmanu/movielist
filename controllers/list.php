<?php
require_once '../autoload.php';


$listModel = new ListModel();
$lists = $listModel ->getAllList();



foreach ($lists as &$list) {
    // Create a new instance of the MovieModel
    $movieModel = new MovieModel();

    // Retrieve the movies for the current list using the MovieModel
    $movies = $movieModel->getMovieFromList($list['id_list']);

    // Add the movies to the current list as a new field called 'movies'
    $list['movies'] = $movies;
}



$template = 'list';
include '../templates/base.phtml';