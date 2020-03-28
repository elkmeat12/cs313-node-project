require('../../node_modules/dotenv').config();
// DB Connection
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


// Try to insert form data into database
pool.connect(function(err) {
   if (err) throw err;
   console.log("Connected to database!");
   let  = "INSERT";
})

const insertData = (req, res) => {
   console.log("Trying to insert into database");

   let species = req.query.species_id;
   let weight = req.query.weight;
   let length = req.query.length;
   let city = req.query.city;
   let state = req.query.state;

   let insertSpecies = 'INSERT INTO fish_species (species) VALUES ($1)';
   const speciesValue = [species];
   pool.query(insertSpecies, speciesValue, (error, result) => {
      if (error) throw error;
      console.log("Species Result: " + result);
   })
   
   let insertPlace = 'INSERT INTO place (city, state) VALUES ($1, $2) RETURNING *';
   const placeValues = [city, state];
   pool.query(insertPlace, placeValues, (error, result) => {
      if (error) throw error;
      console.log("Place Result: " + result);
   });
   let insertFish = 'INSERT INTO user_catch (user_id, species_id, place_id, weight, length) VALUES ($1, $2, $3, $4) RETURNING *';
   let placeId = pool.query('SELECT max(id) FROM place', function (err, result) {
      if (err) throw err;
      console.log("Catch Result: " + result);
   });
   
   pool.query(insertFish, )
};