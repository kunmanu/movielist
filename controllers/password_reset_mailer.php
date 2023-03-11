<?php
include_once '../vendor/autoload.php';
include_once '../app/config.php';

$email = $_POST['email'];
var_dump($email);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;


$mail = new PHPMailer(true);

$mail -> isSMTP();
$mail-> SMTPAuth = true;

$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->Username = 'dev219610@gmail.com';
$mail->Password = SMTP_PASS;
$mail->setFrom('dev219610@gmail.com', 'Movietheque');
$mail->addAddress($email);
$mail->Subject = 'Password Reset Link';

$reset_link = '';

$mail->Body = "You recently requested to reset your password.\n\n";
$mail->Body .= "Click the link below to reset your password:\n\n";
$mail->Body .= $reset_link;

$mail ->send();


