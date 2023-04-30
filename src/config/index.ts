const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

export default {
  env,
  isDev,
  port: 3000, // 端口号
  mongodbUrl: 'mongodb://127.0.0.1:27017/stock' // 数据库配置
}
