SET FOREIGN_KEY_CHECKS = 0;



TRUNCATE Users;

INSERT INTO Users (pseudonym, email, hash, createdAt, role)
VALUES ('admin', 'admin@admin.ad', '$2a$12$C1lAEN9md/exmC4hnE.4te/vnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'ADMIN'),
       ('Maud ', 'Maud@gmail.com', '$2a$12$C1lAEN9md/exmC4hnE.4te/vnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER'),
       ('Pearl ', 'Pearl@gmail.com', '$2a$12$C1lAEN9md/exmC4hnE.4te/vnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER'),
       ('Giles ', 'Giles@gmail.com', '$2a$12$C1lAEN9md/exmC4hnE.4te/vnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER');





INSERT INTO Movies (title, summary, poster, releaseYear, genres, internetRating, userRating, createdAt, userId)
VALUES ('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'shawshank.jpg', 1994, 'Drama', 9, 8, NOW(), 1),
       ('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'godfather.jpg', 1972, 'Crime', 9, 8, NOW(), 1),
       ('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the Dark Knight must come to terms with one of the greatest psychological tests of his ability to fight injustice.', 'darkknight.jpg', 2008, 'Action', 9, 9, NOW(), 2),
       ('12 Angry Men', 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.', '12angrymen.jpg', 1957, 'Drama', 8, 8, NOW(), 1),
       ('Schindler''s List', 'In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 'schindlerslist.jpg', 1993, 'Drama', 8, 7, NOW(), 2),
       ('The Lord of the Rings: The Return of the King', 'Gandalf and Aragorn lead the World of Men against Sauron''s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', 'lotr3.jpg', 2003, 'Action', 9, 9, NOW(), 1),
       ('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster''s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'pulpfiction.jpg', 1994, 'Crime', 9, 8, NOW(), 2),
       ('The Good, the Bad and the Ugly', 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', 'goodbadugly.jpg', 1966, 'Western', 8, 8, NOW(), 1),
       ('Forrest Gump', 'Forrest Gump, a man with a low IQ, joins the US Army during the Vietnam War and finds himself in the middle of history''s most important events.', 'forrestgump.jpg', 1994, 'Drama', 8, 8, NOW(), 2),
       ('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', 'inception.jpg', 2010, 'Action', 9, 9, NOW(), 1),
       ('Star Wars: Episode IV - A New Hope', 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire''s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.', 'starwars1.jpg', 1977, 'Science Fiction', 9, 8, NOW(), 2);







truncate Collections;


INSERT INTO Collections (title, userId,  createdAt, userText)
VALUES ('My Favorite Movies', 1, NOW(), 'These are my all-time favorite movies'),
       ('My Must-Watch List', 2,NOW(), 'Movies I need to watch'),
       ('Best Director Oscar Winners', 2,  NOW(), 'Movies that have won the Best Director Oscar'),
       ('Best Picture Oscar Winners', 1,  NOW(), 'My favorite movies that have won the Best Picture Oscar'),
       ('Comedy Classics', 2,  NOW(), 'Some of the best comedy movies of all time'),
       ('Science Fiction Must-Sees', 1, NOW(), 'Science fiction movies that I need to see'),
       ('Black and White Classics', 2, NOW(), 'Classic movies in black and white'),
       ('Top Grossing Movies of All Time', 1, NOW(), 'The highest-grossing movies of all time'),
       ('Indie Gems', 2, NOW(), 'Great independent films'),
       ('Film Noir', 1,  NOW(), 'Movies in the film noir genre');


INSERT INTO MovieCollections (movieId, collectionId)
SELECT idMovie, idCollection FROM Movies JOIN Collections ON Movies.userId = Collections.userId;





SET FOREIGN_KEY_CHECKS = 1;
