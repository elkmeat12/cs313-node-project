DROP TABLE IF EXISTS person_relation CASCADE;
DROP TABLE IF EXISTS person;

CREATE TABLE person
( id           SERIAL         NOT NULL    PRIMARY KEY
, first        VARCHAR(100)   NOT NULL
, last         VARCHAR(100)
, birth        DATE
);

-- CREATE TABLE person_relation
-- ( parent_id    INT   REFERENCES person(id)
-- , child_id     INT   REFERENCES person(id)
-- );

INSERT INTO person (first, last, birth)
VALUES ('Tyler', 'Elkington', '1996-02-16'),
       ('Kelly', 'Elkington', '1972-10-19'),
       ('Camille', 'Madsen', '1973-05-29');

-- INSERT INTO person_relation VALUES (2, 1);
-- INSERT INTO person_relation VALUES (3, 1);

CREATE USER my_user WITH PASSWORD 'my_pass';
GRANT SELECT, INSERT, UPDATE ON person TO my_user;
GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO my_user;
