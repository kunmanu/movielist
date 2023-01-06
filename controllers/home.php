<?php
require_once '../autoload.php';
require_once '../lib/functions.php';

$listModel = new ListModel();
$lists = $listModel ->getAllList();


$template = 'home';
include '../templates/base.phtml';
