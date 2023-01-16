<?php


require_once '../autoload.php';


$collectionModel = new CollectionModel();
$collections = $collectionModel ->getAllCollectionWithMovies();



$script = includeJavascript(['main']);
$template = 'all_collections';
include '../templates/base.phtml';

