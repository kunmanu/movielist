SET FOREIGN_KEY_CHECKS = 0;

truncate Users;
INSERT INTO Users ( pseudonym, email, hash, createdAt, role) VALUES
     ('admin', 'admin@admin.ad', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'ADMIN'),
     ('Maud ', 'Maud@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER'),
     ('Pearl ', 'Pearl@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER'),
     ('Giles ', 'Giles@gmail.com', '$2a$12$C1lAEN9mdexmC4hnE.4tevnSPS7ekTUMaNLH19AcGIiYEu8bSlq', NOW(), 'USER');


truncate Movies ;


INSERT INTO Movies (title, summary, poster, releaseYear, internetRating, userRating, userText, isFavorite, createdAt, userId)
VALUES ('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'shawshank.jpg', 1994, 9, 8, 'Really liked it', 1, NOW(), 1),
       ('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'godfather.jpg', 1972, 9, 8, 'Great movie', 0, NOW(), 1),
       ('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the Dark Knight must come to terms with one of the greatest psychological tests of his ability to fight injustice.', 'darkknight.jpg', 2008, 9, 9, 'Awesome', 1, NOW(), 2),
       ('12 Angry Men', 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.', '12angrymen.jpg', 1957, 8, 8, 'Good movie', 1, NOW(), 1),
       ('Schindler''s List', 'In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 'schindlerslist.jpg', 1993, 8, 7, 'OK movie', 0, NOW(), 2),
       ('The Lord of the Rings: The Return of the King', 'Gandalf and Aragorn lead the World of Men against Sauron''s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', 'lotr3.jpg', 2003, 9, 9, 'Epic', 1, NOW(), 1),
       ('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster''s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'pulpfiction.jpg', 1994, 9, 8, 'Cool movie', 1, NOW(), 2),
       ('The Good, the Bad and the Ugly', 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', 'goodbadugly.jpg', 1966, 8, 8, 'Good movie', 0, NOW(), 1),
       ('Forrest Gump', 'Forrest Gump, a man with a low IQ, joins the US Army during the Vietnam War and finds himself in the middle of history''s most important events.', 'forrestgump.jpg', 1994, 8, 8, 'Nice movie', 1, NOW(), 2),
       ('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', 'inception.jpg', 2010, 9, 9, 'Mind-bending', 1, NOW(), 1),
       ('Star Wars: Episode IV - A New Hope', 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire''s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.', 'starwars1.jpg', 1977, 9, 8, 'Classic', 1, NOW(), 2),
       ('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'matrix.jpg', 1999, 9, 9, 'Mind-blowing', 1, NOW(), 1),
       ('Goodfellas', 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.', 'goodfellas.jpg', 1990, 9, 9, 'Great movie', 1, NOW(), 2),
       ('One Flew Over the Cuckoo''s Nest', 'A criminal pleads insanity after getting into trouble again and once in the mental institution rebels against the oppressive nurse and rallies up the scared patients.', 'cuckoosnest.jpg', 1975, 8, 8, 'Good movie', 0, NOW(), 1),
       ('Seven Samurai', 'A poor village under attack by bandits hires seven unemployed samurai to help them defend themselves.', 'sevensamurai.jpg', 1954, 8, 8, 'Good movie', 1, NOW(), 2),
       ('The Silence of the Lambs', 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.', 'silencelambs.jpg', 1991, 9, 8, 'Tense', 0, NOW(), 1),
       ('The Usual Suspects', 'A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.', 'usualsuspects.jpg', 1995, 9, 8, 'Great plot', 1, NOW(), 2),
       ('Léon: The Professional', 'A professional assassin rescues a young girl whose parents were killed in a police raid.', 'leon.jpg', 1994, 8, 7, 'OK movie', 0, NOW(), 1),
       ('Saving Private Ryan', 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.', 'savingprivateryan.jpg', 1998, 9, 9, 'Intense', 1, NOW(), 2);




truncate Collections;


INSERT INTO Collections (title, userId, isFavorite, createdAt, userText)
VALUES ('My Favorite Movies', 1, 1, NOW(), 'These are my all-time favorite movies'),
       ('My Must-Watch List', 2, 0, NOW(), 'Movies I need to watch'),
       ('Best Director Oscar Winners', 2, 0, NOW(), 'Movies that have won the Best Director Oscar'),
       ('Best Picture Oscar Winners', 1, 1, NOW(), 'My favorite movies that have won the Best Picture Oscar'),
       ('Comedy Classics', 2, 1, NOW(), 'Some of the best comedy movies of all time'),
       ('Science Fiction Must-Sees', 1, 0, NOW(), 'Science fiction movies that I need to see'),
       ('Black and White Classics', 2, 0, NOW(), 'Classic movies in black and white'),
       ('Top Grossing Movies of All Time', 1, 1, NOW(), 'The highest-grossing movies of all time'),
       ('Indie Gems', 2, 0, NOW(), 'Great independent films'),
       ('Film Noir', 1, 0, NOW(), 'Movies in the film noir genre');


INSERT INTO MovieCollections (movieId, collectionId)
SELECT idMovie, idCollection FROM Movies JOIN Collections ON Movies.userId = Collections.userId;





SET FOREIGN_KEY_CHECKS = 1;
