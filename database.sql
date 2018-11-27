--JOIN SETUPS

--SHOW VEIW HISTORY FOR USER
SELECT 
	rating, comments, date, type, tmdb_id, poster_path, genre, alt_genre, loose_adapt,
	play.title AS play_title,
	play.id AS play_id,
	viewing.id AS view_id,
	production.id AS production_id,
	film.title AS film_title,
	company.name AS company_name,
	live.image_url AS live_img_url,
	live.location AS location,
	live.theater AS theater
FROM viewing
JOIN production ON viewing.production_id = production.id
LEFT JOIN live ON live.production_id = production.id
LEFT JOIN film ON film.production_id = production.id
JOIN play ON play.id = production.play_id
WHERE person_id = $1;


CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "play" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (50) NOT NULL,
	"long_title" VARCHAR (100) NOT NULL,
	"year" int NOT NULL,
	"genre" CHAR (1) NOT NULL,
	"alt_genre" CHAR (1)
);

CREATE TABLE "company"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"location" VARCHAR (200),
	"url" VARCHAR (200)
);

CREATE TABLE "production" (
	"id" SERIAL PRIMARY KEY,
	"play_id" INT REFERENCES "play" NOT NULL,
	"type" CHAR(4) NOT NULL
);

CREATE TABLE "live" (
	"production_id" INT REFERENCES "production",
	"company_id" INT REFERENCES "company",
	"location" VARCHAR (500),
	"start_date" DATE,
	"end_date" DATE,
	"url" VARCHAR (500)
);

CREATE TABLE "film" (
	"production_id" INT references "production",
	"release_date" DATE,
	"title" VARCHAR (100) NOT NULL,
	"poster_path" VARCHAR (500),
	"loose_adapt" BOOLEAN DEFAULT FALSE,
	"tmdb_id" INT
);

CREATE TABLE "viewing" (
	"id" SERIAL PRIMARY KEY,
	"production_id" INT REFERENCES "production",
	"person_id" INT REFERENCES "person",
	"date" DATE,
	"rating" INT,
	"comments" TEXT
);

CREATE TABLE "list" (
	"production_id" INT REFERENCES "production",
	"person_id" INT REFERENCES "person"
);

INSERT INTO "play" ("title", "long_title", "year", "genre") VALUES 
('Twelfth Night','Twelfth Night, Or What You Will',1599,'c'),
('Antony and Cleopatra','Antony and Cleopatra',1606,'t'),
('As You Like It','As You Like It',1599,'c'),
('Comedy of Errors','The Comedy of Errors',1589,'c'),
('Coriolanus','Coriolanus',1607,'t'),
('Hamlet','Tragedy of Hamlet, Prince of Denmark, The',1600,'t'),
('Henry IV, Part I','History of Henry IV, Part I',1597,'h'),
('Henry IV, Part II','History of Henry IV, Part II',1597,'h'),
('Henry V','History of Henry V',1598,'h'),
('Henry VI, Part I','History of Henry VI, Part I',1591,'h'),
('Henry VI, Part II','History of Henry VI, Part II',1590,'h'),
('Henry VI, Part III','History of Henry VI, Part III',1590,'h'),
('Henry VIII','History of Henry VIII',1612,'h'),
('Julius Caesar','The Tragedy of Julius Caesar',1599,'t'),
('King John','History of King John',1596,'h'),
('King Lear','The Tragedy of King Lear',1605,'t'),
('Love''s Labour''s Lost','Love''s Labour''s Lost',1594,'c'),
('Macbeth','The Tragedy of Macbeth',1605,'t'),
('Merry Wives of Windsor','Merry Wives of Windsor, The',1600,'c'),
('Midsummer Night''s Dream','A Midsummer Night''s Dream',1595,'c'),
('Much Ado about Nothing','Much Ado about Nothing',1598,'c'),
('Othello','The Tragedy of Othello, Moor of Venice',1604,'t'),
('Richard II','History of Richard II',1595,'h'),
('Richard III','History of Richard III',1592,'h'),
('Romeo and Juliet','The Tragedy of Romeo and Juliet',1594,'t'),
('Taming of the Shrew','The Taming of the Shrew',1593,'c'),
('Timon of Athens','The Tragedy of Timon of Athens',1607,'t'),
('Titus Andronicus','Titus Andronicus',1593,'t'),
('Two Gentlemen of Verona','Two Gentlemen of Verona',1594,'c');

INSERT INTO "play" ("title", "long_title", "year", "genre", "alt_genre") VALUES 
('Tempest','The Tempest',1611,'c', 'r'),
('The Winter''s Tale','The Winter''s Tale',1610,'c', 'r'),
('All''s Well That Ends Well','All''s Well That Ends Well',1602,'c', 'p'),
('Measure for Measure','Measure for Measure',1604,'c','p'),
('Merchant of Venice','Merchant of Venice, The',1596,'c','p'),
('Pericles','Pericles, Prince of Tyre',1608,'c','r'),
('Cymbeline','Cymbeline, King of Britain',1609,'c','r'),
('Troilus and Cressida','The History of Troilus and Cressida',1602,'t','p');