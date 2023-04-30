import schedule from 'node-schedule'
import { writeTodayStock } from './stock'
import { sendPolicy } from './policy'

// 定时任务
export default function cron () {
  // 定时存股票数据
  schedule.scheduleJob('0 30 15 * * *', () => {
    writeTodayStock()
  })

  // 定时发邮件通知国务院有新的政策
  schedule.scheduleJob('0 0,30 * * * *', () => {
    sendPolicy()
  })
}
