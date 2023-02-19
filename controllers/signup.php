<?php
include_once '../autoload.php';

// Initializations
$errors = [];
$username = '';
$email = '';

// Create UserModel object
$userModel = new UserModel();

// If the form is submitted...
if (!empty($_POST)) {

    // Get form data
    $username = strip_tags(trim($_POST['username']));
    $email = strip_tags(trim($_POST['email']));
    $password = $_POST['password'];
    $passwordConfirm = $_POST['password-confirm'];

    // Validate data (username and email are required)
    if (!strlen($username)) {
        $errors['username'] = 'The "Username" field is required';
    }

    if (!strlen($email)) {
        $errors['email'] = 'The "Email" field is required';
    }
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email';
    }
    elseif ($userModel->getUserByEmail($email)) {
        $errors['email'] = 'An account already exists with this email';
    }

    if (strlen($password) < 8) {
        $errors['password'] = 'Password must be at least 8 characters long';
    }
    elseif ($password != $passwordConfirm) {
        $errors['password-confirm'] = 'Password confirmation does not match';
    }

    // If everything is OK (no errors)...
    if (empty($errors)) {

        // Hash password
        $hash = password_hash($password, PASSWORD_DEFAULT);

        // Register user
        $userModel->addUser($username, $email,'USER', $hash);

        // Redirect user (for now to a confirmation page)
        header('Location: ' . buildUrl('home'));

        exit;
    }
}

$script =  includeJavascript(['main']);
$template = 'signup';
include "../templates/base.phtml";
