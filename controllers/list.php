<?php
require_once '../autoload.php';


$listModel = new ListModel();
$lists = $listModel ->getAllListWithMovies();

$template = 'list';
include '../templates/base.phtml';

