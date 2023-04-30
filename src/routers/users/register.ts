import Router from 'koa-router'
import Joi from 'joi'
import _ from 'lodash'
import md5 from 'md5'
import userModel from '../../models/user'
import jwt from '../../utils/jwt'

const router = new Router()
router.post('/register', async ctx => {
  try {
    const params = ctx.request.body
    const validator = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
    const validateRes = validator.validate(params)
    const errMsg = _.get(validateRes, 'error.details.0.message')
    if (errMsg) {
      return ctx.reject(null, 400, errMsg)
    }
    let { username, password } = params
    password = md5(password)
    // 验证密码
    const userInfo = await userModel.findOne({ name: username })
    if (userInfo) {
      ctx.throw(403, '该用户已存在')
    }
    const res = await userModel.create({ name: username, password })
    // 返回token
    
    const token = jwt.sign(res.id)
    ctx.resolve({ token })
  } catch (err) {
    const subCode = err.status || 500
    ctx.reject(null, subCode, err.message)
  }
})

export default router
