//登录验证中间件

const { ErrorModel } = require('../res-model/index')

module.exports = async (ctx, next) => {
    const session = ctx.session || {}
    const userInfo = session.userInfo
    if (userInfo && userInfo.username) {
        // 登录验证通过
        await next()
        return
    }
    ctx.body = new ErrorModel(10003, '登录验证失败')
    // ctx.body = {
    //     errno: -1,
    //     message: '登录验证失败'
    // }
}