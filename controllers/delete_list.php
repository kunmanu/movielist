<?php
include_once '../autoload.php';

//$data = json_decode(file_get_contents('php://input'), true);
$data = $_GET;

if (empty($data['id_list'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'missing list id']);
    exit;
}
$idList = $data['id_list'];

$listModel = new ListModel();
$listModel ->deleteList($idList);


echo json_encode(['success' => true,'id' => $idList]);
exit;

