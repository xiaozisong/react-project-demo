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
      message.success('??????????????????')
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
    message.success('??????????????????')
    history.push('/home/article')
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">??????</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{ id ? '??????' : '??????'}??????</Breadcrumb.Item>
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
          <Form.Item label="??????" name='title' rules={[
            { required: true, message: '????????????????????????' }
          ]}>
            <Input
              placeholder="????????????????????????"
              style={{ width: 400 }}
            ></Input>
          </Form.Item>
          <Form.Item label="??????" name='channel_id' rules={[
            { required: true, message: '?????????????????????' }
          ]}>
            <MyChannels></MyChannels>
          </Form.Item>
          <Form.Item label="??????" name='type' rules={[{
            validator(_, value){
              if(value !== fileList.length) {
                return Promise.reject(new Error(`?????????${value}?????????`))
              } else {
                return Promise.resolve()
              }
            }
          }]}>
            <Radio.Group value={value} onChange={handleChangeCover}>
              <Radio value={1}>??????</Radio>
              <Radio value={3}>??????</Radio>
              <Radio value={0}>??????</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="??????">
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
          <Form.Item label="??????" name='content' rules={[{ required: true, message: '???????????????' }]}>
            <ReactQuill style={{height: 160}}></ReactQuill>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Space>
              <Button type="primary" htmlType='submit'>{ id ? '??????' : '??????'}??????</Button>
              <Button onClick={handleDraft}>????????????</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
