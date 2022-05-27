import request from '@/utils/request'
import { LOGIN_GETTOKEN, LOGOUT } from '@/constants/index'
import { removeToken, removeUserInfo, setToken } from '@/utils/storage'
import { history } from '@/App'
export const login = fromObj => {
  return async dispatch => {
    const res = await request.post('/authorizations', fromObj)
    setToken(res.data.data.token)
    dispatch({type: LOGIN_GETTOKEN, token: res.data.data.token})
  }
}
// 退出清除 用户信息 + token(redux + 本地) + 跳转页面
export const logout = () => {
  // 清除本地token
  removeToken()
  // 清除本地用户信息
  removeUserInfo()
  // 跳转页面
  history.push('/login')
  return {
    type: LOGOUT
  }
}