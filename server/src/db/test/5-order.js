// 订单数据操作

const Order = require('../../models/Order')
const Address = require('../../models/Address')
const Product = require('../../models/Product')

!(async () => {
    // 创建订单
    const requestBody = {
        addressId: '64034a6117d6ce2ebcc491aa',
        shopId: '64034f88907a6d1070ffbc1d',
        shopName: '山姆会员商店',
        isCanceled: false,
        products: [
            {
                id: '64035366784831139869378a',
                num: 3
            },
            {
                id: '64035366784831139869378b',
                num: 5
            }
        ]
    }

    // 获取address
    const address = await Address.findById(requestBody.addressId)


    // 获取商品列表
    const pIds = requestBody.products.map(p => p.id) //['商品1 id','商品2 id']
    const productList = await Product.find({
        shopId: requestBody.shopId,
        _id: { $in: pIds }
    })

    // 整合订单购买数量
    const productListWithSales = productList.map(p => {
        // 商品 id
        const id = p._id.toString()

        // 找到商品的购买数量
        const filterProducts = requestBody.products.filter(item => item.id === id)
        if (filterProducts.length === 0) {
            throw Error('未找到匹配的销量数据')
        }
        return {
            product: p,
            orderSales: filterProducts[0].num
        }
    })


    await Order.create({
        username: '19997980078',
        shopId: requestBody.shopId,
        shopName: requestBody.shopName,
        isCanceled: requestBody.isCanceled,
        address,
        products: productListWithSales
    })


})()