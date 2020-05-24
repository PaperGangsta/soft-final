import React from 'react'
import { Route, BrowserRouter, HashRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import Login from './pages/login'
import Register from './pages/register'
import Container from './pages/container'
const App = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        {/* 登陆页面 */}
        <Route path="/login" component={Login} />
        {/* 注册界面 */}
        <Route path="/register" component={Register} />
        {/* 首页路由 */}
        <Route path="/index" component={Container} />
      </Provider>
    </HashRouter>
  )
}

export default App
