<?php

if (!isConnected()){
    header('Location: ' . buildUrl('login'));
}


$model = new UserModel();
$user = $model ->getUserById($_SESSION['user']['id']);


$script =  includeJavascript(['main']);
$template = 'user_profile';
include '../templates/base.phtml';


