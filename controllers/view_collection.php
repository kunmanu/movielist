<?php

require_once '../autoload.php';

$collectionModel = new CollectionModel();

// Get the id of the collection to be displayed
$idCollection = $_GET['id'];
$user = $_SESSION['user']['id'];
//var_dump($_POST);

// Retrieve the collection from the database
$collection = $collectionModel->getOneCollection($idCollection);

// Retrieve the movies in the collection
$movies = $collectionModel->getMoviesFromCollection($idCollection);


$script =  includeJavascript(['main', "ajax"]);
$template = 'collection';
include '../templates/base.phtml';


/* TODO : erreure si je recharge la page aprés avoir supprimé,

*/