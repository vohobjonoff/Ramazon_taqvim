const axios = require("axios");
const router = require('express').Router()
const Users = require('./models/users')

router.get('/', async(req,res)=>{
    res.send('salom')
})

router.post('/', async (req, res) => {
    try {
        const users = new Users({
            // username: req.body.username,
            // nickname: req.body.nickname,
            id: req.body.id
        })
        const saved = await users.save()
        res.json(saved)

    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router