// This file is responsible for establishing connections with the node server. It also provides the routes
// for querying the database to insert and retrieve topic and vote data

// The project uses a node server with express and a Postgres database to store data
 var express = require('express'),
serveStatic = require('serve-static'),
pg = require('pg'),
morgan = require('morgan'),
bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var url = require('url')


app.use(bodyParser.urlencoded({ extended: false }));

// Listen for an environment port
var port = process.env.PORT || 3000;

//sets the root directory to public
app.use(express.static(__dirname + '/public'));


// Connection string for our database
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';

// Request returns an array with all submitted topics
app.get('/api/topics', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var query = client.query('SELECT text, vote FROM topics');
    var rows = []; // Array to hold values returned from database

    if (err) {
      return console.error('error running query', err);
    }
    query.on('row', function(row) {
      rows.push(row);
    });
    query.on('end', function(result) {
      client.end();
      return res.json(rows);
    });
  });
});


// Posts a submitted topic to the database with a default value of 0 in the vote column
// These rows with 0 in the vote value are only used to present topics, and not when 
// querying votes
app.post('/api/topics', function(req, res){
  var rows = []; // Array to hold values returned from database
   url.parse(req.url).query
  // Grab data from http request
  var data = {text: req.body.text};

  // Connect to DB
  pg.connect(connectionString, function(err, client, done){

    // Insert topics into table

    client.query('INSERT INTO topics (text, vote) values ($1, $2)', [data.text, 0]);

    // Retrieves inserted values from database
    var query = client.query("SELECT text FROM topics ORDER BY id DESC");
    if (err) {
      return console.error('error running query', err);
    }
    query.on('row', function(row) {
      rows.push(row);
    });
    query.on('end', function(result) {
      client.end();
      console.log(result)
      return res.json(rows);
    });

  });
});

// Retrives all topics and votes from database, other than those with a vote value of 0. Votes
// with a value 0 are not user submitted but actually only used in displaying topics.
app.get('/api/votes', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var query = client.query('SELECT text, vote FROM topics WHERE vote > 0');
    var rows = [];

    if (err) {
      return console.error('error running query', err);
    }
    query.on('row', function(row) {
      rows.push(row);
    });
    query.on('end', function(result) {
      client.end();
      return res.json(rows);
    });
  });

});

// Post votes to the database 'vote' column as integers ranging from 1 to 100
app.post('/api/votes', function(req, res){
  var rows = [];
  var data = [];

  for (var i = 0; i < req.body.length; i++){
    data[i] = {text: req.body[i].text, vote: req.body[i].vote};
  }

  pg.connect(connectionString, function(err, client, done){

    for (var i = 0; i < data.length; i++) {
      //select in table topics in column text the value with data[i] text
      //replace that row's vote value to data[i].vote


      client.query('UPDATE topics SET vote=$2 WHERE text=$1',[data[i].text, data[i].vote]);}

    var query = client.query("SELECT text FROM topics ORDER BY id ASC");
    
    if (err) {
      return console.error('error running query', err);
    }

    query.on('row', function(row) {
      rows.push(row);
    });

    query.on('end', function(result) {
      client.end();
      return res.json(rows);
    });
  });
});

// Delete all rows from topics table to reset for a new sprint
app.post('/api/reset', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var query = client.query('DELETE from topics');
    res.end();
  });

});

// Describes the port we're listening on. Go to 'localhost:3000' in browser to serve locally
var server = app.listen(port);


















