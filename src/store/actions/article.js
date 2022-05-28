import request from '@/utils/request'
import { CHANNEL_LIST, Article_LIST } from '@/constants'
export const getChannelsList = () => {
  return async dispatch => {
    const res = await request.get('/channels') 
    dispatch({
      type: CHANNEL_LIST,
      payload: res.data.data.channels
    })
  }
}
export const getArticleList = params => {
  return async dispacth => {
    const res = await request.get('/mp/articles', {params})
    dispacth({
      type: Article_LIST,
      payload: res.data.data
    })
  }
}