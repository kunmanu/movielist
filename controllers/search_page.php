<?php

$userId = $_SESSION['user']['id'];

$collectionModel = new CollectionModel();
$collections = $collectionModel -> getAllCollectionsFromUser($userId);


$script =  includeJavascript(['main']);
$template = 'search';
include "../templates/base.phtml";