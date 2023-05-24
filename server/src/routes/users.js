// user router

const router = require('koa-router')()
const { register, login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 创建时进行异常捕获
  try {
    const newUser = await register(username, password)
    ctx.body = new SuccessModel(newUser)
    // ctx.body = {
    //   errno: 0,
    //   data: newUser //多返回一个信息，防止前端有需求变动，再来找后端修改代码
    // }
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(10001, `注册失败 - ${ex.message}`)
    // ctx.body = {
    //   errno: 10001,
    //   message: `注册失败 - ${ex.message}`
    // }
  }
})

// 登录
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const res = await login(username, password)
  if (res) {
    // 登录成功
    ctx.session.userInfo = { username } //设置session

    ctx.body = new SuccessModel()
  } else {
    // 登录失败
    ctx.body = new ErrorModel(10002, '登录验证失败')
  }
})

module.exports = router
