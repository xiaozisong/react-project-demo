import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { createBrowserHistory } from 'history'
import AuthRoute from './components/AuthRoute';
export const history = createBrowserHistory()

const Layout = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const NotFound = lazy(() => import('@/pages/NotFound'))
function App() {
  console.log(history, 'APP')
  return (
    <Router history={history}>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Redirect exact from='/' to='/home'></Redirect>
          {/* 实现路由前置守卫 */}
          {/* <Route path='/home'  render={() => {
            if(getToken()) {
              return <Layout></Layout>
            } else {
              history.replace('/login')
            }
          }}></Route> */}
          <Route path="/login" component={Login}></Route>
          {/* 将路由组件封装到组件中 */}
          <AuthRoute path='/home' component={Layout}></AuthRoute>
          <Route component={NotFound}></Route>
        </Switch>
      </Suspense>
      
    </Router>
  );
}

export default App;
