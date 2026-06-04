const { Bot, Keyboard } = require('@maxhub/max-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("Error: BOT_TOKEN environment variable is not defined!");
  process.exit(1);
}

const bot = new Bot(token);
let botUsername = '';
let keyboard = null;

// Get bot username on initialization and set up the keyboard
async function initBot() {
  try {
    const info = await bot.api.getMyInfo();
    botUsername = info.username || '';
    console.log(`Bot authorized successfully as: @${botUsername}`);
    
    // Create standard link button using the bot's startapp deep link
    // This is the most reliable way and avoids protobuf deserialization errors
    keyboard = Keyboard.inlineKeyboard([
      [Keyboard.button.link('ОТКРЫТЬ', `https://max.ru/${botUsername}?startapp`)]
    ]);
  } catch (error) {
    console.error("Error while fetching bot info:", error);
  }
}

// Welcome message on starting the bot
bot.command('start', async (ctx) => {
  if (!keyboard) {
    return ctx.reply('Секунду, бот еще настраивается...');
  }

  await ctx.reply(
    'Привет! 🐞\n\nДобро пожаловать в проект команды LadyBUGs — "Хангылька" (интерактивный гид по лексическим различиям Южной и Северной Кореи).\n\nНажмите кнопку ниже, чтобы открыть наше мини-приложение прямо здесь в мессенджере!',
    { attachments: [keyboard] }
  );
});

// Fallback message for any other incoming user text
bot.on('message_created', async (ctx) => {
  if (!keyboard) {
    return ctx.reply('Секунду, бот еще настраивается...');
  }

  await ctx.reply(
    'Чтобы запустить интерактивные карточки "Хангылька", нажмите кнопку "ОТКРЫТЬ" ниже! 📖',
    { attachments: [keyboard] }
  );
});

async function start() {
  await initBot();
  console.log("Starting MAX Messenger bot listener (Long Polling)...");
  bot.start();
}

start();
