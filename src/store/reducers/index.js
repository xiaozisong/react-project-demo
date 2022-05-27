import { combineReducers } from 'redux'
import login from './login.js'
import user from './user.js'
const rootReducers = combineReducers({
  login,
  user
})
export default rootReducers