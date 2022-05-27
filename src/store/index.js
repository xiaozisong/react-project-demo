// import { getToken, getUserInfo } from '@/utils/storage'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import rootReducers from './reducers'
export default configureStore({
  reducer: rootReducers,
  middleware: applyMiddleware => {
    return applyMiddleware({
      thunk
    })
  }
})