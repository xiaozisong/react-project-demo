import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import styles from './index.module.scss'
import { Layout, Menu, Breadcrumb, Popconfirm } from 'antd'
import {
  LogoutOutlined,
  HomeOutlined,
  HddOutlined,
  EditOutlined
} from '@ant-design/icons'
import Article from '../Article'
import Home from '../Home'
import Publish from '../Publish'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserInfo } from '@/store/actions/user'
import { logout } from '@/store/actions/Login'
const { Header, Content, Sider } = Layout
export default function MyLayout() {
  const location = useLocation()
  const userInfo = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  const confirm = () => {
    dispatch(logout())
  }
  return (
    <div className={styles.root}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          {/* 右侧内容 */}
         
          <div className="profile">
            <span>{ userInfo.name }</span>
            <span>
            <Popconfirm
              title="确定退出吗?"
              onConfirm={confirm}
              okText="确认"
              cancelText="取消"
              style={{width: 140}}
              className="popConfirm"
            >
              <LogoutOutlined></LogoutOutlined> 退出
            </Popconfirm>
            </span>
          </div>
        </Header>
        <Layout >
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              theme="dark"
              style={{ height: '100%', borderRight: 0 }}
              selectedKeys={location.pathname}
            >
              <Menu.Item icon={<HomeOutlined />} key="/home">
                <Link to={'/home'}>数据概览</Link>
              </Menu.Item>
              <Menu.Item icon={<HddOutlined />} key="/home/article">
                <Link to={'/home/article'}>内容管理</Link>
              </Menu.Item>
              <Menu.Item icon={<EditOutlined />} key="/home/publish">
                <Link to={'/home/publish'}>发布文章</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px', display: 'block', overflow: 'auto' }}>
            
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                display: 'block'
              }}
            >
              <Switch>
                <Route exact path='/home' component={Home}></Route>
                <Route path='/home/article' component={Article}></Route>
                <Route path='/home/publish' component={Publish}></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
