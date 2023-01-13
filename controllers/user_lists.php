<?php

if(isConnected()){


    $user = $_SESSION['user']['id'];

    $model = new ListModel();
    $lists = $model->getAllListWithMoviesFromUser($user);



    $script =  includeJavascript(['main', "ajax"]);
    $template = 'user_lists';
    include '../templates/base.phtml';
}