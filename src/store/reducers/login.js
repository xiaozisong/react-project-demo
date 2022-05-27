import { LOGIN_GETTOKEN, LOGOUT } from '@/constants'
import { getToken } from '@/utils/storage'
const initValues = {
   token: getToken() || ''
}
export default function login (prevState = initValues, action) {
   switch(action.type) {
      case LOGIN_GETTOKEN:
         return {
            ...prevState,
            token: action.token
         }
      case LOGOUT:
         return {
            ...prevState,
            token: ''
         }
      default:
         return prevState
   }
} 