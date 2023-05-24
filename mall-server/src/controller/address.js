// address controller

const Address = require('../models/Address')

/**
 * 创建收货地址
 * @param {String} username  用户名
 * @param {Object} data 地址的详细信息
 * @returns 
 */
async function createAddress(username, data) {
    const address = await Address.create({
        username,
        ...data //解构
    })
    return address
}

/**
 * 获取地址列表
 * @param {String} username 用户名
 * @returns 
 */
async function getAddressList(username) {
    const list = await Address.find({ username }).sort({ updatedAt: -1 })
    return list
}

/**
 * 获取单个地址，根据id
 * @param {String} id 
 */
async function getAddressById(id) {
    const address = await Address.findById(id)
    return address
}

/**
 * 更新收货地址
 * @param {String} id 
 * @param {String} username 
 * @param {Object} data 
 */
async function updateAddress(id, username, data) {
    const address = await Address.findOneAndUpdate(
        { _id: id, username }, //查询条件
        { username, ...data },//要更新的数据
        { new: true }
    )
    return address
}

module.exports = {
    createAddress, getAddressList, getAddressById, updateAddress
}