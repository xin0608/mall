// 用户数据操作

const User = require('../../models/User')

!(async () => {
    // 注册：创建一个新的用户
    // await User.create({
    //     username: '19997980078',
    //     password: '123abc'
    // })

    // 再创建一个用户
    // await User.create({
    //     username: '19997980012',
    //     password: '123abc'
    // })

    // 登录 & 获取用户信息：查询单个用户
    const user = await User.findOne({
        username: '19997980078',
        password: '123abc'
    })
    console.log('user', user)
})()