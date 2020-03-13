-- ERASE ANY PREVIOUS DATE
DELETE FROM record;
DELETE FROM user_catch;
DELETE FROM place;
DELETE FROM fish_species;
DELETE FROM project_user;

-- ENABLE pgcrypto to encrypt passwords
CREATE EXTENSION pgcrypto;

-- RESET THE SEQUENCE 
ALTER SEQUENCE project_user_id_seq RESTART WITH 1;
ALTER SEQUENCE fish_species_id_seq RESTART WITH 1;
ALTER SEQUENCE place_id_seq RESTART WITH 1;
ALTER SEQUENCE user_catch_id_seq RESTART WITH 1;

-- ADD USERS TO ACCESS WEBSITE
INSERT INTO project_user (first_name, username, password) 
VALUES ('Tyler',
        'elk', 
        crypt('pass1', gen_salt('bf')));

INSERT INTO project_user (first_name, username, password) 
VALUES ('ta',
        'ta_user', 
        crypt('ta_pass', gen_salt('bf')));

-- ADD FISH SPECIES
INSERT INTO fish_species (species) 
VALUES ('Rainbow Trout'),
       ('Brown Trout'),
       ('Lake Trout'),
       ('Largemouth Bass'),
       ('Smallmouth Bass'),
       ('Perch'),
       ('Salmon'),
       ('Pike'),
       ('Catfish'),
       ('Bluegill'),
       ('Sturgeon');

-- ADD LOCATIONS
INSERT INTO place (city, state)
VALUES ('Ririe', 'Idaho'),
       ('Swan Valley', 'Idaho'),
       ('Salmon', 'Idaho'),
       ('St. George', 'Utah');

-- ADD USER CATCHES 
INSERT INTO user_catch (user_id, species_id, place_id, weight, length, day)
VALUES (1, 1, 1, 5.4, 23.6, '2018-01-01'),
       (1, 2, 2, 6.1, 25.6, '2018-01-01'),
       (1, 7, 3, 8.3, 43.2, '2014-01-01'),
       (2, 1, 1, 3.4, 19.6, '2018-01-01');