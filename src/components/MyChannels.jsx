import { Select } from 'antd'
import React from 'react'
import { useChannels } from '@/hooks'
export default function MyChannels(props) {
  const channels = useChannels()
  return (
    <Select style={{ width: 200 }} allowClear placeholder="请选择频道" {...props}>
      {channels.map((item) => (
        <Select.Option value={item.id} key={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
}
