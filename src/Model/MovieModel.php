<?php
include_once "../src/core/AbstractModel.php";
require_once '../lib/functions.php';



class MovieModel extends AbstractModel{

    function addMovie(string $title)
    {
        $sql = 'INSERT INTO movies (title, createdAt)
                VALUES (?,NOW())';

        $this->db->executeQuery($sql, [$title]);
    }
    function addMovieIntoList(string $title, $listId)
    {
        $sql = "START TRANSACTION;
                INSERT INTO movies (title, createdAt) VALUES (?, NOW());
                INSERT INTO movies_lists (movie_id, list_id) VALUES (LAST_INSERT_ID(), ?);
                COMMIT;";
        $this->db->executeQuery($sql, [$title,$listId]);

    }



}