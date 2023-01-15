<?php
include_once "../src/core/AbstractModel.php";
include_once "../src/core/SqlConstants.php";


class UserModel extends AbstractModel {


    function getUserById(int $id)
    {
        $sql = SqlConstants::USERS_SQL_GET_USER_BY_ID;

        return $this->db->getOneResult($sql, [$id]);

    }

    function getUserByEmail(string $email) 
    {
        $sql = SqlConstants::USERS_SQL_GET_USER_BY_EMAIL;

        return $this->db->getOneResult($sql, [$email]);
    }


    function addUser(string $firstname, string $lastname, string $email, string $role, string $hash)
    {
        $sql = SqlConstants::USERS_SQL_ADD_USER;

        $this->db->executeQuery($sql, [$firstname, $lastname, $email, $role, $hash]);
    }

    function checkUser(string $email, string $password)
    {
        $user = $this->getUserByEmail($email);

        return $user && password_verify($password, $user['hash']) ? $user : false;
    }

}