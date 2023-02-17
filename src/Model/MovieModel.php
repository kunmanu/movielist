<?php

include_once "../src/core/AbstractModel.php";
include_once "../src/core/SqlConstants.php";
require_once '../lib/functions.php';



class MovieModel extends AbstractModel{

//    function addMovie(
//        string $title,
//               $summary = null,
//               $poster = null,
//               $releaseYear = null,
//               $internetRating = null,
//               $userRating = null,
//               $userText = null,
//               $isFavorite = null,
//    ) {
//        $sql = SqlConstants::MOVIES_SQL_ADD_MOVIE;
//        $this->db->executeQuery(
//            $sql,
//            [
//                $title,
//                $summary,
//                $poster,
//                $releaseYear,
//                $internetRating,
//                $userRating,
//                $userText,
//                $isFavorite
//            ]
//        );
//    }


//    public function addMovieIntoCollection(
//        string $title,
//        int $collectionId,
//        int $userId,
//        string|null $summary = null,
//        string|null $poster = null,
//        int|null $releaseYear = null,
//        int|null $internetRating = null,
//        string|null $userRating = null,
//        string|null $userText = null,
//        int|null $isFavorite = null
//    ) {
//        $sql = SqlConstants::MOVIE_COLLECTIONS_SQL_ADD_MOVIE_INTO_COLLECTION;
//
//        $stmt = $this->db->executeQuery(
//            $sql,
//            [
//                $title,
//                $summary,
//                $poster,
//                $releaseYear,
//                $internetRating,
//                $userRating,
//                $userText,
//                $isFavorite,
//                $userId,
//                $collectionId
//            ]
//        );
//        $stmt->closeCursor();
//        $insertId = $this->db->getPDO()->lastInsertId();
//
//        $insert = $this->getOneMovie($insertId);
//        dump($insertId);
//        dump($insert);
//        return $insert;
//    }


    public function addMovieIntoCollection(
        string $title,
        int $collectionId,
        int $userId,
        string|null $summary = null,
        string|null $poster = null,
        string|null $releaseYear = null,
        string|null $genres = null,
        string|null $internetRating = null,
        string|null $userRating = null,
    ) {

        $sql = SqlConstants::MOVIE_SQL_ADD_MOVIE;
        $stmt = $this->db->executeQuery(
            $sql,
            [
                $title,
                $summary,
                $poster,
                $releaseYear,
                $genres,
                $internetRating,
                $userRating,
                $userId,
            ]
        );
        $insertId = $this->db->getPDO()->lastInsertId();

        // Insert relationship between movie and collection into moviecollections table
        $sql2 = SqlConstants::MOVIE_COLLECTIONS_SQL_ADD_MOVIE_COLLECTION;
        $stmt = $this->db->executeQuery($sql2, [$insertId, $collectionId]);

        //        dump($insertId);
//        dump($insert);
        return $this->getOneMovie($insertId);
    }



    public function getOneMovie($idMovie)
    {
        $sql = SqlConstants::MOVIES_SQL_GET_MOVIE_BY_ID;

        return $this->db->getOneResult($sql,[$idMovie]);
    }


    public function editMovie(
        int $idMovie,
        string $title ,
        string $summary ,
        string $poster ,
        string $releaseYear ,
        int $userRating ,

    ): bool
    {
        try {
            if (empty($idMovie)) {
                throw new Exception("Missing movie id");
            }
            $sql = SqlConstants::MOVIES_SQL_UPDATE_MOVIE;
            $params = [
                $title,
                $summary,
                $poster,
                $releaseYear,
//                $internetRating,
                $userRating,
                $idMovie
            ];
            $this->db->executeQuery($sql, $params);
            return true;
        } catch (Exception $e) {
            error_log('Error editing movie $ ' . $e->getMessage());
            return false;
        }
    }






    function deleteMovie(int $id): bool
    {
        try {
            // Delete records from movies_collections table that have a movie_id value that references the movie
            $sql = SqlConstants::MOVIE_COLLECTIONS_SQL_DELETE_BY_MOVIE_ID;
            $stmt = $this->db->executeQuery($sql, [$id]);
            $count1 = $stmt->rowCount();
            // Delete movie from movies table
            $sql = SqlConstants::MOVIES_SQL_DELETE_MOVIE;
            $stmt = $this->db->executeQuery($sql, [$id]);
            $count2 = $stmt->rowCount();
            return $count1 > 0 && $count2 > 0;
        } catch (Exception $e) {
            error_log('Error deleting movie: ' . $e->getMessage());
            return false;
        }
    }


}