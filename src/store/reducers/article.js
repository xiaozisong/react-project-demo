import { CHANNEL_LIST, Article_LIST } from '@/constants'
const initValues = {
  channels: [],
  page: 1,
  per_page: 10,
  results: [],
  total_count: 0
}
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
        results: action.payload.results,
        page: action.payload.page,
        per_page: action.payload.per_page,
        total_count: action.payload.total_count
      }
    default:
      return prevState
  }
}