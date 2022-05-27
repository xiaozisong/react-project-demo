import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import NotFound from '@/pages/NotFound';
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from='/' to='/home'></Redirect>
        <Route path="/home" component={Layout}></Route>
        <Route path="/login" component={Login}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
