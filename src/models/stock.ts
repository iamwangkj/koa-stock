import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    date: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    open: {
      type: Number,
      default: 0
    },
    high: {
      type: Number,
      default: 0
    },
    low: {
      type: Number,
      default: 0
    },
    trade: {
      type: Number,
      default: 0
    },
    volume: {
      type: Number,
      default: 0
    },
    amount: {
      type: Number,
      default: 0
    },
    pe_ratio: {
      type: Number,
      default: 0
    },
    pb: {
      type: Number,
      default: 0
    },
    market_cap: {
      type: Number,
      default: 0
    },
    nmc: {
      type: Number,
      default: 0
    },
    turn_over_ratio: {
      type: Number,
      default: 0
    }
  }
)

const m = model('stock', schema, 'stock_all') // 3个参数：modelName, schema, collectionName（自动小写），如果第三个参数不填，会自动生成复数（如可数）
m.createCollection().then(() => {
  console.log('stock_all collection 创建完毕')
})
export default m
