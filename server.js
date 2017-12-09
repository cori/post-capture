// server.js
// where your node app starts

// init project
const express = require('express');
const low  = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('.data/db.json');
const db = low(adapter);
const shortid = require('shortid');

// var bodyParser = require('body-parser');

const fs = require('fs');
var showdown  = require('showdown');
const converter = new showdown.Converter();

var app = express();
// app.use( bodyParser.json() );

db.defaults({ posts: [] })
  .write()

app.get("/", function (equest, response) {
  var path = __dirname + '/README.md';
  var file = fs.readFileSync(path, 'utf8');
  
  response.status(200).send(converter.makeHtml(file.toString()));
});

app.get("/reset", function (request, response ) {
  // removes all entries from the collection
  db.get('posts')
  .remove()
  .write();
  console.log("Database cleared");
  response.status(200).send("Database cleared");
});

app.get("/:postId", function(request, response) {
  console.log(request.params.postId);
  var post = db
    .get('posts')
    .find({id:request.params.postId})
    .value();
  if(post) {
    response.status(200).send('<pre>' + JSON.stringify(post, null, '\t') + '</pre>');
  } else {
    response.sendStatus(404);
  }
})

app.get("/:postId/body", function(request, response) {
  console.log(request.params.postId);
  var post = db
    .get('posts')
    .find({id:request.params.postId})
    .value();
  if(post) {
    response.status(200).send('<pre>' + JSON.stringify(post.body, null, '\t') + '</pre>');
  } else {
    response.sendStatus(404);
  }
})

app.post("/", function (request, response) {
  console.log(request.body);
  db.get('posts')
  .push({id:shortid.generate(),timestamp:(new Date()).toJSON(),ips:request.get('x-forwarded-for'),body:request.body})
  .write();
  response.status(201).send();  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
