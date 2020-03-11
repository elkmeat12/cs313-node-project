require('dotenv').config();

const express = require('express');
const app = express();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 6789));
app.use(express.static(__dirname + '/public'));
app.get('/getPerson', getPerson);

app.listen(app.get('port'), function() {
   console.log('Node app is running on port', app.get('port'));
});

function getPerson(req, res) {
   var id = req.query.id;
   console.log("Requested id:" + id);

   getPersonFromDB(id, function(error, result) {
      if (error || result == null || result.length != 1) {
         res.status(500).json({success: false, data: error});
      } else {
         const person = result[0];
         res.status(200).json(person);
      }
   });
}

function getPersonFromDB(id, callback) {
   console.log("Getting person from DB with id: " + id);
   var sql = "SELECT id, first, last, birth FROM person WHERE id = $1::int;";
   var stuff = [id];
   console.log(stuff);
   pool.query(sql, stuff, function(err, result) {
      if (err) {
         console.log("Error in query: ")
         console.log(err);
         callback(err, null);
      }
      console.log("Found result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
   });
}