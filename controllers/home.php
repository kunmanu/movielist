<?php
include_once '../autoload.php';

if (!isConnected()){
    header('Location: ' . buildUrl('login'));
    exit;
}





$script =  includeJavascript(['main', "ajax"]);

$template = 'home';
include '../templates/base.phtml';
