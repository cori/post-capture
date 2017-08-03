// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  console.log(request.body);
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/", function (request, response) {
  console.log(request);
  var header=request.headers['authorization']||'';
  var token = header.split(/\s+/).pop()||'';
  var auth = new Buffer(token, 'base64').toString();
  var parts = auth.split(/:/);
  console.log('username:' + parts[0]);
  console.log('password:'+ parts[1]);
  console.log(request.body);
//  response.status(200).send(request.body.caseevntid);  
  response.status(200).send();  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
