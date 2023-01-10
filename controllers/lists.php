<?php
require_once '../autoload.php';


$listModel = new ListModel();
$lists = $listModel ->getAllListWithMovies();



$template = 'lists';
include '../templates/base.phtml';

