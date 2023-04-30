
import axios from 'axios'
import cheerio from 'cheerio'
import _ from 'lodash'
import { sendMail } from '../utils/mailer'
import policyModel from '../models/policy'

interface PolicyItem {
  title: string,
  url: string,
  date: string
}

export async function sendPolicy () {
  try {
    // 爬取新的政策
    const resList: Array<PolicyItem> = [] // 存放结果的数组
    const url = 'http://www.gov.cn/zhengce/index.htm'
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    $('.latestPolicy_left_item').each((index, el) => {
      const a = $(el).find('a')
      const title = a.text()
      const itemUrl: string = a.attr('href') || ''
      const date = $(el).find('span').text()
      const item = {
        title,
        url: /http|https/.test(itemUrl) ? itemUrl : `http://www.gov.cn${itemUrl}`,
        date
      }
      resList.push(item)
    })
    
    // 构建出数据库没有的、新的列表
    const newPolicyList: Array<PolicyItem> = []
    let i = 0
    const len = resList.length
    while (i < len - 1) {
      const item = resList[i]
      const { title } = item
      const res = await policyModel.findOne({ title })
      if (!_.get(res, 'title')) {
        newPolicyList.push(item)
      }
      i++
    }

    // 有新的政策发布了，插入数据库并发通知
    const newLen = newPolicyList.length
    console.log('新政策的条数为', newLen)
    if (newLen === 0) {
      return false
    }
    await policyModel.insertMany(newPolicyList)

    // 发邮件通知有新的政策发布了
    let html = ''
    newPolicyList.forEach((item) => {
      const { title, url, date } = item
      html += `<p>（${date}）<a href="${url}">${title}</a></p>`
    })
    await sendMail({ to: 'ne.wkj@qq.com', title: '新政策', subject: '点击查看国务院政策', content: html })
    return newPolicyList
  } catch (err) {
    console.error(err)
  }
}
