drop database if exists movielist;
create database movielist;

use movielist;


CREATE TABLE `user` (
    `idUser` integer primary key auto_increment not null,
    `firstname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `lastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `hash` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
    `createdAt` datetime NOT NULL,
    `role` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
);



CREATE TABLE movies (
    id_movie INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    createdAt datetime
);


CREATE TABLE lists (
    id_list INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_user VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    createdAt datetime
);


CREATE TABLE movies_lists (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    movie_id INTEGER NOT NULL,
    list_id INTEGER NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id_movie),
    FOREIGN KEY (list_id) REFERENCES lists(id_list)
        ON DELETE CASCADE
);