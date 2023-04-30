interface stockItem {
  date: string,
  code: string,
  name: string,
  open: number,
  high: number,
  low: number,
  trade: number,
  volunme: number,
  amount: number,
  pe_ratio: number,
  pb: number,
  market_cap: number,
  nmc: number,
  turn_over_ratio: number
}

// 筛选出大成交额
function getBigAmount (list: stockItem[], targetAmount = 100000000) {
  return list.filter((item) => {
    const { amount } = item
    return Number(amount) > targetAmount
  })
}

// 根据价格筛选
function filterByPrice (list: stockItem[], lowPrice = 1, highPrice = 999) {
  return list.filter((item) => {
    const trade = Number(item.trade)
    return trade > lowPrice && trade < highPrice
  })
}

// 根据PE筛选
function filterByPE (list: stockItem[], lowPE = 1, highPE = 99) {
  return list.filter((item) => {
    const { pe_ratio } = item
    return pe_ratio > lowPE && pe_ratio < highPE
  })
}

// 移除ST
function removeST (list: stockItem[]) {
  return list.filter((item) => {
    return !(/(ST)/.test(item.name))
  })
}

// 获取创业股
function getChuangye (list: stockItem[]) {
  return list.filter((item) => {
    return item.code[0] === '3'
  })
}

// 移除科创股，因为我还没法买
function removeKechuang (list: stockItem[]) {
  return list.filter((item) => {
    return item.code.substring(0, 3) !== '688'
  })
}

// 红T
function getRedT (list: stockItem[]) {
  return list.filter((item) => {
    let { open, high, low, trade } = item
    open = Number(open)
    high = Number(high)
    low = Number(low)
    trade = Number(trade)
    const divH = Math.abs(trade - open)
    const lineUpH = Math.abs(high - trade)
    const lineDownH = open - low
    const up = (trade - open) > 0
    return up && (lineUpH / divH) < 0.05 && (lineDownH / divH) > 2
  })
}

// 移除涨停
function removeLimitUp (list: stockItem[]) {
  return list.filter((item) => {
    const { trade, open } = item
    const changePercent = (trade - open) / open
    return changePercent < 9.8
  })
}

// 筛选出涨停
function getLimitUp (list) {
  return list.filter((item) => {
    const { changepercent } = item
    return Number(changepercent) > 9
  })
}

// 筛选出高换手率的股票
function getHighRatio (list, huanshoulv = 5) {
  return list.filter((item) => {
    const ratio = Number(item.turnoverratio)
    return ratio > huanshoulv
  })
}

export default {
  removeST,
  removeKechuang,
  getRedT,
  getChuangye,
  removeLimitUp,
  getLimitUp,
  getBigAmount,
  filterByPrice,
  getHighRatio,
  filterByPE
}
