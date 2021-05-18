import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './pages/Login'
import Main from './pages/Main'

const App = ({ store }) => {
  console.log(store)

  return (
    <Switch>
      {!store.isAuthenticated && <Route path='/login' component={Login} />}

      <Route path='/' exact component={Main} />
      <Redirect to='/' />
    </Switch>
  )
}

const mapStateToProps = (store) => {
  return {
    store,
  }
}

export default connect(mapStateToProps)(App)
