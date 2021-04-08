const express = require('express')
const mongoose = require('mongoose')
const usersRouter = require('./userRouter')

const app = express()

const DB = 'mongodb+srv://RustamovRR:<riskiddin98>@cluster0.895v8.mongodb.net/Ramazan_taqvimbot?retryWrites=true&w=majority'
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(console.log('bazaga ulandi'))

app.use('/', usersRouter)

app.listen(5000, () => {
    console.log('listen port')
})