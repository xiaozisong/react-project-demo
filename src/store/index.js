// import { createStore, applyMiddleware } from 'redux'
import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import rootReducers from './reducers'
import login from './reducers/login'
export default configureStore({
  reducer: login
},applyMiddleware(thunk))