const express = require('express');
const bodyParser = require('body-parser');
const { Markup } = require('telegraf');
const TelegramBot = require('node-telegram-bot-api');

// Replace YOUR_BOT_TOKEN with your actual bot token
const token = '5894904956:AAHRQQNKsjnNkAtuGKNg1vk_ddUMgHeM7ro';

// Create a bot instance
const bot = new TelegramBot(token);

// Create an Express app
const app = express();

// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());

// Set up a route to receive webhook requests
app.post('/bot' + token, (req, res) => {
  // Forward the update to the bot
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Set the webhook
bot.setWebHook('https://pin2.vercel.app/' + token);

// Handle messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Create an inline keyboard with buttons
  const inlineKeyboard = Markup.inlineKeyboard([
    [
      Markup.callbackButton('Button 1', 'button_1'),
      Markup.callbackButton('Button 2', 'button_2')
    ]
  ]);

  // Send a message with the inline keyboard
  bot.sendMessage(chatId, 'Hello, I am a bot. Here are some buttons:', { reply_markup: inlineKeyboard });
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const data = callbackQuery.data;

  // Handle the callback query based on the data value
  if (data === 'button_1') {
    bot.sendMessage(chatId, 'You clicked on button 1');
  } else if (data === 'button_2') {
    bot.sendMessage(chatId, 'You clicked on button 2');
  }
});
