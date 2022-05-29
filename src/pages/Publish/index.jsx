import React, { useState, useRef } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Input, Button, Space, Upload, Radio, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import MyChannels from '@/components/MyChannels'
import { useDispatch } from 'react-redux'
import { addArtile, editArticle, getArticleInfo } from '@/store/actions/article'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
export default function Publish() {
  const [value, setValue] = useState(1)
  const formRef = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()
  const [fileList, setFileList] = useState([
   
  ])
  const fileRef = useRef(fileList)

  useEffect(() => {
    if(id) {
      dispatch(getArticleInfo(id)).then(res => {
        const type = res.data.data.cover.type
        const images = res.data.data.cover.images.map(item => {
          return {
            url: item
          }
        })
        formRef.current.setFieldsValue({
          ...res.data.data,
          type,
          images
        })
        setFileList(images)
        setValue(type)
        fileRef.current = images
      })
    }
  }, [dispatch, id])
  console.log(fileRef, '41');
  const handleChange = (files) => {
    setFileList(files.fileList)
    fileRef.current = files.fileList
    formRef.current.validateFields().then(() => {}).catch(()=>{})
  }
  const handleChangeCover = (e) => {
    const count = e.target.value
    setValue(count)
    setFileList(fileRef.current.slice(0, count))
  }
  const handleFinish = async (values) => {
    const images = fileList.map(item => item.response.data.url)
    const { type, ...rest } = values
    const data = {
      ...rest,
      cover: {
        type,
        images
      }
    }
    if(id) {
      dispatch(editArticle(false, {...data, id}))
    } else {
      await dispatch(addArtile(false,data))
      message.success('发表文章成功')
    } 
    history.push('/home/article')
  }
  const handleDraft = async () => {
    let {type, ...rest} = formRef.current.getFieldsValue()
    const images = fileList.map(item => item.response.data.url)
    const data = {
      ...rest,
      cover: {
        type,
        images
      }
    }
    await dispatch(addArtile(true,data))
    message.success('存为草稿成功')
    history.push('/home/article')
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{ id ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form initialValues={{
          title: '',
          channel_id: null,
          type: 1,
          content: ''
        }} 
        labelCol={{ span: 4 }} 
        wrapperCol={{ span: 20 }} 
        size="large" 
        validateTrigger={['onChange', 'onBlur']}
        ref={formRef}
        onFinish={handleFinish}
        >
          <Form.Item label="标题" name='title' rules={[
            { required: true, message: '文章标题不能为空' }
          ]}>
            <Input
              placeholder="请输入文章的标题"
              style={{ width: 400 }}
            ></Input>
          </Form.Item>
          <Form.Item label="频道" name='channel_id' rules={[
            { required: true, message: '请选择频道信息' }
          ]}>
            <MyChannels></MyChannels>
          </Form.Item>
          <Form.Item label="封面" name='type' rules={[{
            validator(_, value){
              if(value !== fileList.length) {
                return Promise.reject(new Error(`请上传${value}张图片`))
              } else {
                return Promise.resolve()
              }
            }
          }]}>
            <Radio.Group value={value} onChange={handleChangeCover}>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="封面">
            <Upload
              listType="picture-card"
              fileList={fileList}
              name="image"
              action={`${process.env.REACT_APP_URL}/upload`}
              onChange={handleChange}
              maxCount={value}
            >
              {fileList.length < value && <PlusOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item label="内容" name='content' rules={[{ required: true, message: '请输入内容' }]}>
            <ReactQuill style={{height: 160}}></ReactQuill>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Space>
              <Button type="primary" htmlType='submit'>{ id ? '编辑' : '发布'}文章</Button>
              <Button onClick={handleDraft}>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
