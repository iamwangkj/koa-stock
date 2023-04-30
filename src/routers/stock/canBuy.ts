import Router from 'koa-router'
import dayjs from 'dayjs'
import joi from 'joi'
import _ from 'lodash'
import stockModel from '../../models/stock'
import stockFilter from '../../utils/stockSDK/filter'

const router = new Router()

router.get('/canBuy', async ctx => {
  try {
    // 校验参数
    const validator = joi.object({
      date: joi.string().required()
    })
    const params = validator.validate(ctx.request.query)
    const errMsg = _.get(params, 'error.details.0.message')
    if (errMsg) {
      return ctx.reject(null, 400, errMsg)
    }

    let { date } = params.value
    date = dayjs(date).format('YYYY-MM-DD')
    let res = await stockModel.find({ date })
    res = stockFilter.filterByPrice(res, 5, 50)
    res = stockFilter.removeKechuang(res)
    res = stockFilter.removeST(res)
    res = stockFilter.removeLimitUp(res)
    res = stockFilter.filterByPE(res, 1, 2)
    console.log('筛选出的长度=', res.length)
    ctx.resolve(res)
  } catch (err) {
    const subCode = err.status || 500
    ctx.reject(null, subCode, err.message)
  }
})

export default router
