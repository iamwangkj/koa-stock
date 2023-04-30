import Koa from 'koa'
import cors from '@koa/cors'
import compress from 'koa-compress'
import bodyParser from 'koa-body'
import mongoose from 'mongoose'
import routers from './routers'
import config from './config'
import codeMap from './config/codeMap'
import cron from './cron/index'
 
// 数据库链接
console.log('数据库连接：', config.mongodbUrl)
mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

// 启动定时任务
cron()

const app = new Koa()

/* start-给ctx注入resolve和reject */
app.context.resolve = function (data = null, subCode = 200) {
  const msg = codeMap[subCode] || '未知错误'
  // this.status = status
  this.body = {
    code: 0,
    subCode,
    msg,
    data
  }
}
app.context.reject = function (data = null, subCode = -1, message = '') {
  // Logger.error({ subCode, message: msg }) // 日志
  const msg = message || codeMap[subCode] || '未知错误'
  // this.status = status
  this.body = {
    code: -1,
    subCode,
    msg,
    data
  }
}
/* end-给ctx注入resolve和reject */

app
  .use(cors())
  .use(compress())
  .use(bodyParser())
  .use(routers.routes())
  .use(routers.allowedMethods())
  .on('error', (err, ctx) => {
    console.error('Ooops..\n', err)
  })
  .listen(config.port, () => {
    console.log(`Koa Server is running on http://localhost:${config.port}`)
  })
