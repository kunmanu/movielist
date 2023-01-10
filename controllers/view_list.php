<?php

require_once '../autoload.php';

$listModel = new ListModel();

// Get the id of the list to be displayed
$id_list = $_GET['id'];

var_dump($_POST);

// Retrieve the list from the database
$list = $listModel->getOneList($id_list);

// Retrieve the movies in the list
$movies = $listModel->getMoviesFromList($id_list);



$template = 'list';
include '../templates/base.phtml';


/* TODO : erreure si je recharge la page aprés avoir supprimé,

*/