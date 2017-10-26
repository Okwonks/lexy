// Importing botkit
var Botkit = require('botkit');
// Setting up facebook controller
var controller = Botkit.facebookbot({
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN
});

var bot = controller.spawn();
controller.hears('(.*)', 'message_received', function(bot, message) {
    bot.reply(message, message.watsonData.output.text.join('\n'));
});

module.exports.controller = controller;
module.exports.bot = bot;