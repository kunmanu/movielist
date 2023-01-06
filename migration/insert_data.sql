use movielist;

INSERT INTO movies (title, createdAt) VALUES
    ('The Shawshank Redemption', NOW()),
    ('The Godfather', NOW()),
    ('The Godfather: Part II', NOW()),
    ('The Dark Knight', NOW()),
    ('Pulp Fiction', NOW());

INSERT INTO lists (id_user, name, createdAt) VALUES
    ('user1', 'My Favorite Movies', NOW()),
    ('user2', 'Movies to Watch', NOW()),
    ('user3', 'Action Movies', NOW());

INSERT INTO movies_lists (movie_id, list_id) VALUES
     (1, 1),
     (2, 1),
     (3, 1),
     (4, 1),
     (5, 1),
     (1, 2),
     (2, 2),
     (3, 2),
     (4, 3),
     (5, 3);