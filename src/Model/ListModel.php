<?php

include_once "../src/core/AbstractModel.php";
require_once '../lib/functions.php';

class ListModel extends AbstractModel {


    function createList(string $name, string $user = 'user' )
    {
        $sql = 'INSERT INTO lists (id_user, name, createdAt)
                VALUES (?,?,NOW())';

        $this->db->executeQuery($sql, [$user,$name]);
    }

    function deleteList(string $idList)
    {
        $sql = 'DELETE FROM lists WHERE id_list = ?;';
        $this->db->executeQuery($sql, [$idList]);
        $this ->deleteListlessMovies();
    }

    function getAllList(): bool|array
    {
        $sql = 'SELECT *
                FROM lists AS L
                ORDER BY L.createdAt DESC';

        return $this->db->getAllResults($sql);
    }

    function getMoviesFromList($list_id)
    {
        $sql = "SELECT * FROM movies m
                INNER JOIN movies_lists ml ON m.id_movie = ml.movie_id
                WHERE ml.list_id = ?";

        return $this->db->getAllResults($sql, [$list_id]);

    }

    function getAllListWithMovies(){
        $lists=$this->getAllList();
        // why do  i need to pass &$list by references ?
        foreach ($lists as &$list) {
            $movies = $this->getMoviesFromList($list['id_list']);
            $list['movies'] = $movies;
        }
        return $lists;
    }
    function deleteListlessMovies(){
        $sql = 'DELETE m
                FROM movies m
                LEFT JOIN movies_lists ml ON m.id_movie = ml.movie_id
                WHERE ml.movie_id IS NULL;';
        $this->db->executeQuery($sql);
    }
    public function deleteMovieFromList($idList, $idMovie)
    {

        $sql = 'DELETE FROM movies_lists WHERE movie_id = ? AND list_id = ?';
        $params = [$idMovie, $idList];
        $this->db->executeQuery($sql, $params);
        $this ->deleteListlessMovies();

    }

    public function editList(string $id_list, string $list_name) {
        $sql = 'UPDATE lists SET name = ? WHERE id_list = ?';
        $this->db->executeQuery($sql, [$list_name, $id_list]);
    }

}


