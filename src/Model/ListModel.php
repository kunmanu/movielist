<?php

include_once "../src/core/AbstractModel.php";

class ListModel extends AbstractModel {


    function createList(string $name, string $user = 'user' )
    {
        $sql = 'INSERT INTO lists (user_id, name, createdAt)
                VALUES (?,?,NOW())';

        $this->db->executeQuery($sql, [$user,$name]);
    }

    function getAllList(): bool|array
    {

        $sql = 'SELECT *
                FROM lists AS L
                ORDER BY L.createdAt DESC';

        return $this->db->getAllResults($sql);
    }


}


