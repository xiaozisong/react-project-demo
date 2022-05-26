import request from '@/utils/request'
import { LOGIN_GETTOKEN } from '@/constants/index'
import { setToken } from '@/storage/login'
export const login = fromObj => {
  return async dispatch => {
    const res = await request.post('/authorizations', fromObj)
    setToken(res.data.data.token)
    dispatch({type: LOGIN_GETTOKEN, token: res.data.data.token})
  }
}