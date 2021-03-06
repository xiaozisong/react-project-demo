import request from '@/utils/request'
import { USER_INFO } from '@/constants'
export const getUserInfo = () => {
  return async dispatch => {
    const res = await request.get('/user/profile')
    dispatch({
      type: USER_INFO,
      info: res.data.data
    })
  }
}