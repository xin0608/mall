// order router
// 需要登录
const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const { createOrder, findOrder } = require('../controller/order')
router.prefix('/api/order')

// 创建订单
router.post('/', loginCheck, async (ctx, next) => {
    const username = ctx.session.userInfo.username
    const data = ctx.request.body

    try {
        const newOrder = await createOrder(username, data)
        ctx.body = new SuccessModel(newOrder)
    } catch (ex) {
        console.error(ex)
        ctx.body = new ErrorModel(10005, '创建订单错误')
    }
})

// 显示订单
router.get('/', loginCheck, async (ctx, next) => {
    const username = ctx.session.userInfo.username
    const list = await findOrder(username)
    ctx.body = new SuccessModel(list)
})

module.exports = router