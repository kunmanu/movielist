<?php

//namespace MyProject\Model;
include_once "../src/core/AbstractModel.php";
class UserModel extends AbstractModel {

    function getConnectedUser()

    {

    }

    function getUserById(int $id)
    {
        $sql = 'SELECT idUser, firstname, lastname, email, createdAt, role
                FROM user
                WHERE idUser = ?';

        // Récupération d'UN SEUL résultat : un seul utilisateur possède cet email
        return $this->db->getOneResult($sql, [$id]);

    }


    function getUserByEmail(string $email) 
    {
        // Préparation de la requête
        $sql = 'SELECT *
                FROM user
                WHERE email = ?';

        // Récupération d'UN SEUL résultat : un seul utilisateur possède cet email
        return $this->db->getOneResult($sql, [$email]);
    }


    function addUser(string $firstname, string $lastname, string $email, string $role, string $hash)
    {
        $sql = 'INSERT INTO user (firstname, lastname, email, role, hash, createdAt)
                VALUES (?,?,?,?,?,NOW())';

        $this->db->executeQuery($sql, [$firstname, $lastname, $email, $role, $hash]);
    }
    function checkUser(string $email, string $password)
    {
        // On récupère l'utilisateur à partir de son email

        $user = $this->getUserByEmail($email);

        // Si on trouve bien un utilisateur...
        if ($user) {

            // On vérifie son mot de passe
            if (password_verify($password, $user['hash'])) {

                // Tout est ok, on retourne l'utilisateur
                return $user;
            }
        }

        // Si l'email ou le mot de passe est incorrect...
        return false;
    }
}