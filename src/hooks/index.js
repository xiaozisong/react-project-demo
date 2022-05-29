import { getChannelsList } from "@/store/actions/article"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useChannels = () => {
  const channels = useSelector((state) => state.article.channels)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChannelsList())
  }, [dispatch])
  return channels
}