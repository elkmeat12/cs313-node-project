DROP TABLE IF EXISTS record CASCADE;
DROP TABLE IF EXISTS user_catch CASCADE;
DROP TABLE IF EXISTS place CASCADE;
DROP TABLE IF EXISTS fish_species CASCADE;
DROP TABLE IF EXISTS project_user;

CREATE TABLE project_user
( id           SERIAL         NOT NULL    PRIMARY KEY
, first_name   VARCHAR(100)   NOT NULL  
, username     VARCHAR(100)   UNIQUE      NOT NULL
, password     VARCHAR(250)   NOT NULL
);

CREATE TABLE fish_species
( id        SERIAL         NOT NULL    PRIMARY KEY
, species   VARCHAR(100)   NOT NULL
);

CREATE TABLE place
( id     SERIAL            NOT NULL    PRIMARY KEY
, city   VARCHAR(100)      NOT NULL
, state  VARCHAR(100)      NOT NULL
);

CREATE TABLE user_catch
( id           SERIAL      NOT NULL    PRIMARY KEY
, user_id      INT         NOT NULL    REFERENCES  project_user(id)
, species_id   INT         NOT NULL    REFERENCES  fish_species(id)
, place_id     INT         NOT NULL    REFERENCES  place(id)
, weight       FLOAT       
, length       FLOAT       
, day          DATE  
);

CREATE TABLE record
( id        SERIAL   NOT NULL    PRIMARY KEY
, catch_id  INT      NOT NULL    REFERENCES user_catch(id)
);