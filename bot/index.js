const { Bot, Keyboard } = require('@maxhub/max-bot-api');
require('dotenv').config();
const words = require('./words');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("Error: BOT_TOKEN environment variable is not defined!");
  process.exit(1);
}

const bot = new Bot(token);
let botUsername = '';
let botInfo = null;

// Session storage in memory: userId -> { category, index }
const userSessions = {};

// Helper to get cards by category
function getCardsByCategory(category) {
  return words.filter(w => w.category === category);
}

// Generate the Main Menu keyboard
function getMainMenuKeyboard() {
  return Keyboard.inlineKeyboard([
    [
      Keyboard.button.callback('Базовые слова 统一', 'cat:similarities'),
      Keyboard.button.callback('Повседневные различия 🗣️', 'cat:differences')
    ],
    [
      Keyboard.button.callback('Мир Леди Баг 🐞', 'cat:ladybug'),
      Keyboard.button.callback('Заимствования 🧴', 'cat:docx')
    ],
    [
      {
        type: 'openApp',
        text: '📱 Открыть Mini App',
        webApp: botUsername
      }
    ]
  ]);
}

// Generate a Card Message and Keyboard
function getCardResponse(userId, category, index) {
  const cards = getCardsByCategory(category);
  
  if (!cards || cards.length === 0) {
    return {
      text: 'Категория не найдена или пуста.',
      keyboard: getMainMenuKeyboard()
    };
  }

  let safeIndex = parseInt(index, 10);
  if (isNaN(safeIndex) || safeIndex < 0) {
    safeIndex = 0;
  }
  if (safeIndex >= cards.length) {
    safeIndex = cards.length - 1;
  }

  const card = cards[safeIndex];
  
  let categoryName = '';
  switch(category) {
    case 'similarities': categoryName = 'Базовые слова (сходства)'; break;
    case 'differences': categoryName = 'Повседневные слова (различия)'; break;
    case 'ladybug': categoryName = 'Спецвыпуск: Мир Леди Баг'; break;
    case 'docx': categoryName = 'Заимствования vs Исконные'; break;
  }

  const text = `📁 **Категория:** ${categoryName}\n` +
               `🎴 **Карточка ${safeIndex + 1} из ${cards.length}** ${card.emoji || ''}\n\n` +
               `🇷🇺 **Русский:** ${card.russian}\n\n` +
               `🇰🇷 **Южная Корея:**\n` +
               `👉 ${card.southHangul} [${card.southTranscript}]\n\n` +
               `🇰🇵 **Северная Корея:**\n` +
               `👉 ${card.northHangul} [${card.northTranscript}]\n\n` +
               `💡 **Объяснение:**\n` +
               `${card.explanation}`;

  const row = [];
  if (safeIndex > 0) {
    row.push(Keyboard.button.callback('◀️ Назад', `prev:${category}:${safeIndex}`));
  }
  row.push(Keyboard.button.callback('🏠 В меню', 'menu'));
  if (safeIndex < cards.length - 1) {
    row.push(Keyboard.button.callback('Вперед ▶️', `next:${category}:${safeIndex}`));
  }

  const keyboard = Keyboard.inlineKeyboard([
    row,
    [
      {
        type: 'openApp',
        text: '📱 Запустить приложение',
        webApp: botUsername
      }
    ]
  ]);

  return { text, keyboard };
}

// Get bot username on initialization
async function initBot() {
  try {
    const info = await bot.api.getMyInfo();
    botInfo = info;
    botUsername = info.username || '';
    console.log(`Bot authorized successfully as: @${botUsername}`);
  } catch (error) {
    console.error("Error while fetching bot info:", error);
  }
}

// Welcome message on starting the bot
bot.command('start', async (ctx) => {
  const keyboard = getMainMenuKeyboard();
  await ctx.reply(
    'Привет! 🐞\n\nДобро пожаловать в проект команды LadyBUGs — "Хангылька" (интерактивный гид по лексическим различиям Южной и Северной Кореи).\n\nВы можете изучать карточки слов прямо здесь, выбрав одну из категорий ниже, или запустить красивую визуальную версию приложения!',
    { attachments: [keyboard] }
  );
});

// Category button handler
bot.action(/cat:(.+)/, async (ctx) => {
  const category = ctx.match[1];
  const userId = ctx.user.user_id;
  userSessions[userId] = { category, index: 0 };

  const { text, keyboard } = getCardResponse(userId, category, 0);
  await ctx.reply(text, { format: 'markdown', attachments: [keyboard] });
});

// Next card handler
bot.action(/next:(.+):(\d+)/, async (ctx) => {
  const category = ctx.match[1];
  const currentIndex = parseInt(ctx.match[2], 10);
  const userId = ctx.user.user_id;
  const newIndex = currentIndex + 1;
  
  userSessions[userId] = { category, index: newIndex };
  const { text, keyboard } = getCardResponse(userId, category, newIndex);
  await ctx.reply(text, { format: 'markdown', attachments: [keyboard] });
});

// Previous card handler
bot.action(/prev:(.+):(\d+)/, async (ctx) => {
  const category = ctx.match[1];
  const currentIndex = parseInt(ctx.match[2], 10);
  const userId = ctx.user.user_id;
  const newIndex = currentIndex - 1;
  
  userSessions[userId] = { category, index: newIndex };
  const { text, keyboard } = getCardResponse(userId, category, newIndex);
  await ctx.reply(text, { format: 'markdown', attachments: [keyboard] });
});

// Return to menu handler
bot.action('menu', async (ctx) => {
  const keyboard = getMainMenuKeyboard();
  await ctx.reply('Выберите категорию карточек для изучения:', { attachments: [keyboard] });
});

// Fallback message for any other incoming user text
bot.on('message_created', async (ctx) => {
  if (ctx.message && ctx.message.text && ctx.message.text.startsWith('/start')) {
    return;
  }
  const keyboard = getMainMenuKeyboard();
  await ctx.reply(
    'Выберите категорию слов ниже или откройте полноценное Mini App 🐞',
    { attachments: [keyboard] }
  );
});

async function start() {
  await initBot();
  console.log("Starting MAX Messenger bot listener (Long Polling)...");
  bot.start();
}

start();
