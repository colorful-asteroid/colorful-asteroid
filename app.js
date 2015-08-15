var express = require('express'),
serveStatic = require('serve-static'),
pg = require('pg'),
morgan = require('morgan'),
bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Listen for an environment port, else use 8081 (probably redundant)
var port = process.env.PORT || 3000;

//sets the root directory to public
app.use(express.static(__dirname + '/public')); //sets the root directory to public 


// connection string for our database
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';

app.get('/api/topics', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var query = client.query('SELECT text, vote FROM topics');
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

app.post('/api/topics', function(req, res){
  var rows = [];

  // Grab data from http request
  var data = {text: req.body.text};

  // Connect to DB
  pg.connect(connectionString, function(err, client, done){

    // Insert into table
    client.query('INSERT INTO topics (text, vote) values ($1, $2)', [data.text, 0]);

    // SQL Query > Select Data
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

app.post('/api/votes', function(req, res){
  var rows = [];
  var data = [];


  for (var i = 0; i < req.body.length; i++){
    data[i] = {text: req.body[i].text, vote: req.body[i].vote}
  }
  // var data = {text: req.body.text, vote: req.body.vote};

  console.log('data', data);

  pg.connect(connectionString, function(err, client, done){

    for (var i = 0; i < data.length; i++) {
      client.query('INSERT INTO topics (text, vote) values ($1, $2)', [data[i].text, data[i].vote]);
    }


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

// Describes the port we're listening on. Go to 'localhost:3000' in browser
var server = app.listen(port);


















