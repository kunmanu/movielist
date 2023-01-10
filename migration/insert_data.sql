
SET FOREIGN_KEY_CHECKS = 0;

truncate user;
INSERT INTO `user` ( `firstname`, `lastname`, `email`, `hash`, `createdAt`, `role`) VALUES
    ('admin', 'Dupont', 'adming@admin.ad', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'ADMIN'),
    ('Maud ', 'Sharpe', 'Maud@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER'),
    ('Pearl ', 'French', 'Pearl@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER'),
    ('Giles ', 'Beck', 'Giles@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER');


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
    ('1', 'Favorites', NOW()),
    ('1', 'To Watch', NOW()),
    ('1', 'Watched', NOW()),
    ('2', 'Comedies', NOW()),
    ('2', 'Dramas', NOW()),
    ('2', 'Thrillers', NOW()),
    ('2', 'Sci-Fi', NOW());

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