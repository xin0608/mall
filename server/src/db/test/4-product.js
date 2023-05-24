// 商品数据操作

const Product = require('../../models/Product')

!(async () => {
    // 创建几个商品
    // await Product.create({
    //     shopId: '64034f88907a6d1070ffbc1c',
    //     name: '葡萄 250g/份',
    //     imgUrl: '/images/product/grape.jpg',
    //     sales: 100,
    //     price: 33.6,
    //     oldPrice: 40.6,
    //     tabs: ['all', 'seckill', 'fruit']
    // })
    // await Product.create({
    //     shopId: '64034f88907a6d1070ffbc1c',
    //     name: '苹果 250g/份',
    //     imgUrl: '/images/product/apple.jpeg',
    //     sales: 200,
    //     price: 25,
    //     oldPrice: 27,
    //     tabs: ['all', 'seckill', 'fruit']
    // })
    // await Product.create({
    //     shopId: '64034f88907a6d1070ffbc1d',
    //     name: '桃子 250g/份',
    //     imgUrl: '/images/product/peach.jpg',
    //     sales: 520,
    //     price: 16,
    //     oldPrice: 19,
    //     tabs: ['all', 'seckill', 'fruit']
    // })
    // await Product.create({
    //     shopId: '64034f88907a6d1070ffbc1d',
    //     name: '西瓜 250g/份',
    //     imgUrl: '/images/product/watermelon.jpg',
    //     sales: 270,
    //     price: 13,
    //     oldPrice: 15,
    //     tabs: ['all', 'seckill', 'fruit']
    // })

    // 查询某个商店,某个tab的商品列表
    const list = await Product.find({
        shopId: '64034f88907a6d1070ffbc1d',
        tabs: {
            $in: 'seckill'
        }
    })
    console.log(list)

})()