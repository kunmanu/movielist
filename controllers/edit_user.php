<?php



require_once '../vendor/autoload.php';

$errors = [];

$data = $_GET;
$userID = $_SESSION['user']['id'];

if (empty($data['username']) || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing username or email']);
    exit;
}

$username = strip_tags(trim($data['username']));
$email = strip_tags(trim($data['email']));

try {
    $userModel = new UserModel();
    $result = $userModel->editUser($email, $username, $userID);

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'User edited successfully',
            'username' => $username,
            'email' => $email,
            'id' => $userID
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error editing user']);
    }
    exit;

} catch (Exception $e) {
    error_log('Error editing user: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}
