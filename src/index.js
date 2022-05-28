import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'
import 'antd/dist/antd.min.css'
import store from './store'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> 严格模式导致路由不能正常跳转
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
  // </React.StrictMode>
)
