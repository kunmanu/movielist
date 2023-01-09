<?php
include_once "../src/core/AbstractModel.php";
class UserModel extends AbstractModel {

    /**
     * Retourne un utilisateur à partir de son email
     * @param string $email - L'email de l'utilisateur qu'on cherche
     * @return bool|array - false si l'utilisateur n'est pas trouvé, sinon le tableau associatif contenant les données de l'utilisateur
     */
    function getUserByEmail(string $email) 
    {
        // Préparation de la requête
        $sql = 'SELECT *
                FROM user
                WHERE email = ?';

        // Récupération d'UN SEUL résultat : un seul utilisateur possède cet email
        return $this->db->getOneResult($sql, [$email]);
    }

    /**
     * Ajoute un user
     * @param string $firstname Le prénom de l'utilisateur
     * @param string $lastname Le nom de l'utilisateur
     * @param string $email L'email de l'utilisateur
     * @param string $hash Le mot de passe hashé de l'utilisateur
     * @return void
     */
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