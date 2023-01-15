SET FOREIGN_KEY_CHECKS = 0;

truncate Users;
INSERT INTO Users ( pseudonym, email, hash, createdAt, role) VALUES
     ('admin', 'admin@admin.ad', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'ADMIN'),
     ('Maud ', 'Maud@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER'),
     ('Pearl ', 'Pearl@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER'),
     ('Giles ', 'Giles@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER');


truncate Movies ;
INSERT INTO Movies (title, createdAt, userId) VALUES
    ('The Shawshank Redemption', NOW(), 1),
    ('The Godfather', NOW(), 1),
    ('The Godfather: Part II', NOW(), 1),
    ('The Dark Knight', NOW(), 1),
    ('12 Angry Men', NOW(), 1),
    ('Schindler''s Collection', NOW(), 1),
    ('Pulp Fiction', NOW(), 1),
    ('The Good, the Bad and the Ugly', NOW(), 1),
    ('The Lord of the Rings: The Return of the King', NOW(), 1),
    ('Fight Club', NOW(), 1),
    ('Forrest Gump', NOW(), 1),
    ('Inception', NOW(), 1),
    ('The Matrix', NOW(), 1),
    ('The Silence of the Lambs', NOW(), 1),
    ('One Flew Over the Cuckoo''s Nest', NOW(), 1),
    ('Goodfellas', NOW(), 1),
    ('The Green Mile', NOW(), 1),
    ('Interstellar', NOW(), 1),
    ('The Prestige', NOW(), 1);

truncate Collections;
INSERT INTO Collections (title, userId, createdAt) VALUES
    ('Favorites', 1, NOW()),
    ('To Watch', 1, NOW()),
    ('Watched', 1, NOW()),
    ('Comedies', 2, NOW()),
    ('Dramas', 2, NOW()),
    ('Thrillers', 2, NOW()),
    ('Sci-Fi', 2, NOW());


INSERT INTO MovieCollections (movieId, collectionId)VALUES
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
