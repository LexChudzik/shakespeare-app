CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL
);

CREATE TABLE play (
    id SERIAL PRIMARY KEY,
    title character varying(50) NOT NULL,
    long_title character varying(100) NOT NULL,
    year integer NOT NULL,
    genre character(1) NOT NULL,
    alt_genre character(1)
);

CREATE TABLE production (
    id SERIAL PRIMARY KEY,
    play_id integer NOT NULL REFERENCES play(id),
    medium character(4) NOT NULL
);

CREATE TABLE live (
    production_id integer REFERENCES production(id),
    location character varying(500),
    start_date date,
    end_date date,
    url character varying(500),
    image_url character varying(500),
    theater character varying(500)
);

CREATE TABLE film (
    production_id integer REFERENCES production(id),
    release_date date,
    title character varying(100) NOT NULL,
    poster_path character varying(500),
    loose_adapt boolean DEFAULT false,
    tmdb_id integer NOT NULL UNIQUE
);

CREATE TABLE viewing (
    id SERIAL PRIMARY KEY,
    production_id integer REFERENCES production(id),
    person_id integer REFERENCES person(id),
    date date,
    rating integer,
    comments text
);

CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    production_id integer REFERENCES production(id),
    person_id integer REFERENCES person(id)
);


INSERT INTO "play" ("title", "long_title", "year", "genre") VALUES 
('Twelfth Night','Twelfth Night, Or What You Will',1599,'c'),
('Antony and Cleopatra','Antony and Cleopatra',1606,'t'),
('As You Like It','As You Like It',1599,'c'),
('Comedy of Errors','The Comedy of Errors',1589,'c'),
('Coriolanus','Coriolanus',1607,'t'),
('Hamlet','The Tragedy of Hamlet, Prince of Denmark',1600,'t'),
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
('Merry Wives of Windsor','The Merry Wives of Windsor',1600,'c'),
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
('Merchant of Venice','The Merchant of Venice',1596,'c','p'),
('Pericles','Pericles, Prince of Tyre',1608,'c','r'),
('Cymbeline','Cymbeline, King of Britain',1609,'c','r'),
('Troilus and Cressida','The History of Troilus and Cressida',1602,'t','p');