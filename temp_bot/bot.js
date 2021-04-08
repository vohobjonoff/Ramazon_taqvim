const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");
const Extra = require("telegraf/extra");

const axios = require("axios");
const localization = require("../localization.json");
const functions = require("./functions");
require("dotenv/config");

const bot = new Telegraf(process.env.TOKEN);
const telegram = new Telegraf.Telegram(process.env.TOKEN);

// love calculator two-step wizard
const orderScene = new WizardScene(
    "order",
    (ctx) => {
        console.log("started");

        ctx.reply(
            `Assalomu alaykum ${ctx.from.first_name}, iltimos kerakli bo'limni tanlang:`,
            Markup.keyboard([["Ramazon taqvimi", "Namoz vaqtlari"]])
                .oneTime()
                .resize()
                .extra()
        );

        // next stage
        return ctx.wizard.next();
    },
    (ctx) => {

        // let language = ctx.message.text;
        // console.log(language);
        // if (language == "Ramazon taqvimi") language = "uz";

        // if (!ctx.wizard.state.language) {
        //     else {
        //         ctx.reply(
        //             `${localization.option_error.uz}\n${localization.option_error.ru}`
        //         );
        //         ctx.wizard.back();
        //         return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        //     }

        //     ctx.wizard.state.language = language;
        // }

        ctx.reply(
            localization.category[ctx.wizard.state.language],
            Markup.inlineKeyboard(
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
                    // [localization.books[ctx.wizard.state.language]],
                    // [localization.videos[ctx.wizard.state.language]],
                ],
                {
                    columns: 2
                })
                .oneTime()
                .resize()
                .extra()
        );

        // next stage
        return ctx.wizard.next();
    },

    (ctx) => {
        if (!ctx.wizard.state.phone) {
            console.log(ctx.wizard.state);
            if (ctx.message.contact)
                ctx.wizard.state.phone = ctx.message.contact.phone_number;
            else {
                if (functions.phoneNumberValidator(ctx.message.text)) {
                    ctx.wizard.state.phone = ctx.message.text;
                } else {
                    ctx.reply(
                        `${localization.phone_error[ctx.wizard.state.language]}`
                    );
                    ctx.wizard.back();
                    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
                }
            }
        }



        // next stage
        return ctx.wizard.next();
    },
    async (ctx) => {
        let msg = ctx.message.text;

        if (msg == localization.books[ctx.wizard.state.language]) {
            ctx.wizard.state.category = "book";
            console.log(ctx.wizard.state.category);
            const books = await axios.get(
                `${localization.base_url}/books?type=book`
            );

            const buttons = [];

            books.data.data.forEach((book) => {
                buttons.push([`📚 ${book.name[ctx.wizard.state.language]} 📚`]);
            });
            buttons.push([localization.back[ctx.wizard.state.language]]);

            ctx.reply(
                localization.available_books[ctx.wizard.state.language],
                Markup.keyboard(buttons).oneTime().resize().extra()
            );
        } else if (msg == localization.videos[ctx.wizard.state.language]) {
            ctx.wizard.state.category = "video";
            console.log(ctx.wizard.state.category);

            const books = await axios.get(
                `${localization.base_url}/books?type=video`
            );

            const buttons = [];
            books.data.data.forEach((book) => {
                buttons.push([`💿 ${book.name[ctx.wizard.state.language]} 💿`]);
            });
            buttons.push([localization.back[ctx.wizard.state.language]]);

            ctx.reply(
                localization.available_videos[ctx.wizard.state.language],
                Markup.keyboard(buttons).oneTime().resize().extra()
            );
        } else {
            return ctx.reply(localization.option[ctx.wizard.state.language]);
        }

        // next stage
        return ctx.wizard.next();
    },
    (ctx) => {
        let msg = ctx.message.text;

        if (msg == localization.back[ctx.wizard.state.language]) {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor - 1](ctx);
        } else {
            ctx.wizard.state.book = ctx.message.text;
            ctx.reply(
                localization.location[ctx.wizard.state.language],
                Extra.markup((markup) => {
                    return markup
                        .resize()
                        .keyboard([
                            markup.locationRequestButton(
                                localization.location[ctx.wizard.state.language]
                            ),
                            localization.next[ctx.wizard.state.language],
                        ]);
                })
            );
        }

        // next stage
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text != localization.next[ctx.wizard.state.language])
            ctx.wizard.state.location = ctx.message.location;
        ctx.wizard.state.name = ctx.message.chat.first_name;
        ctx.wizard.state.username = ctx.message.chat.username;
        ctx.wizard.state.order_from = "telegram";

        const res = await axios.post(
            `${localization.base_url}/orders`,
            ctx.wizard.state
        );

        if (res.data.success) {
            ctx.reply(localization.thanks[ctx.wizard.state.language], {
                reply_markup: { remove_keyboard: true },
            });
            ctx.reply(
                `${ctx.from.first_name}, ${localization.again[ctx.wizard.state.language]
                }`
            );
        } else {
            return ctx.reply(localization.error[ctx.wizard.state.language]);
        }

        return ctx.scene.leave();
    }
);

const adminScene = new WizardScene(
    "admin",
    (ctx) => {
        ctx.reply("E'lon uchun Rasm / Video jo'nating:");

        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.message.photo) {
            ctx.wizard.state.content_type = "image";
            ctx.wizard.state.image =
                ctx.message.photo[ctx.message.photo.length - 1].file_id;
        } else if (ctx.message.video) {
            console.log("Video ...........");
            ctx.wizard.state.content_type = "video";
            ctx.wizard.state.video = ctx.message.video.file_id;
        } else {
            ctx.wizard.state.content_type = "text";
        }
        // ctx.replyWithPhoto(
        //     ctx.message.photo[ctx.message.photo.length - 1].file_id,
        //     Extra.caption("test")
        // );
        ctx.reply("E'lon matnini jo'nating:");

        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.caption = ctx.message.text;

        const res = await axios.get(`${localization.base_url}/users`);
        let users = [];

        if (res.data.success) {
            users = res.data.data;
        }

        // console.log(users);

        users.forEach((user) => {
            setTimeout(() => {
                if (ctx.wizard.state.content_type == "image") {
                    telegram.sendPhoto(
                        user.telegram_id,
                        ctx.wizard.state.image,
                        Extra.caption(ctx.wizard.state.caption)
                    );
                } else if (ctx.wizard.state.content_type == "video") {
                    telegram.sendVideo(
                        user.telegram_id,
                        ctx.wizard.state.video,
                        Extra.caption(ctx.wizard.state.caption)
                    );
                } else {
                    telegram.sendMessage(
                        user.telegram_id,
                        ctx.wizard.state.caption
                    );
                }
            }, 200);
        });

        return ctx.scene.leave();
    }
);

const bookScene = new WizardScene(
    "book",
    (ctx) => {
        ctx.reply(
            "Qanday darslik qo'shmoqchisiz?",
            Markup.keyboard([["Kitob", "Video darslik"]])
                .oneTime()
                .resize()
                .extra()
        );

        return ctx.wizard.next();
    },
    (ctx) => {
        let type = ctx.message.text;
        if (type == "Kitob") type = "book";
        else if (type == "Video darslik") type = "video";
        else {
            ctx.reply("Faqat berilgan tugmalardan foydalaning!");
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }

        ctx.wizard.state.type = type;

        ctx.reply("Darslikning o'zbekcha nomini kiriting:");
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.name_uz = ctx.message.text;

        ctx.reply("Darslikning ruscha nomini kiriting:");
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.name_ru = ctx.message.text;

        ctx.reply(
            `Yangi darslik:
        
        nomi:
            uz: ${ctx.wizard.state.name_uz}
            ru: ${ctx.wizard.state.name_ru}
        turi: ${ctx.wizard.state.type}
        
        Hammasi to'g'rimi?`,
            Markup.keyboard([["Ha", "Yo'q"]])
                .oneTime()
                .resize()
                .extra()
        );

        ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text == "Ha") {
            let book = {
                name: {
                    uz: ctx.wizard.state.name_uz,
                    ru: ctx.wizard.state.name_ru,
                },
                type: ctx.wizard.state.type,
            };
            const res = await axios.post(
                `${localization.base_url}/books`,
                book
            );
            if (res.data.success) {
                ctx.reply("Muvaffaqiyatli qo'shildi!");
            } else {
                ctx.reply("Xatolik yuz berdi");
            }
        } else {
            ctx.wizard.back();
            return ctx.wizard.steps[ctx.wizard.cursor - 3](ctx);
        }

        return ctx.scene.leave();
    }
);

const stage = new Stage([orderScene, adminScene, bookScene]); // Scene registration
bot.use(session());
bot.use(stage.middleware());

bot.command("start", async (ctx) => {
    try {
        const res = await axios.get(
            `${localization.base_url}/users/${ctx.message.chat.id}`
        );
    } catch (err) {
        await axios.post(`${localization.base_url}/users`, {
            telegram_id: ctx.message.chat.id,
        });
    }

    ctx.scene.enter("order");
});

bot.command("elon", (ctx) => {
    ctx.scene.enter("admin");
});

bot.command("darslik", (ctx) => {
    ctx.scene.enter("book");
});

bot.command("test", (ctx) => {
    let a = [];
    let x;
    while (a.length < 6) {
        x = Math.floor(Math.random() * 36) + 1;
        if (!a.includes(x)) {
            a.push(x);
        }
    }
    ctx.reply(a);
});

bot.on("message", (ctx) => {
    ctx.reply(`${localization.start.uz}\n${localization.start.ru}`);
});


bot.launch();
