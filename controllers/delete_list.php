<?php
include_once '../autoload.php';

$data = json_decode(file_get_contents('php://input'), true);


if (empty($data['idList'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing list id']);
    exit;
}
$idList = $data['idList'];

$listModel = new ListModel();
$listModel ->deleteList($idList);


echo json_encode(['success' => true,'id' => $idList]);
exit;

