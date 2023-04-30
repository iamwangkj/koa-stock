import Router from 'koa-router'
import login from './login'
import register from './register'

const router = new Router({
  prefix: '/users'
})
router.use(login.routes())
router.use(register.routes())

export default router
