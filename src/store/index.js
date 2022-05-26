import { getToken } from '@/storage/login'
import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import rootReducers from './reducers'
export default configureStore({
  reducer: rootReducers
},
{
  token: getToken()
},
applyMiddleware(thunk))