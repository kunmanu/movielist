drop database if exists movielist;
create database movielist;

use movielist;

CREATE TABLE movie (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    createdAt datetime
);