// order controller

const Order = require('../models/Order')
const Address = require('../models/Address')
const Product = require('../models/Product')

/**
 * 创建订单
 * @param {String} username 用户名
 * @param {Object} data 订单数据
 * @returns 
 */
async function createOrder(username, data) {
    const {
        addressId,
        shopId,
        shopName,
        isCanceled = false,
        products = []
    } = data

    // 获取address
    const address = await Address.findById(addressId)


    // 获取商品列表
    const pIds = products.map(p => p.id) //['商品1 id','商品2 id']
    const productList = await Product.find({
        shopId: shopId,
        _id: { $in: pIds }
    })

    // 整合订单购买数量
    const productListWithSales = productList.map(p => {
        // 商品 id
        const id = p._id.toString()

        // 找到商品的购买数量
        const filterProducts = products.filter(item => item.id === id)
        if (filterProducts.length === 0) {
            throw Error('未找到匹配的销量数据')
        }
        return {
            product: p,
            orderSales: filterProducts[0].num
        }
    })

    const newOrder = await Order.create({
        username,
        shopId,
        shopName,
        isCanceled,
        address,
        products: productListWithSales
    })

    return newOrder
}


// 显示自己的订单
async function findOrder(username) {
    const list = await Order.find({ username }).sort({ createdAt: -1 })
    return list
}

module.exports = {
    createOrder, findOrder
}