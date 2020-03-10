require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

var sql = "SELECT * FROM person";

pool.query(sql, function(err, result) {
   // If an error occured...
   if (err) {
      console.log("Error in query: ");
      console.log(err);
   }

   // Log to consol for debugging
   console.log("Back from DB with result:");
   console.log(result.rows)
})