const Telegraf = require("telegraf");
require("dotenv/config");

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
    ctx.replyWithPhoto('http://zamonaviy.com/_nw/386/87435360.jpg')
})

bot.command('rasm', (ctx) => {
    ctx.replyWithPhoto('http://zamonaviy.com/_nw/386/87435360.jpg')
})

bot.launch();