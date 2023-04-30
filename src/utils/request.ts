import axios from 'axios'

const service = axios.create({
  method: 'get',
  timeout: 60000,
  withCredentials: true
})

service.interceptors.request.use(config => config, error => Promise.reject(error))

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('返回拦截器=', error)
    return Promise.reject(error)
  }
)

export default service
