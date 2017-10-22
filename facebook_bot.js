// Importing botkit
var Botkit = require('botkit');
// Setting up facebook controller
var controller = Botkit.facebookbot({
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN
});

var bot = controller.spawn({
    
});
// Connection to Watson Service
var watsonMiddleware = require('botkit-middleware-watson')({
    username: watsonUser,
    password: watsonPassword,
    workspace_id: watsonWorkspaceId,
    version_date: '2017-05-26',
    minimum_confidence: 0.50
});

controller.setupWebserver(process.env.port, function(err, webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function() {
        console.log('bot is online');
    });
});
// This is triggered when the user clicks the send-to-messenger plugin
controller.on('facebook_optin', function(bot, message) {
    bot.reply(message, 'Welcome to the app!');
});

controller.middleware.receive.use(watsonMiddleware.receive);

controller.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    if (message.watsonError) {
        bot.reply(message, "I'm sorry but for technical reasons I cannot respond to your message");
    } else {
        bot.reply(message, message.watsonData.output.text.join('\n'));
    }
});