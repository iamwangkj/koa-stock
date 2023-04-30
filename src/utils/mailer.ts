import nodemailer from 'nodemailer'

// 发送邮件函数
export async function sendMail ({
  to = 'ne.wkj@qq.com',
  title = '我是邮件主题',
  subject = '我是邮件副标题',
  content = '我是邮件内容'
}) {
  try {
    const user = 'tone_cn@163.com'// 用来发送的邮箱
    const pass = 'LVXYNHGAKUVOOUVN' // qq邮箱授权码,如何获取授权码下面有讲
    const transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 25,
      secure: false,
      auth: {
        user: user, // 用户账号
        pass: pass // 授权码
      }
    })
    await transporter.sendMail({
      from: `${title}<${user}>`, // sender address
      to: `<${to}>`, // list of receivers
      subject, // Subject line
      html: content // plain text body
    })
    console.log('邮件发送成功')
  } catch (err) {
    console.log('邮件发送失败')
  }
}
