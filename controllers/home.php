<?php
require_once '../autoload.php';

$listModel = new ListModel();
$lists = $listModel ->getAllList();

var_dump($lists);
$template = 'home';
include '../templates/base.phtml';
