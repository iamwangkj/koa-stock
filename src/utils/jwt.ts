import jwt from 'jsonwebtoken'

interface verifyRet {
  userId: string,
  iat: number,
  exp: number
}

const SECRET = 'shhhhh'

function sign (userId = ''): string {
  const token = jwt.sign({ userId: userId }, SECRET, { expiresIn: '720h' })
  return token
}

function verify (token = ''): verifyRet {
  try {
    const decoded = jwt.verify(token, SECRET)
    return decoded
  } catch (err) {
    return err
  }
}
// console.log('=', verify('1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDRlY2NjMTE0ZGFhMzVhZTYzMzQ5NTYiLCJpYXQiOjE2MTU3NzgwMTcsImV4cCI6MTYxODM3MDAxN30.dBiVLlK4V91YC-pRFG6RRuLFIz0h-HTzcHbpd7ascf0'))
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDRlY2NjMTE0ZGFhMzVhZTYzMzQ5NTYiLCJpYXQiOjE2MTU3NzgwMTcsImV4cCI6MTYxODM3MDAxN30.dBiVLlK4V91YC-pRFG6RRuLFIz0h-HTzcHbpd7ascf0

export default {
  sign,
  verify
}
