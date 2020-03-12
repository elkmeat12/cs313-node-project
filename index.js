require('dotenv').config();
const express = require('express')
var app = express()

app.set('port', process.env.PORT)
  .use(express.static(__dirname + "/project/public"))
  .set('views', __dirname + "/views")
  .set('view engine', 'ejs')
  // send to postal form
  .get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + "/project/public"});
  })
  .listen(app.get('port'), function() {
  	console.log('Listening on port: ' + app.get('port'));
  });