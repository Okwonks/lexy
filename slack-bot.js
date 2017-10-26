var Botkit = require('botkit'); // Botkit module required in makiing the bot
const slackToken = process.env.SLACK_BOT_TOKEN;
var slackController = Botkit.slackbot(); // slackbot set ups the controller.

// Spawning the slack bot.
var slackBot = slackController.spawn({
    token: slackToken
});

slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    bot.reply(message, message.watsonData.output.text.join('\n'));
});

module.exports.slackController = slackController;
module.exports.slackBot = slackBot;
