<?php


require_once '../autoload.php';


$listModel = new ListModel();
$lists = $listModel ->getAllListWithMovies();


$script = includeJavascript(['main', 'ajax']);
$template = 'lists';
include '../templates/base.phtml';

