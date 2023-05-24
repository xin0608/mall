// user controller

const User = require('../models/User')

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns 
 */
async function register(username, password) {
    const newUser = await User.create({ username, password })
    return newUser
}

/**
 * 登录
 * @param {string} username 用户名
 * @param {string} password 密码 
 * @returns 
 */
async function login(username, password) {
    const user = await User.findOne({ username, password })
    if (user != null) {
        return true
    }
    return false
}

module.exports = {
    register, login
}