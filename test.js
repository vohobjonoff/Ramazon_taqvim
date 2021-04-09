const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");

require("dotenv/config");

const bot = new Telegraf(process.env.TOKEN);

bot.command("start", async (ctx) => {
    console.log('bot ishga tushdi')
    const user = ctx.message.from.username ? ctx.message.from.username : ctx.message.from.first_name
    console.log(user)
    ctx.reply(
        `Assalomu alaykum ${ctx.message.from.first_name}`,
        Markup.keyboard([[`Ramazon taqvimi`]])
            .oneTime()
            .resize()
            .extra()
    )
})


bot.hears("Ramazon taqvimi", async (ctx) => {
    ctx.reply(
        'Viloyatni tanlang:',
        Markup.keyboard([
            [`Toshkent shahri`, `Andijon viloyati`],
            [`Farg'ona viloyati`, `Namangan viloyati`],
            [`Sirdaryo viloyati`, `Jizzax viloyati`],
            [`Samarqand viloyati`, `Qashqadaryo viloyati`],
            [`Navoiy viloyati`, `Buxoro viloyati`],
            [`Xorazm viloyati`, `Nukus`]
        ])
            .oneTime()
            .resize()
            .extra()
    );
});

bot.hears(`Toshkent shahri`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Toshkent.png' }, { caption: `Toshkent shahri` })
})

bot.hears(`Andijon viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Andijon.png' }, { caption: `Andijon viloyati` })
})

bot.hears(`Farg'ona viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: `./images/Fargona.png` }, { caption: `Farg'ona viloyati` })
})

bot.hears(`Namangan viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Namangan.png' }, { caption: `Namangan viloyati` })
})

bot.hears(`Sirdaryo viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Sirdaryo.png' }, { caption: `Sirdaryo viloyati` })
})

bot.hears(`Jizzax viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Jizzax.png' }, { caption: `Jizzax viloyati` })
})

bot.hears(`Samarqand viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Samarqand.png' }, { caption: `Samarqand viloyati` })
})

bot.hears(`Qashqadaryo viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Qashqadaryo.png' }, { caption: `Qashqadaryo viloyati` })
})

bot.hears(`Buxoro viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Buxoro.png' }, { caption: `Buxoro viloyati` })
})

bot.hears(`Navoiy viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Navoiy.png' }, { caption: `Navoiy viloyati` })
})

bot.hears(`Xorazm viloyati`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Xorazm.png' }, { caption: `Xorazm viloyati` })
})

bot.hears(`Nukus`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Nukus.png' }, { caption: `Nukus` })
})

bot.launch()