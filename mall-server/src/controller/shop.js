// shop controller

const Shop = require('../models/Shop')
const Product = require('../models/Product')

// 获取商店列表
async function getShopList() {
    const shopList = await Shop.find().sort({ _id: -1 })
    return shopList
}

// 单个商店信息
async function getShopInfo(id) {
    const shop = await Shop.findById(id)
    return shop
}

/**
 * 根据商店获取商品
 * @param {String} shopId 商店id
 * @param {String} tab tab分类
 */
async function getProductsByShopId(shopId, tab = 'all') {
    const list = await Product.find({
        shopId,
        tabs: {
            $in: tab
        }
    })
    return list
}

module.exports = {
    getShopList, getShopInfo, getProductsByShopId
}

