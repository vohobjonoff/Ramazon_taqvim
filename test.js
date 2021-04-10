const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");

require("dotenv/config");

const bot = new Telegraf(process.env.TOKEN);

bot.command("start", async (ctx) => {
    console.log('bot ishga tushdi')
    const user = ctx.message.from.username ? ctx.message.from.username : ctx.message.from.first_name
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
            [`Тошкент шаҳри`, `Андижон вилояти`],
            [`Фарғона вилояти`, `Наманган вилояти`],
            [`Сирдарё вилояти`, `Жиззах вилояти`],
            [`Самарқанд вилояти`, `Қашқадарё вилояти`],
            [`Навоий вилояти`, `Бухоро вилояти`],
            [`Хоразм вилояти`, `Нукус`]
        ])
            .oneTime()
            .resize()
            .extra()
    );
});

bot.hears(`Тошкент шаҳри`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Toshkent.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Андижон вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Andijon.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Фарғона вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: `./images/Fargona.png` }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot viloyati` })
})

bot.hears(`Наманган вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Namangan.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Сирдарё вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Sirdaryo.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Жиззах вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Jizzax.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Самарқанд вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Samarqand.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Қашқадарё вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Qashqadaryo.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Бухоро вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Buxoro.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Навоий вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Navoiy.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Хоразм вилояти`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Xorazm.png' }, {
        caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

@ramazan_taqvimbot` })
})

bot.hears(`Нукус`, async (ctx, next) => {
    await ctx.replyWithPhoto({ source: './images/Nukus.png' }, { caption: `2021 йил муборак Рамазон ойининг бошланиши 13 апрель кунига тўғри келади.  Тақвимдаги маълумотлар эҳтиётлик заруратидан, бир кун олдинги вақт ҳам қўшиб кўрсатилган!

    @ramazan_taqvimbot` })
})

bot.launch()