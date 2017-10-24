require('dotenv').load();
// Setting up the server
var express = require('express');
var bodyParser = require('body-parser');
var app = express().use(bodyParser.json());
// Setting the port
var port = process.env.PORT || 5000;
app.set('port', port);

require('./app')(app);

// Listening on the specific port
app.listen(port, function() {
    console.log('Client server listening on port' + port);
});