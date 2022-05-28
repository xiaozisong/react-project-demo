import { getToken } from '@/utils/storage'
import React from 'react'
import { Route,Switch, Redirect, useLocation } from 'react-router-dom'
export default function AuthRoute({component: Component, children, ...rest}) {
  const location = useLocation()
  return (
    <Switch>
      <Route
        {...rest} 
        render={() => {
          const token = getToken()
          if(token) {
            return children ? children : <Component></Component>
          } else {
            // 实现一个功能，哪来的回哪去，路由传参的三种方式，
            /* 
                1. search 传参，参数在地址栏拼接
              2. query 传参，参数不显示在地址栏，但是刷新会丢失，不会在内存中做缓存
              3. state 传参， 用的最多，不显示，刷新不会丢失
            */
            return <Redirect to={{
              pathname: '/login',
              state: {
                from: location.pathname
              }
            }}></Redirect>
          }
        }}>
    </Route>
    </Switch>
    
  )
}
