<?php
include_once "../src/core/AbstractModel.php";
include_once "../src/core/SqlConstants.php";


class UserModel extends AbstractModel {
    function deleteUser(int $id) {
        $sql = SqlConstants::USERS_SQL_DELETE_USER;

        $this->db->executeQuery($sql, [$id]);
    }


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


    function addUser(
        string $username,
        string $email,
        string $role,
        string $hash
    ) {
        $sql = SqlConstants::USERS_SQL_ADD_USER;

        $this->db->executeQuery(
            $sql,
            [
                $username,
                $email,
                $hash,
                $role
            ]
        );
    }


    function checkUser(string $email, string $password)
    {
        $user = $this->getUserByEmail($email);

        return $user && password_verify($password, $user['hash']) ? $user : false;
    }


    function editUser ($email, $username, $userID)
    {
        $sql = SqlConstants::USERS_SQL_UPDATE_USER;

        $this->db->executeQuery($sql,[$email, $username,  $userID]);

        return $this->getUserById($userID);
    }

    function getAllUsers(): bool|array
    {
        $sql = SqlConstants::USERS_SQL_GET_ALL_USERS;

        return $this->db->getAllResults($sql);
    }


}