import dayjs from 'dayjs'
import request from '../utils/request'
import { getTodayAll } from '../utils/stockSDK/collector'
import stockModel from '../models/stock'

export async function writeTodayStock () {
  const today = dayjs().format('YYYY-MM-DD')
  // 检测今日是否开市
  const data = await request(`http://tool.bitefu.net/jiari/?d=${today}`)
  const isOpen = Number(data) === 0 // 今日是否开市
  if (!isOpen) {
    return false
  }
  // 获取今日所有数据
  const allList = await getTodayAll()
  // 将数据写入数据库
  const docs = allList.map((item) => {
    const { code, name, open, high, low, trade, volume, amount, per, pb, mktcap, nmc, turnoverratio } = item
    return {
      date: today,
      code,
      name,
      open,
      high,
      low,
      trade,
      volume,
      amount,
      pe_ratio: per,
      pb,
      market_cap: mktcap,
      nmc,
      turn_over_ratio: turnoverratio
    }
  })
  const res = await stockModel.collection.insertMany(docs)
  console.log('插入新的股票行情=', res)
}
