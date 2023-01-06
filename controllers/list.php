<?php
require_once '../autoload.php';


$listModel = new ListModel();
$lists = $listModel ->getAllListWithMovies();

//dump($lists);

$template = 'list';
include '../templates/base.phtml';

