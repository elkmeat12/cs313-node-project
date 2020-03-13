require('dotenv/types').config();

// DB Connection
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function getUserFish(req, res) {
   var id = req.query.id;
   console.log("Requested id:" + id);

   getFishFromDB(id, function(error, result) {
      if (error || result == null || result.length < 1) {
         res.status(500).json({success: false, data: error});
      } else {
            var fish = result;
            res.status(200).json(fish);
      }
   });
}

// Get the data from the database
function getFishFromDB(id, callback) {
   console.log("Getting fish caught from DB with person id: " + id);
   var sql = "SELECT u.first_name, f.species, c.weight, c.length, p.city, c.day " + 
             "FROM user_catch c " + 
             "JOIN project_user u ON c.user_id = u.id " +
             "JOIN fish_species f ON c.species_id = f.id " +
             "JOIN place p ON c.place_id = p.id " + 
             "WHERE u.id = $1::int;";
   var stuff = [id];
   console.log(stuff);
   pool.query(sql, stuff, function(err, result) {
      if (err) {
         console.log("Error in query: ")
         console.log(err);
         callback(err, null);
      }
      console.table(result.rows);
      callback(null, result.rows);
   });
}

module.exports = {getUserFish: getUserFish};