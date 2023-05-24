// User Model

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
}, { timestamps: true })

const User = mongoose.model('user', Schema)

module.exports = User