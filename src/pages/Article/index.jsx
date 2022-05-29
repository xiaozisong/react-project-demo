import React from 'react'
import styles from './index.module.scss'
import { 
  Breadcrumb, 
  Form, 
  Button, 
  Radio, 
  DatePicker, 
  Table,
  Image,
  Tag,
  Card,
  Space, 
  message,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { delArticle, getArticleList, getChannelsList } from '@/store/actions/article'
import img from '@/assets/error.png'
import { useRef } from 'react'
import dayjs from 'dayjs'
import { history } from '@/App'
import MyChannels from '@/components/MyChannels'
const status = [
  { id: -1, title: '全部', color: 'magenta' },
  { id: 0, title: '草稿', color: 'red' },
  { id: 1, title: '待审核', color: 'volcano' },
  { id: 2, title: '审核通过', color: 'lime' },
  { id: 3, title: '审核失败', color: 'gold' }
]


export default function Article() {
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (value) => {
        if (value.type === 0) {
          return <Image
          width={200}
          src={img}
        />
        } else {
          return <Image
          width={200}
          src={value.images[0]}
        />
        }
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: value => {
        const statusObj = status.find(item => item.id === value)
        if(statusObj) {
          return <Tag color={statusObj.color} key={statusObj.id}>{statusObj.title}</Tag>
        }
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      key: 'like_count'
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (value) => {
        return (
          <Space>
            <Button onClick={() => {
              history.push(`/home/publish/${value}`)
            }} type='primary' shape='circle' icon={<EditOutlined />}></Button>
            <Button onClick={() => handleDel(value)} type='danger' shape='circle' icon={<DeleteOutlined />}></Button>
          </Space>
        )
      }
    }
  ]
  const { RangePicker } = DatePicker
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChannelsList())
    dispatch(getArticleList())
  }, [dispatch])
  const handleDel = async (id) => {
    await dispatch(delArticle(id))
    await dispatch(getArticleList())
    message.success('删除成功！')
  }
  const articleList = useSelector(state => state.article)
  const query = useRef({})
  const handleFinish = (values) => {
    if(values.status !== -1) {
      query.current.status = values.status
    }
    if(values.channel_id) {
      query.current.channel_id = values.channel_id
    }
    if(values.date) {
      console.log(dayjs(values.date[0]).startOf().format('YYYY-MM-DD HH:mm:ss'));
      query.current.begin_pubdate = dayjs(values.date[0]).startOf().format('YYYY-MM-DD HH:mm:ss')
      query.current.end_pubdate = dayjs(values.date[0]).endOf().format('YYYY-MM-DD HH:mm:ss')
    }
    dispatch(getArticleList(query.current))
  }
  const handleChange = (current, size) => {
    query.current.page = current
    query.current.per_page = size
    dispatch(getArticleList(query.current))
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>文章列表</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form onFinish={handleFinish} initialValues={{status: -1}}>
          <Form.Item label="状态" name='status'>
            <Radio.Group>
              {status.map(item => <Radio key={item.id} value={item.id}>{ item.title }</Radio>)}              
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name='channel_id'>
            <MyChannels></MyChannels>
          </Form.Item>

          <Form.Item label="日期" name='date'>
            <RangePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到${articleList.total_count}条结果:`} style={{ marginTop: 10 }}>
        <Table rowKey="id" dataSource={articleList.results} columns={columns} pagination={{
          current: articleList.page,
          pageSize: articleList.per_page,
          total: articleList.total_count,
          onChange: handleChange
        }}/>
      </Card>
    </div>
  )
}
