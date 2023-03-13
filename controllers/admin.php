<?php
require_once '../vendor/autoload.php';

//verify admin status

if (!isAdmin()){
    $script =  includeJavascript(['main']);

    $template = 'home';
    include '../templates/base.phtml';
}

//load all user

$userModel = new UserModel();

$allUsers = $userModel -> getAllUsers();

dump($allUsers);
// load templates and script


$script =  includeJavascript(['main']);

$template = 'admin';
include '../templates/base.phtml';