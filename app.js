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

app.get('/api/vote', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var query = client.query('select text from topics');
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

app.post('/api/vote', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    // console.log('************************************', Object.keys(req));
    console.log('************************************', req.body);
  });
});

// Describes the port we're listening on. Go to 'localhost:3000' in browser
var server = app.listen(port);