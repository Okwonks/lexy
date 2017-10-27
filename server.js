require('dotenv').load();
// Setting up the server
var express = require('express');
var bodyParser = require('body-parser');
var verify = require('./security');
var app = express().use(bodyParser.json());
// Setting the port
var port = process.env.PORT || 5000;
app.set('port', port);

require('./app')(app);

// Listening on the specific port
app.listen(port, function() {
    console.log('Client server listening on port' + port);
});
app.get('/', (req, res) => {
    
    // Parse params from the webhook verification request
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Check if a token and mode were sent
    if (mode && token) {
    
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        
        // Respond with 200 OK and challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });