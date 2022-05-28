import { CHANNEL_LIST, Article_LIST } from '@/constants'
const initValues = {}
export default function article(prevState = initValues, action) {
  switch(action.type) {
    case CHANNEL_LIST:
      return {
        ...prevState,
        channels: action.payload
      }
    case Article_LIST:
      return {
        ...prevState,
        articles: action.payload
      }
    default:
      return prevState
  }
}