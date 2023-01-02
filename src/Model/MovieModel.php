<?php
include "../src/core/AbstractModel.php";
class MovieModel extends AbstractModel{

    function addMovie(string $title)
    {
        $sql = 'INSERT INTO movie (title, createdAt)
                VALUES (?,NOW())';

        $this->db->executeQuery($sql, [$title]);
    }

}