import React from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { logout } from '../redux/appActions'
import logoImg from '../resources/logo.svg'

const MyNavbar = ({ store, history }) => {
  const dispatch = useDispatch()

  return (
    <Navbar>
      <Navbar.Brand href='/'>
        <img src={logoImg} alt='' />
      </Navbar.Brand>
      {store.token && (
        <div className='ml-auto d-flex flex-row'>
          <Nav>Hola, {store.token.email} &#9829;</Nav>
          <Nav
            className='cur-point text-secondary ml-2'
            onClick={() => dispatch(logout(history, dispatch))}
          >
            Exit
          </Nav>
        </div>
      )}
    </Navbar>
  )
}

MyNavbar.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (store) => {
  return {
    store,
  }
}

export default connect(mapStateToProps)(MyNavbar)
