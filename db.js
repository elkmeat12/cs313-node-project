require('./node_modules/dotenv').config();
const bcrypt = require('./node_modules/bcrypt')

// DB Connection
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function getUserFish(req, res) {
   // ensure the user is signed in
   if (!req.session.login) {
      res.redirect('/');
   }

   // get the unique user id
   var id = req.query.id;
   console.log("Requested id:" + id);

   // get their data from the database
   getFishFromDB(id, function(error, result) {
      if (error || result == null || result.length < 1) {
         res.status(500).json({success: false, data: error});
      } else {
            // res.status(200).json(result);
            console.log(result.length)
            res.render("fish.ejs", {result:result.rows});
      }
   });
}

// Get the data from the database
function getFishFromDB(id, callback) {
   console.log("Getting fish caught from DB with person id: " + id);
   (async () => {
      const client = await pool.connect()
      try {
         var sql = "SELECT u.first_name, f.species, c.weight, c.length, p.city, c.day " + 
             "FROM user_catch c " + 
             "JOIN project_user u ON c.user_id = u.id " +
             "JOIN fish_species f ON c.species_id = f.id " +
             "JOIN place p ON c.place_id = p.id " + 
             "WHERE u.id = $1::int;";
         var stuff = [id];
         console.log(stuff);
         await client.query(sql, stuff, function(err, results) {
            if (err) {
               console.log("Error in query: \n" +  err)
               callback(err, null);
            }
            console.table(results.rows);
            console.log(results)
            callback(null, results);
         });
      } finally {
         client.release()
      }
   })().catch(e => console.log(e.stack))
};



// check for the user account after login
const checkUser = (req, res) => {
   let username = req.body.username
   let password = req.body.password

   console.log(username)
   console.log(password)

   const query = "SELECT * FROM project_user WHERE username = $1";

   // if found in the database, send them to their profile
   if (username && password) {
      pool.query(query, [username], (error, results) => {
         if (error) {
            throw error;
         } else {
            if (bcrypt.compareSync(password, results.rows[0].password)) {
               req.session.login = true;
               req.session.username = username;
               console.log("Login return " + req.session.username);
               // res.status(200).json({success:true});
               res.redirect('/fish?id=' + results.rows[0].id);
            } else {
               // res.status(200).json({success:false});
               res.send('Wrong username or password');
            }
         }
         res.end();
      });
   } else {
      res.send('Please enter username and password');
      res.end();
   }
}





// test with rendering to page
const getFish = (req, res) => {
   if (!req.session.login) {
      res.redirect('/');
   }
   console.log("getFish start");
   (async () => {
      const client = await pool.connect()
      try {
         const results = await client.query('SELECT * FROM user_catch')
         res.render("fish.ejs", {results:results.rows});
      } finally {
         client.release()
      }
   })().catch(e => console.log(e.stack))
};


module.exports = {
   getUserFish,
   getFish,
   checkUser
};