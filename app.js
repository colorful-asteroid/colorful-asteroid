var express = require('express');
var app = express();
var serveStatic = require('serve-static');

//sets the root directory to public
app.use(express.static(__dirname + '/public')); //sets the root directory to public

// Describes the port we're listening on. Go to 'localhost:3000' in browser
var server = app.listen(3000);