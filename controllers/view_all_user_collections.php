<?php

if (!isConnected()){
    header('Location: ' . buildUrl('login'));
}



    $user = $_SESSION['user']['id'];

    $model = new CollectionModel();
    $collections = $model->getAllCollectionWithMoviesFromUser($user);




    $script =  includeJavascript(['main']);
    $template = 'all_user_collections';
    include '../templates/base.phtml';
