import { BrowserRouter as Router, NavLink, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
function App() {
  console.log(1)
  return (
    <Router>
      <NavLink to="/">主页架子</NavLink> &nbsp;
      <NavLink to="/login">登录</NavLink> &nbsp;
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
