import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  }
)

const m = model('policy', schema, 'policy_for_gwy') // 3个参数：modelName, schema, collectionName（自动小写），如果第三个参数不填，会自动生成复数（如可数）
m.createCollection().then(() => {
  console.log('policy collection 创建完毕')
})
export default m
