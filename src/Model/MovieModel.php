<?php
include_once "../src/core/AbstractModel.php";



class MovieModel extends AbstractModel{

    function addMovie(string $title)
    {
        $sql = 'INSERT INTO movies (title, createdAt)
                VALUES (?,NOW())';

        $this->db->executeQuery($sql, [$title]);
    }


    function getMovieFromList($list_id){
        $sql = "SELECT m.title FROM movies m
                INNER JOIN movies_lists ml ON m.id_movie = ml.movie_id
                WHERE ml.list_id = ?";

        return $this->db->getAllResults($sql, [$list_id]);
    }

}