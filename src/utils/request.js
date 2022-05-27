// 封装axios
import { history } from '@/App'
import store from '@/store'
import { logout } from '@/store/actions/Login'
import axios from 'axios'
import { getToken } from './storage'

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const token = getToken()
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    if(error.response.status === 401) {
      // 身份验证失败，跳到登录页
      store.dispatch(logout())
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
