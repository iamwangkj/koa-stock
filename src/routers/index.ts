import Router from 'koa-router'
import users from './users'
import stock from './stock'

const router = new Router()
router.use(users.routes())
router.use(stock.routes())
router.get('/node', async ctx => {
  ctx.resolve({ 'process.env.NODE_ENV': process.env.NODE_ENV })
})

export default router
