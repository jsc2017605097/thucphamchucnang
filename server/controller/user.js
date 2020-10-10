const route_user = require('express').Router()
const model_user = require('../model/user')
const bcrypt = require('bcrypt')

route_user.post('/', async (req, res, next) => {
    const user = {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        name:req.body.name
    }

    const user_saved = await (new model_user(user)).save()
    return res.status(200).json({ message: "create new user...", user: user_saved })
})

module.exports = route_user