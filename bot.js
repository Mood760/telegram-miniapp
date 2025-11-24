const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

const BOT_TOKEN = "8375090696:AAEKdJVp5EngjtiQLvzh38ZsDJtIaPvnc9c";
const WEBAPP_URL = "https://mood760.github.io/telegram-miniapp/";

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
