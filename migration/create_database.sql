DROP DATABASE IF EXISTS movietheque;
CREATE DATABASE movietheque
    CHARACTER SET utf8
    COLLATE utf8_general_ci;;

USE movietheque;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    role VARCHAR(32) NOT NULL
);

CREATE TABLE Movies (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary VARCHAR(1000) DEFAULT NULL,
    poster VARCHAR(1000),
    release_year VARCHAR(255),
    genres VARCHAR(255),
    internet_rating TINYINT UNSIGNED,
    user_rating TINYINT UNSIGNED,
    created_at DATETIME,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Collections (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    user_text VARCHAR(1000) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE MovieCollections (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    movie_id INT NOT NULL,
    collection_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movies(id),
    FOREIGN KEY (collection_id) REFERENCES Collections(id)
      ON DELETE CASCADE
);
