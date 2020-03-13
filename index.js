const express = require('./node_modules/express')
var app = express()

// Files
var login = require('./login')
var getFish = require('./getFish')

app.set('port', process.env.PORT || 6789)
  .use(express.static(__dirname + "/project/public"))
  .set('views', __dirname + "/views")
  .set('view engine', 'ejs')
  .get('/fish', getFish.getUserFish)
  // verify user
//   .get('/login', login.getUser)
  // send to login form
  .get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + "/project/public"});
  })
  .listen(app.get('port'), function() {
  	console.log('Listening on port: ' + app.get('port'));
  });