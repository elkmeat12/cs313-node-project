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

// ensure user is not logged in
session.login = false;

// Files
var login = require('./login')
var db = require('./db')

app.set('port', process.env.PORT || 6789)
  .use(express.static(__dirname + "/project/public"))
  .set('views', __dirname + "/project/views")
  .set('view engine', 'ejs')

  // set up for session variables
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))

  .use(bodyParser.urlencoded({extended:true}))
  .use(bodyParser.json())

  // send to login form
  .get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + "/project/public"});
  })

  // authenticate login
  .post('/auth', db.checkUser, function(res) {
    console.log("Login return " + res.success);
  })

  // get the user information from the database
  .get('/fish', db.getUserFish)
  
  .listen(app.get('port'), function() {
  	console.log('Listening on port: ' + app.get('port'));
  });