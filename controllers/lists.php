<?php
require_once '../autoload.php';


$listModel = new ListModel();
$lists = $listModel ->getAllListWithMovies();

//$listModel = new ListModel();
//
//$lists = $listModel ->getAllList();
//$listsId = array_map(function($sub_array) {
//    return reset($sub_array);
//}, $lists);
//
//
//$movies = $listModel ->getMoviesFromLists($listsId);
//
//
//
//dump($movies);




$template = 'lists';
include '../templates/base.phtml';

