import { combineReducers } from 'redux'
import login from './login.js'
import user from './user.js'
import article from './article.js'
const rootReducers = combineReducers({
  login,
  user,
  article
})
export default rootReducers