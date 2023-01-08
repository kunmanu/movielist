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




    public function getOneMovie($idMovie)
    {
        $sql = "SELECT * FROM movies WHERE id_movie = ? LIMIT 1;";

        return $this->db->getOneResult($sql,[$idMovie]);
    }


    public function editMovie(int $id, string $title)
    {
        $sql = "UPDATE movies SET title = ? WHERE id_movie = ? LIMIT 1;";
        $this->db->executeQuery($sql, [$title, $id]);
    }


}