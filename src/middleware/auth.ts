import Koa from 'koa'
import _ from 'lodash'
import jwt from '../utils/jwt'

export async function isLogin (ctx: Koa.Context, next: Koa.Next): Promise<void> {
  try {
    const token = _.get(ctx, 'headers.token')
    const verifyRes = jwt.verify(token)
    if (!verifyRes.userId) {
      ctx.throw(401, '未登录')
    }

    console.log('已登录，进入下一步')
    ctx.state.userId = verifyRes.userId
    return await next()
  } catch (err) {
    return ctx.reject(null, err.status, err.message)
  }
}
