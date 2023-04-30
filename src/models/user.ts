import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    mobile: { // 手机
      type: String,
      default: ''
    },
    sex: {
      type: Number,
      default: 2
    },
    birthday: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

const m = model('User', schema, 'users') // 3个参数：modelName, schema, collectionName（自动小写），如果第三个参数不填，会自动生成复数（如可数）
m.createCollection().then(() => {
  console.log('User Collection 创建完毕')
})
export default m
