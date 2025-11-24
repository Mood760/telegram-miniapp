const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

const BOT_TOKEN = "YOUR_BOT_TOKEN";
const WEBAPP_URL = "https://your-miniapp-url.com";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(
        "مرحباً! اضغط على زر فتح المتجر:",
        Markup.inlineKeyboard([
            Markup.button.webApp("فتح المتجر 📱", WEBAPP_URL)
        ])
    );
});

bot.launch();
console.log("✅ Bot is running");
