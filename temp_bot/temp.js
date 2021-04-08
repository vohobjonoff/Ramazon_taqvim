const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");
const Extra = require("telegraf/extra");
const axios = require('axios')
const localization = require("../localization.json");

require("dotenv/config");

const bot = new Telegraf(process.env.TOKEN);


const taqvimScene = new WizardScene(
    'taqvim',
    (ctx) => {
        ctx.reply(
            `Assalomu alaykum ${ctx.message.chat.username}`,
            Markup.keyboard(
                [
                    Markup.callbackButton(`Ramazon taqvimi`, `ramazon`),
                    Markup.callbackButton(`Namoz vaqtlari`, 'namoz'),
                ],
                { columns: 2 }
            )
                .oneTime()
                .resize()
                .extra()
        );

        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.reply(
            'Mavjud viloyatlar',
            Markup.keyboard(
                [
                    Markup.callbackButton(`Toshkent shahri`, `Toshkent`),
                    Markup.callbackButton(`Andijon viloyati`, 'Andijon'),
                    Markup.callbackButton(`Farg'ona viloyati`, 'Jizzax'),
                    Markup.callbackButton(`Namangan viloyati`, 'Qashqadaryo'),
                    Markup.callbackButton(`Sirdaryo viloyati`, 'Buxoro'),
                    Markup.callbackButton(`Jizzax viloyati`, 'Xorazm'),
                    Markup.callbackButton(`Samarqand viloyati`, 'Namangan'),

                    Markup.callbackButton(`Samarqand viloyati`, `Andijon`),
                    Markup.callbackButton(`Qashqadaryo viloyati`, 'Namangan'),
                    Markup.callbackButton(`Surxondaryo viloyati`, 'Jizzax'),
                    Markup.callbackButton(`Buxoro viloyati`, 'Qashqadaryo'),
                    Markup.callbackButton(`Navoiy viloyati`, 'Buxoro'),
                    Markup.callbackButton(`Xorazm viloyati`, 'Xorazm'),
                    Markup.callbackButton(`Nukus viloyati`, 'Namangan'),
                ],
                {
                    columns: 2
                })
                .oneTime()
                .resize()
                .extra()
        );
        bot.action('ramazon', (ctx, next) => {
            ctx.scene.enter("taqvim");
            return ctx.reply('👍').then(() => next())
        })
        return ctx.wizard.next();
    }
)

const stage = new Stage([taqvimScene]); // Scene registration
bot.use(session());
bot.use(stage.middleware());

bot.command("start", async (ctx) => {
    ctx.scene.enter("taqvim");
});


bot.launch()