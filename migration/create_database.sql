drop database if exists movielist;
create database movielist;

use movielist;

CREATE TABLE movies (
    id_movie INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    createdAt datetime
);


CREATE TABLE lists (
    id_list INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    createdAt datetime
);

CREATE TABLE movies_lists (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    movie_id INTEGER NOT NULL,
    list_id INTEGER NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id_movie),
    FOREIGN KEY (list_id) REFERENCES lists(id_list)
);