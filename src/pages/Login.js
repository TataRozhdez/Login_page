import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { login } from '../redux/appActions'
import { connect, useDispatch } from 'react-redux'
import { Loader } from '../components/Loader'
import MyNavbar from '../components/MyNavbar'

const Login = ({ store }) => {
  const dispatch = useDispatch()
  const { errorMsg } = store

  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    setLoading(true)
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (form.checkValidity() === true) {
      event.preventDefault()

      dispatch(login(form, dispatch))
    }

    setLoading(false)
    setValidated(true)
  }

  return (
    <div>
      {loading && <Loader />}
      {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
      <MyNavbar />

      {!loading && (
        <Container className='d-flex justify-content-center'>
          <Form
            className='w-75'
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <h3 className='text-center'>Login</h3>

            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='mb-0 text-secondary'>Email</Form.Label>
              <Form.Control
                className='mb-2'
                type='email'
                placeholder='me@example.com'
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a correct email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label className='mb-0 text-secondary'>Password</Form.Label>
              <Form.Control
                type='password'
                minLength={3}
                placeholder='Your password'
                required
              />
              <Form.Control.Feedback type='invalid'>
                Your password must be more than 3 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
              type='checkbox'
              id='customControlAutosizing'
              label='Remember my preference'
              custom
            />

            <div className='w-100 d-flex justify-content-center'>
              <Button
                variant='outline-danger'
                className='w-25 my-2'
                type='submit'
              >
                Submit
              </Button>
            </div>
          </Form>
        </Container>
      )}
    </div>
  )
}

Login.propTypes = {
  store: PropTypes.object.isRequired,
}

const mapStateToProps = (store) => {
  return { store }
}

export default connect(mapStateToProps, { login })(Login)
