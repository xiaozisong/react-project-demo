import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> 严格模式导致路由不能正常跳转
    <App />
  // </React.StrictMode>
)
