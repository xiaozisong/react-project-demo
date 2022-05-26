import { LOGIN_GETTOKEN } from '@/constants'
const initValues = {
   token: ''
}
export default function login (prevState = initValues, action) {
   switch(action.type) {
      case LOGIN_GETTOKEN:
         return {
            ...prevState,
            token: action.token
         }
      default:
         return prevState
   }
} 