// shop router
// 不依赖登录，所以不用登录验证
const router = require('koa-router')()
const { SuccessModel } = require('../res-model/index')
const { getShopList, getShopInfo, getProductsByShopId } = require('../controller/shop')

router.prefix('/api/shop')

// 附近(热门)商店列表
router.get('/hot-list', async (ctx, next) => {
    const list = await getShopList()
    ctx.body = new SuccessModel(list)
})

// 单个商店详情
router.get('/:id', async (ctx, next) => {
    const id = ctx.params.id
    const shop = await getShopInfo(id)
    ctx.body = new SuccessModel(shop)
})

// 查询（某个）商店的商品列表
router.get('/:id/products', async (ctx, next) => {
    const shopId = ctx.params.id
    const tab = ctx.query.tab || 'all' //默认为all
    const list = await getProductsByShopId(shopId, tab)
    ctx.body = new SuccessModel(list)
})

module.exports = router