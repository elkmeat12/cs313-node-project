const express = require('./node_modules/express')
var app = express()
const path = require('path')
const session = require('./node_modules/express-session')
var bodyParser = require('./node_modules/body-parser')
const bcrypt = require('./node_modules/bcrypt')

// DB Connection
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

// session.login = false;

// Files
var login = require('./login')
var db = require('./db')

app.set('port', process.env.PORT || 6789)
  .use(express.static(__dirname + "/project/public"))
  .set('views', __dirname + "/views")
  .set('view engine', 'ejs')
  .get('/fish', db.getUserFish)
  .use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))
  .use(bodyParser.urlencoded({extended:true}))
  .use(bodyParser.json())
  // verify user
//   .get('/login', login.getUser)
  // send to login form
  .get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + "/project/public"});
  })
  .post('/login', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    const query = 'SELECT password FROM project_user WHERE username = $1';
    pool.query(query, [username], (error, results) => {
      if (error) {
        throw error;
      }
      else {
        if (bcrypt.compareSync(password, results.rows[0].password)) {
          req.session.username = req.body.username
          req.session.loggedin = true;
          console.log("Login Return " + req.session.username);
          res.status(200).json({success:true})
        }
        else {
          res.status(200).json({success:false})
        }
      }
    })
  })
  .get('/home', function(req, res) {
    if (req.session.loggedin) {
      res.send('Welcom back, ' + req.session.username + '!');
    } else {
      res.send('Please login to view this page!');
    }
    res.end();
  })
  .listen(app.get('port'), function() {
  	console.log('Listening on port: ' + app.get('port'));
  });