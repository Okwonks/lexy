/** Imports that are required from the .env file */
var watsonUser = require('.env').WATSON_USER_NAME;
var watsonPassword = require('.env').WATSON_PASSWORD;
var watsonWorkspaceId = require('.env').WATSON_WORKSPACE_ID;
var slackToken = require('.env').SLACK_BOT_TOKEN;

var slackController = Botkit.slackBot();

// Spawning the slack bot.
var slackBot = slackController.spawn({
    token: slackToken
})

// Connection to the Watson Conversation service
var watsonMiddleware = require('botkit-middleware-watson')({
    username: watsonUser,
    password: watsonPassword,
    workspace_id: watsonWorkspaceId,
    version_date: '2017-05-26',
    minimum_confidence: 0.50
})

// Telling the bot what to do with the incoming messages
slackController.middleware.receive.use(watsonMiddleware.receive);
slackBot.startRTM();

// Making the bot reply to messages using watson.

