<?php
require_once '../autoload.php';
session_start();

$listModel = new ListModel();
$lists = $listModel ->getAllList();

var_dump($_SESSION);
$template = 'home';
include '../templates/base.phtml';
