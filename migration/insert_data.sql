
SET FOREIGN_KEY_CHECKS = 0;

truncate user;
INSERT INTO `user` (`idUser`, `firstname`, `lastname`, `email`, `hash`, `createdAt`, `role`) VALUES
    (9, 'Alfred', 'Dupont', 'alfred@gmail.com', '$2a$12$C1lAEN9md/exmC4hnE.4te/vnSPS7ekTUMaNLH19AcGIiYEu8bSlq', '2022-05-23 09:07:48', 'ADMIN');


truncate movies ;
INSERT INTO movies (title, createdAt) VALUES
    ('The Shawshank Redemption', NOW()),
    ('The Godfather', NOW()),
    ('The Godfather: Part II', NOW()),
    ('The Dark Knight', NOW()),
    ('12 Angry Men', NOW()),
    ('Schindler''s List', NOW()),
    ('Pulp Fiction', NOW()),
    ('The Good, the Bad and the Ugly', NOW()),
    ('The Lord of the Rings: The Return of the King', NOW()),
    ('Fight Club', NOW()),
    ('Forrest Gump', NOW()),
    ('Inception', NOW()),
    ('The Matrix', NOW()),
    ('The Silence of the Lambs', NOW()),
    ('One Flew Over the Cuckoo''s Nest', NOW()),
    ('Goodfellas', NOW()),
    ('The Green Mile', NOW()),
    ('Interstellar', NOW()),
    ('The Prestige', NOW());
truncate lists;
INSERT INTO lists (id_user, name, createdAt) VALUES
    ('user', 'Favorites', NOW()),
    ('user', 'To Watch', NOW()),
    ('user', 'Watched', NOW()),
    ('user', 'Comedies', NOW()),
    ('user', 'Dramas', NOW()),
    ('user', 'Thrillers', NOW()),
    ('user', 'Sci-Fi', NOW());
truncate movies_lists;
INSERT INTO movies_lists (movie_id, list_id)VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 5),
    (6, 2),
    (7, 2),
    (8, 2),
    (9, 3),
    (10, 3),
    (11, 3),
    (12, 3),
    (13, 6),
    (14, 6),
    (15, 4),
    (16, 7),
    (17, 7),
    (18, 1);

SET FOREIGN_KEY_CHECKS = 1;