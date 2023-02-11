<?php

include_once "../src/core/AbstractModel.php";
include_once "../src/core/SqlConstants.php";
require_once '../lib/functions.php';

class CollectionModel extends AbstractModel {

    function getAllCollectionWithMoviesFromUser($user): array
    {
        $collections = $this->getAllCollectionsFromUser($user);
        $collectionsWithMovies = [];
        foreach ($collections as $collection) {
            $movies = $this->getMoviesFromCollection($collection['idCollection']);
            $collection['movies'] = $movies;
            $collectionsWithMovies[] = $collection;
        }
        return $collectionsWithMovies;
    }

    public function getAllCollectionsFromUser(int $userId): bool|array
    {
        $sql = SqlConstants::COLLECTION_SQL_GET_ALL_COLLECTIONS_FROM_USER;

        return $this->db->getAllResults($sql, [$userId]);
    }

    function getMoviesFromCollection($idCollection): bool|array
    {
        $sql = SqlConstants::COLLECTION_SQL_GET_MOVIES_FROM_COLLECTION;

        return $this->db->getAllResults($sql, [$idCollection]);
    }

    function getAllCollectionWithMovies(): array
    {
        $collections=$this->getAllcollection();
        $collectionsWithMovies = [];
        foreach ($collections as $collection) {
            $movies = $this->getMoviesFromCollection($collection['idCollection']);
            $collection['movies'] = $movies;
            $collectionsWithMovies[] = $collection;
        }
        return $collectionsWithMovies;

    }


    function createCollection(
        string $title,
        string $user,
               $isFavorite = null,
               $description = null
    ): array
    {
        $sql = SqlConstants::COLLECTIONS_SQL_ADD_COLLECTION;
        try {
            $this->db->executeQuery(
                $sql,
                [
                    $title,
                    $user,
                    $isFavorite,
                    $description
                ]
            );


            $insertId = $this->db->getPDO()->lastInsertId();
            $insert =  $this->getOneCollection($insertId);
            $movies = $this -> getMoviesFromCollection($insertId);
            $insert['movies'] = $movies;
            return $insert;
        } catch (\Exception $e) {
            // log the error message
            dump($e->getMessage());

            return [] ;
        }
    }




    function deleteCollection(string $idCollection): bool
    {
        $sql = SqlConstants::COLLECTIONS_SQL_DELETE_COLLECTION;
        $stmt = $this->db->executeQuery($sql, [$idCollection]);
        $this->deleteCollectionlessMovies();
        return $stmt->rowCount()>0;
    }



    function getAllCollection(): bool|array
    {
        $sql = SqlConstants::COLLECTIONS_SQL_GET_ALL_COLLECTIONS;
        return $this->db->getAllResults($sql);
    }


    function deleteCollectionlessMovies(){
        $sql = SqlConstants::COLLECTION_SQL_DELETE_COLLECTIONLESS_MOVIES;
        $this->db->executeQuery($sql);
    }

/*    public function deleteMovieFromCollection($idCollection, $idMovie)
    {

        $sql = SqlConstants::MOVIE_COLLECTIONS_SQL_DELETE_MOVIE_COLLECTION;
        $params = [$idCollection,$idMovie];
        $this->db->executeQuery($sql, $params);
        $this ->deletecollectionlessMovies();

    }*/

    public function deleteMovieFromCollection(int $idCollection, int $idMovie): bool
    {
        try {
            $sql = SqlConstants::MOVIE_COLLECTIONS_SQL_DELETE_MOVIE_COLLECTION;
            $params = [$idCollection, $idMovie];
            $stmt = $this->db->executeQuery($sql, $params);
            $this->deletecollectionlessMovies();
            return true;
        } catch (\PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }



/*    public function editCollection(
        string $idCollection,
        string $collection_name,
               $userId = null,
               $isFavorite = null,
               $userText = null
    ) {
        $sql = SqlConstants::COLLECTIONS_SQL_UPDATE_COLLECTION;
        $this->db->executeQuery(
            $sql,
            [
                $collection_name,
                $userId,
                $isFavorite,
                $userText,
                $idCollection
            ]
        );
    }*/

    public function editCollection(
        string $idCollection,
        string $collectionName,
               $userId = null,
               $isFavorite = null,
               $userText = null
    ): bool {
        try {
            $sql = SqlConstants::COLLECTIONS_SQL_UPDATE_COLLECTION;
            $params = [
                $collectionName,
                $userId,
                $isFavorite,
                $userText,
                $idCollection
            ];
            $this->db->executeQuery($sql, $params);
            return true;
        } catch (Exception $e) {
            error_log('Error editing collection: ' . $e->getMessage());
            return false;
        }
    }




    public function getOneCollection(string $idCollection) { 

        $sql = SqlConstants::COLLECTIONS_SQL_GET_COLLECTION_BY_ID;

        return $this->db->getOneResult($sql, [$idCollection]);
    }



}


