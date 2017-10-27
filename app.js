require('dotenv').load();
// Set up watson service
var middleware = require('botkit-middleware-watson')({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    workspace_id: process.env.WATSON_WORKSPACE_ID,
    url: process.env.WATSON_URL || 'https://gateway.watsonplatform.net/conversation/api',
    version_date: '2017-05-26',
    minimum_confidence: 0.50
});

module.exports = function(app) {
    if (process.env.USE_FACEBOOK) {
        var Facebook = require('./facebook-bot');
        Facebook.controller.middleware.receive.use(middleware.receive);
        Facebook.controller.createWebhookEndpoints(app, Facebook.bot);
        console.log('Facebook bot is live');
    }
    if (process.env.USE_SLACK) {
        var Slack = require('./slack-bot');
        Slack.slackController.middleware.receive.use(middleware.receive);
        Slack.slackBot.startRTM();
        console.log('Slack bot is live');
    }
}