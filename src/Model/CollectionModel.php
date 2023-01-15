<?php

include_once "../src/core/AbstractModel.php";
include_once "../src/core/SqlConstants.php";
require_once '../lib/functions.php';

class CollectionModel extends AbstractModel {

    function getAllCollectionWithMoviesFromUser($user){
        $collections=$this->getAllCollectionsFromUser($user);
        $collectionsWithMovies = [];
        foreach ($collections as $collection) {
            $movies = $this->getMoviesFromCollection($collection['idCollection']);
            $collection['movies'] = $movies;
            array_push($collectionsWithMovies, $collection);

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

    function getAllCollectionWithMovies()
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



    function createCollection(string $name, string $user, $isFavorite = null, $userText = null)
    {
        $sql = SqlConstants::COLLECTIONS_SQL_ADD_COLLECTION;
        $this->db->executeQuery($sql, [$name, $user, $isFavorite, $userText]);
    }


    function deleteCollection(string $idCollection)
    {
        $sql = SqlConstants::COLLECTIONS_SQL_DELETE_COLLECTION;
        $this->db->executeQuery($sql, [$idCollection]);
        $this ->deleteCollectionlessMovies();
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

    public function deleteMovieFromCollection($idCollection, $idMovie)
    {

        $sql = SqlConstants::MOVIE_COLLECTIONS_SQL_DELETE_MOVIE_COLLECTION;
        $params = [$idCollection,$idMovie];
        $this->db->executeQuery($sql, $params);
        $this ->deletecollectionlessMovies();

    }

    public function editCollection(string $idCollection, string $collection_name, $userId = null, $isFavorite = null, $createdAt = null, $userText = null) {
        $sql = SqlConstants::COLLECTIONS_SQL_UPDATE_COLLECTION;
        $this->db->executeQuery($sql, [$collection_name, $userId, $isFavorite, $userText, $idCollection]);
    }

    public function getOneCollection(string $idCollection) {

        $sql = SqlConstants::COLLECTIONS_SQL_GET_COLLECTION_BY_ID;

        return $this->db->getOneResult($sql, [$idCollection]);
    }




}


