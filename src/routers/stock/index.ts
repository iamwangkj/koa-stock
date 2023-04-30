import Router from 'koa-router'
import redt from './redt'
import canBuy from './canBuy'

const router = new Router({
  prefix: '/stock'
})

router.use(redt.routes())
router.use(canBuy.routes())

export default router
