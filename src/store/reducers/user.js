import { USER_INFO, LOGOUT } from '@/constants'
import { getUserInfo } from '@/utils/storage'
const initValues = getUserInfo || {}
export default function user(prevState = initValues, action) {
   switch(action.type) {
     case USER_INFO:
       return action.info
     case LOGOUT:
       return {}
      default:
        return prevState
   }
}