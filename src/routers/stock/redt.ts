import Router from 'koa-router'

const router = new Router()

router.get('/redt', async ctx => {
  try {
    ctx.resolve('allList')
  } catch (err) {
    const subCode = err.status || 500
    ctx.reject(null, subCode, err.message)
  }
})

export default router
