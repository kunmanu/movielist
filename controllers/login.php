<?php 
include_once '../lib/functions.php';
include_once '../autoload.php';


// Initialisations
$email = '';

// Si le formulaire est soumis...
if (!empty($_POST)) {

    // On récupère les données du formulaire
    $email = $_POST['email'];
    $password = $_POST['password'];

    $userModel = new UserModel();
    $user = $userModel -> checkUser($email, $password);


    // On a trouvé l'utilisateur, les identifiants sont corrects...
    if ($user) {

        // Enregistrement du user en session
        registerUser($user['idUser'], $user['firstname'], $user['lastname'], $user['email'], $user['role']);
    
        // Redirection pour le moment vers la page d'accueil du site
        header('Location: ' . buildUrl('home'));
        exit;
    } 
        
    $error = 'Identifiants incorrects';
}

$script =  includeJavascript(['main', "ajax"]);
$template = 'login';
include "../templates/base.phtml";