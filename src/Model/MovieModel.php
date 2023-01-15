<?php

include_once "../src/core/AbstractModel.php";
include_once "../src/core/SqlConstants.php";
require_once '../lib/functions.php';



class MovieModel extends AbstractModel{

    function addMovie(string $title, $summary = null, $poster = null, $releaseYear = null, $internetRating = null, $userRating = null, $userText = null, $isFavorite = null)
    {
        $sql = SqlConstants::MOVIES_SQL_ADD_MOVIE;
        $this->db->executeQuery($sql, [$title, $summary, $poster, $releaseYear, $internetRating, $userRating, $userText, $isFavorite]);
    }


    public function addMovieIntoCollection(string $title, int $collectionId, int $userId,  $summary = null, $poster = null, $releaseYear = null, $internetRating = null, $userRating = null, $userText = null, $isFavorite = null)
    {
        $sql = SqlConstants::MOVIE_COLLECTIONS_SQL_ADD_MOVIE_INTO_COLLECTION;

        $stmt = $this->db->executeQuery($sql, [$title, $summary, $poster, $releaseYear, $internetRating, $userRating, $userText, $isFavorite, $userId, $collectionId]);

        $errors = $stmt->errorInfo();
        var_dump($errors);

    }





    public function getOneMovie($idMovie)
    {
        $sql = SqlConstants::MOVIES_SQL_GET_MOVIE_BY_ID;

        return $this->db->getOneResult($sql,[$idMovie]);
    }


    public function editMovie(int $id, string $title = null, string $summary = null, string $poster = null, int $releaseYear = null, int $internetRating = null, int $userRating = null, string $userText = null, bool $isFavorite = null)
    {
        $sql = SqlConstants::MOVIES_SQL_UPDATE_MOVIE;
        $params = [$title, $summary, $poster, $releaseYear, $internetRating, $userRating, $userText, $isFavorite, $id];
        $this->db->executeQuery($sql, $params);
    }


    function deleteMovie(int $id)
    {
        // Delete records from movies_collections table that have a movie_id value that references the movie
        $sql = SqlConstants::MOVIE_COLLECTIONS_SQL_DELETE_BY_MOVIE_ID;
        $this->db->executeQuery($sql, [$id]);

        // Delete movie from movies table
        $sql = SqlConstants::MOVIES_SQL_DELETE_MOVIE;
        $this->db->executeQuery($sql, [$id]);
    }



}