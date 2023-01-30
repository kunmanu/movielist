<?php

if (!isConnected()){
    header('Location: ' . buildUrl('login'));
}


//$user = $_SESSION['user'];
$model = new UserModel();
$user = $model ->getUserById($_SESSION['user']['id']);

//dump($user);

$script =  includeJavascript(['main']);
$template = 'user_profile';
include '../templates/base.phtml';

/*TODO

*/
