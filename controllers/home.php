<?php
require_once '../autoload.php';


$listModel = new ListModel();
$lists = $listModel ->getAllList();


$template = 'home';
include '../templates/base.phtml';
