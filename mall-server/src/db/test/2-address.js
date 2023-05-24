// 地址数据操作

const Address = require('../../models/Address')

!(async () => {
    // 创建收货地址
    // await Address.create({
    //     username: '19787980078',
    //     city: '重庆市',
    //     department: 'xy小区',
    //     houseNumber: '门牌号22',
    //     name: '李四',
    //     phone: '19787980078',
    // })

    // 获取收货地址列表
    // const addressList = await Address.find({ username: '19997980078' }).sort({ updatedAt: -1 })
    // console.log(addressList)

    // 根据id获取单个收货地址
    // const id = '64034ad745c67c13ec35e1cc'
    // const address = await Address.findById(id)
    // console.log(address)

    // 更新收货地址
    const id = '64034ad745c67c13ec35e1cc'
    const newData = {
        department: 'xx小区A栋',
        houseNumber: '门牌号23',
        name: '张五',
        phone: '19787980908',
    }
    const address = await Address.findOneAndUpdate(
        { _id: id, username: '19997980078' },
        newData,
        {
            new: true //返回更新之后的最新数据(默认是false,返回更新之前的数据)
        }
    )
    console.log(address)

})()