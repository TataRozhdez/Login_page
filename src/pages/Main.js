import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { loadUser } from '../redux/appActions'
import MyNavbar from '../components/MyNavbar'

export const Main = ({ store, history }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    loadUser(store, history, dispatch)
  }, [])

  return (
    <>
      <MyNavbar history={history} />
      <h1>fff</h1>
    </>
  )
}

Main.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (store) => {
  return {
    store,
  }
}

export default connect(mapStateToProps)(Main)
