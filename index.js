const express = require('./node_modules/express')
var app = express()
const path = require('path')
const session = require('./node_modules/express-session')
const bcrypt = require('./node_modules/bcrypt')

session.login = false;

// Files
var login = require('./login')
var db = require('./db')

app.set('port', process.env.PORT || 6789)
  .use(express.static(__dirname + "/project/public"))
  .set('views', __dirname + "/views")
  .set('view engine', 'ejs')
  .get('/fish', db.getUserFish)
  // verify user
//   .get('/login', login.getUser)
  // send to login form
  .get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + "/project/public"});
  })
  .listen(app.get('port'), function() {
  	console.log('Listening on port: ' + app.get('port'));
  });