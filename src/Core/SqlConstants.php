<?php

class SqlConstants
{
    //users table
    const USERS_SQL_GET_USER_BY_ID = 'SELECT * FROM Users WHERE idUser = ?';
    const USERS_SQL_GET_USER_BY_EMAIL = 'SELECT * FROM Users WHERE email = ?';
    const USERS_SQL_ADD_USER = 'INSERT INTO Users (pseudonym, email, hash, createdAt, role) VALUES (?,?,?,NOW(),?)';
    const USERS_SQL_UPDATE_USER = 'UPDATE Users SET pseudonym = ?, email = ?, hash = ?, createdAt = NOW(), role = ? WHERE idUser = ?';
    const USERS_SQL_DELETE_USER = 'DELETE FROM Users WHERE idUser = ?';
    const USERS_SQL_GET_ALL_USERS = 'SELECT * FROM Users';
    const USERS_SQL_GET_USERS_COUNT = 'SELECT COUNT(idUser) FROM Users';




    // movies table
    const MOVIES_SQL_GET_MOVIE_BY_ID = 'SELECT * FROM Movies WHERE idMovie = ?';
    const MOVIES_SQL_GET_ALL_MOVIES = 'SELECT * FROM Movies';
//    const MOVIES_SQL_ADD_MOVIE = 'INSERT INTO Movies (title, summary, poster, releaseYear, internetRating, userRating, userText, isFavorite, createdAt, userId) VALUES (?,?,?,?,?,?,?,?,NOW(),?)';
    const MOVIES_SQL_UPDATE_MOVIE =
        'UPDATE Movies 
    SET title = ?, 
        summary = ?, 
        poster = ?, 
        releaseYear = ?, 
        userRating = ?, 
        createdAt = NOW() 
    WHERE idMovie = ?';



    const MOVIES_SQL_DELETE_MOVIE = 'DELETE FROM Movies WHERE idMovie = ?';
    const MOVIES_SQL_GET_MOVIES_COUNT = 'SELECT COUNT(idMovie) FROM Movies';

    const COLLECTION_SQL_DELETE_COLLECTIONLESS_MOVIES = 'DELETE m FROM Movies m LEFT JOIN MovieCollections mc ON m.idMovie = mc.movieId WHERE mc.movieId IS NULL';


    const MOVIE_SQL_ADD_MOVIE =
        "INSERT INTO movies (title, summary, poster, releaseYear, genres, internetRating, userRating, createdAt, userId) 
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)";






    // collections table
    const COLLECTIONS_SQL_GET_COLLECTION_BY_ID =
        'SELECT * FROM Collections WHERE idCollection = ?';
    const COLLECTIONS_SQL_GET_ALL_COLLECTIONS =
        'SELECT * FROM Collections';
    const COLLECTIONS_SQL_ADD_COLLECTION =
        'INSERT INTO Collections (title, userId, createdAt, userText) VALUES (?,?,NOW(),?)';
    const COLLECTIONS_SQL_UPDATE_COLLECTION = '
            UPDATE Collections 
            SET title = ?, 
                createdAt = NOW(), 
                userText = ? 
            WHERE idCollection = ? 
';


    const COLLECTION_SQL_GET_MOVIES_FROM_COLLECTION = 'SELECT * FROM Movies m INNER JOIN MovieCollections mc ON m.idMovie = mc.movieId WHERE mc.collectionId = ? ORDER BY createdAt DESC';

//    const COLLECTION_SQL_GET_ALL_COLLECTIONS_FROM_USER = 'SELECT * FROM Collections WHERE userId = ?';
    const COLLECTION_SQL_GET_ALL_COLLECTIONS_FROM_USER = 'SELECT * FROM Collections WHERE userId = ? ORDER BY createdAt DESC';


    const COLLECTIONS_SQL_DELETE_COLLECTION = 'DELETE FROM Collections WHERE idCollection = ?';
    const COLLECTIONS_SQL_GET_COLLECTIONS_COUNT = 'SELECT COUNT(idCollection) FROM Collections';

    // movie_collections table
    const MOVIE_COLLECTIONS_SQL_GET_BY_MOVIE_ID = 'SELECT * FROM MovieCollections WHERE movieId = ?';
    const MOVIE_COLLECTIONS_SQL_GET_BY_COLLECTION_ID = 'SELECT * FROM MovieCollections WHERE collectionId = ?';


    const MOVIE_COLLECTIONS_SQL_ADD_MOVIE_COLLECTION = "INSERT INTO moviecollections (movieId, collectionId) VALUES (?, ?)";

    const MOVIE_COLLECTIONS_SQL_DELETE_MOVIE_COLLECTION = 'DELETE FROM MovieCollections WHERE collectionId = ? AND movieId = ?';

    const MOVIE_COLLECTIONS_SQL_DELETE_BY_MOVIE_ID = 'DELETE FROM MovieCollections WHERE movieId = ?';
}
