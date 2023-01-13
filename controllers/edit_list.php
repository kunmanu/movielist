<?php


require_once '../autoload.php';

$errors = [];

$data = $_GET;



$id_list = strip_tags(trim($data['id_list']));
$list_name = strip_tags(trim($data['list_name']));


if (!$id_list or !$list_name) {
    $errors = 'error';
}

if (empty($errors)) {
    $listModel = new ListModel();
    $listModel->editList($id_list, $list_name);
    echo json_encode([
        'success' => true,
        "message" => "List edited successfully",
        'name' => $list_name,
        'id_list' => $id_list

            ]);
} else {
    echo json_encode(["message" => "Error editing movie"]);
}



//TODO: use PUT method