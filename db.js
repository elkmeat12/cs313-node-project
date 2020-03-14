require('./node_modules/dotenv').config();
const bcrypt = require('./node_modules/bcrypt')

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

const checkUser = (req, res) => {
   let username = req.body.username
   let password = req.body.password

   const query = "SELECT password FROM project_user WHERE username = $1";
   pool.query(query, [username], (error, results) => {
      if (error) {
         throw error;
      }
      else {
         if (bcrypt.compareSync(password, results.rows[0].password)) {
            req.session.username = req.body.username
            req.session.login = true;
            console.log("Login return " + req.session.username);
            res.status(200).json({success:true})
         }
         else {
            res.status(200).json({success:false})
         }
      }
   });
}

module.exports = {
   getUserFish,
   checkUser
};