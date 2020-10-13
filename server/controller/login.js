const bcrypt = require('bcrypt')
const model_user = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res, next) => {
    const user = await model_user.findOne({ username: req.body.username })

    if (!user) {
        return res.status(400).json({ message: "Đăng nhập không thành công!" })
    }

    const check_password = await bcrypt.compare(req.body.password, user.password)

    if (!check_password) {
        return res.status(400).json({ message: "Đăng nhập không thành công!" })
    }

    // Dang nhap thanh cong
    const user_for_token = {
        name: user.name
    }
    const token = jwt.sign(user_for_token, process.env.SECRET)
    return res.status(200).json(token)
}

module.exports = login