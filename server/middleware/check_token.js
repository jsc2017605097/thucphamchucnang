const jwt = require('jsonwebtoken')
require('dotenv').config()

const check_token = (req, res, next) => {
    const token_browser = req.get("authorization")
    const token_server = token_browser.substring(7)
    const decode_token = jwt.verify(token_server, process.env.SECRET)

    if (!decode_token) {
        return res.status(400).json({ message: "Lỗi token, vui lòng đăng nhập lại!" })
    }

    req.decode_token = decode_token
    next()
}

module.exports = check_token