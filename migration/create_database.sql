drop database if exists movietheque;
create database movietheque;

use movietheque;

CREATE TABLE Users (
    `idUser` integer primary key auto_increment not null,
    `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `hash` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `createdAt` datetime NOT NULL,
    `role` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
);



CREATE TABLE Movies (
    idMovie INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    summary varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    poster varchar(1000) COLLATE utf8mb4_unicode_ci,
    releaseYear varchar(255) COLLATE utf8mb4_unicode_ci,
    genres VARCHAR(255),
    internetRating TINYINT unsigned,
    userRating TINYINT unsigned,
    createdAt datetime,
    userId int not null,
        foreign key (userId) references Users(idUser)
);





CREATE TABLE Collections (
    idCollection INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    userId integer NOT NULL,
    createdAt datetime,
    userText varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        FOREIGN KEY (userId) REFERENCES Users(idUser)

);


CREATE TABLE MovieCollections (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    movieId INTEGER NOT NULL,
    collectionId INTEGER NOT NULL,
    FOREIGN KEY (movieId) REFERENCES Movies(idMovie),
    FOREIGN KEY (collectionId) REFERENCES Collections(idCollection)
        ON DELETE CASCADE
);