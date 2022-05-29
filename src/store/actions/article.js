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
export const delArticle = id => {
  return async dispatch => {
    await request.delete(`/mp/articles/${id}`)
  }
}
export const addArtile = (draft, data) => {
  return async dispatch => {
    await request.post(`/mp/articles?draft=${draft}`, data)
  }
}
export const getArticleInfo = id => {
  return async dispacth => {
    const res = await request.get(`/mp/articles/${id}`)
    return res
  }
}
export const editArticle = (draft, data) => {
  return async dispatch => {
    const res = await request.put(`/mp/articles/${data.id}`, data)
    console.log(res)
  }
}