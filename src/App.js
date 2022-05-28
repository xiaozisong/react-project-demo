import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import NotFound from '@/pages/NotFound';
import { createBrowserHistory } from 'history'
import AuthRoute from './components/AuthRoute';
export const history = createBrowserHistory()
function App() {
  console.log(history, 'APP')
  return (
    <Router history={history}>
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
    </Router>
  );
}

export default App;
