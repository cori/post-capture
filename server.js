// server.js
// where your node app starts

// init project
var express = require('express');
var low  = require('lowdb');
var db = low('.data/db.json', { storage: require('node_modules/lowdb/lib/storages/file-async') });

var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json() );

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  console.log(request);
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/", function (request, response) {
  console.log(request.body);
  db.get('posts')
  .push({timestamp:Date(),host:request.hostname,body:request.body,req:request})
  .write();
  response.status(200).send();  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
