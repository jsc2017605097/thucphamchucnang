const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    name: { type: String},
})

module.exports = mongoose.model('user', userSchema)