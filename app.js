var express = require('express'),
serveStatic = require('serve-static'),
pg = require('pg'),
morgan = require('morgan');


var app = express();

//sets the root directory to public
app.use(express.static(__dirname + '/public')); //sets the root directory to public


// connection string for our database
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';

pg.connect(connectionString, function(err, client, done){
  var query = client.query('select text from topics');
  var rows = [];
  
  if (err) {
    return console.error('error running query', err);
  }

  query.on('row', function(row) {
      //fired once for each row returned
      rows.push(row);
    });
  query.on('end', function(result) {
      //fired once and only once, after the last row has been returned and after all 'row' events are emitted
      //in this example, the 'rows' array now contains an ordered set of all the rows which we received from postgres
      console.log(result.rowCount + ' rows were received');
    });


});


// Describes the port we're listening on. Go to 'localhost:3000' in browser
var server = app.listen(3000);