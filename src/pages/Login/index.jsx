import React from 'react'
import { Card, Form, Input, Checkbox, Button } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
export default function Login() {
  const onFinish = (value) => {
    console.log(value);
  }
  return (
    <div className="login">
      <Card className="login-container">
         {/* 图片 */}
        <img className="login-logo" src={logo} alt=""/>
        {/* 登录表单 */}
        <Form
          autoComplete="off"
          labelCol={{
            span:3,
            offset: 16
          }}
          validateTrigger={['onChange', 'onBlur']}
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入11位手机号',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
              {
                pattern: /^\d{6}$/,
                message: '请输入6位验证码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => {
                if (!value) {
                  return Promise.reject(new Error('请勾选我同意'));
                }
                return Promise.resolve();
                },
              }
            ]}
          >
            <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
          </Form.Item>
          <Form.Item
          >
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
