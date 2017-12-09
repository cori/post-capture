// server.js
// where your node app starts

// init project
var express = require('express');
var low  = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('.data/db.json');
const db = low(adapter);
const shortid = require('shortid');

var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json() );

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

db.defaults({ posts: [] })
  .write()

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  console.log(request);
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/reset", function (request, response ) {
  // removes all entries from the collection
  db.get('posts')
  .remove()
  .write();
  console.log("Database cleared");
  response.status(200).send();
});

app.get("/:postId", function(request, response) {
  var post = db
    .get('posts')
    .find({id:request.params.postId})
    .value();
  if(post) {
    // response.status(200).send(JSON.stringify(post, null, '\t'));
    response.status(200).send(post);
  } else {
    response.sendStatus(404);
  }
})

app.post("/", function (request, response) {
  console.log(request.body);
  db.get('posts')
  .push({id:shortid.generate(),timestamp:(new Date()).toJSON(),ips:request.get('x-forwarded-for'),body:request.body})
  .write();
  response.status(200).send();  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
