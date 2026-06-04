const { Bot, Keyboard, Button } = require('@maxhub/max-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("Error: BOT_TOKEN environment variable is not defined!");
  process.exit(1);
}

const bot = new Bot(token);

// Welcome message on starting the bot
bot.command('start', async (ctx) => {
  const keyboard = new Keyboard()
    .add(Button.openApp('ОТКРЫТЬ'))
    .toJson();

  await ctx.reply(
    'Привет! 🐞\n\nДобро пожаловать в проект команды LadyBUGs — "Хангылька" (интерактивный гид по лексическим различиям Южной и Северной Кореи).\n\nНажмите кнопку ниже, чтобы открыть наше мини-приложение прямо здесь в мессенджере!',
    { attachments: [keyboard] }
  );
});

// Fallback message for any other incoming user text
bot.on('message_created', async (ctx) => {
  const keyboard = new Keyboard()
    .add(Button.openApp('ОТКРЫТЬ'))
    .toJson();

  await ctx.reply(
    'Чтобы запустить интерактивные карточки "Хангылька", нажмите кнопку "ОТКРЫТЬ" ниже! 📖',
    { attachments: [keyboard] }
  );
});

console.log("Starting MAX Messenger bot listener (Long Polling)...");
bot.start();
