// address router

// 需要进行登录校验
const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const { createAddress, getAddressList, getAddressById, updateAddress } = require('../controller/address')
router.prefix('/api/user/address')


// 创建收货地址
router.post('/', loginCheck, async (ctx, next) => {
    const username = ctx.session.userInfo.username
    const data = ctx.request.body

    // 创建数据，捕获异常
    try {
        const newAddress = await createAddress(username, data)
        ctx.body = new SuccessModel(newAddress)
    } catch (ex) {
        console.error(ex)
        ctx.body = new ErrorModel(10004, '创建收货地址失败')
    }

})

// 获取收货地址列表
router.get('/', loginCheck, async (ctx, next) => {
    const username = ctx.session.userInfo.username
    const list = await getAddressList(username)
    ctx.body = new SuccessModel(list)
})

// 获取单个收货地址
router.get('/:id', loginCheck, async (ctx, next) => {
    const id = ctx.params.id //获取动态参数
    const address = await getAddressById(id)
    ctx.body = new SuccessModel(address)
})

// 更新收货地址
router.patch('/:id', loginCheck, async (ctx, next) => {
    const id = ctx.params.id
    const username = ctx.session.userInfo.username
    const data = ctx.request.body
    const newAddress = await updateAddress(id, username, data)
    ctx.body = new SuccessModel(newAddress)
})

module.exports = router