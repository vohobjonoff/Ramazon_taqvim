const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");
const Extra = require("telegraf/extra");
const axios = require('axios')
const localization = require("./localization.json");

require("dotenv/config");

const bot = new Telegraf(process.env.TOKEN);

bot.command("start", async (ctx) => {
    ctx.reply(
        `Assalomu alaykum ${ctx.message.chat.first_name}`,
        Markup.keyboard([[`Ramazon taqvimi`, 'namoz']])
            .oneTime()
            .resize()
            .extra()
    )
})


bot.hears("Ramazon taqvimi", async (ctx) => {
    ctx.reply(
        'Viloyatni tanlang',
        Markup.keyboard([
            [`Toshkent shahri`, `Andijon viloyati`],
            [`Farg'ona viloyati`, `Namangan viloyati`],
            [`Sirdaryo viloyati`, `Jizzax viloyati`],
            [`Samarqand viloyati`, `Qashqadaryo viloyati`],
            [`Surxondaryo viloyati`, `Buxoro viloyati`],
            [`Navoiy viloyati`, `Xorazm viloyati`],
            [`Nukus viloyati`]
        ])
            .oneTime()
            .resize()
            .extra()
    );
});

bot.hears('Toshkent shahri', (ctx, next) => {
    return   ctx.replyWithPhoto('https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg')
})
bot.hears('Andijon viloyati', (ctx, next) => {
    return ctx.reply('askldfjaklsdf').then(() => next())
})
bot.hears('Buxoro', (ctx, next) => {
    return ctx.reply('123124124').then(() => next())
})


bot.launch()