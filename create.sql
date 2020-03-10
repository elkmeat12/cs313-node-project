CREATE TABLE person
( id           SERIAL         NOT NULL    PRIMARY KEY
, first_name   VARCHAR(100)   NOT NULL
, last_name    VARCHAR(100)
, birth        DATE
);

CREATE TABLE person_relation
( parent_id    INT   REFERENCES person(id)
, child_id     INT   REFERENCES person(id)
);

INSERT INTO person (first_name, last_name, birth)
VALUES ('Tyler', 'Elkington', '1996-02-16'),
       ('Kelly', 'Elkington', '1972-10-19'),
       ('Camille', 'Madsen', '1973-05-29');

INSERT INTO person_relation VALUES (2, 1);
INSERT INTO person_relation VALUES (3, 1);
