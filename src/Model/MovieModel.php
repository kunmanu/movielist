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

    public function deleteMovieFromList($idList, $idMovie)
    {
//        $sql = "DELETE FROM movies_lists
//                WHERE movie_id = ? AND list_id = ?;";
//
//
//        $this->db->executeQuery($sql, [$idMovie, $idList]);


        $sql = 'DELETE FROM movies_lists WHERE movie_id = ? AND list_id = ?';
        $params = [$idMovie, $idList];
        $stmt = $this->db->executeQuery($sql, $params);
        $error = $stmt->errorInfo();
//        dump($error);



    }


public function getOneMovie($idMovie)
{
    $sql = "SELECT * FROM movies WHERE id_movie = ? LIMIT 1;";

    return $this->db->getOneResult($sql,[$idMovie]);
}


}