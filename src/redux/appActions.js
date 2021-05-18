import { authenticateUser, getFlights } from '../sdk'
import { LOGIN_SUCCESS, ERR_MSG, LOAD_USER, LOGOUT, GET_FLIGHTS } from './types'

export const dispatchError = (txt) => {
  return {
    type: ERR_MSG,
    payload: txt,
  }
}

// login
export const login = async (form, dispatch) => {
  try {
    await authenticateUser(form[0].value, form[1].value)
      .then((res) => res.json())
      .then((data) => {
        const objData = {
          email: data.email,
          token: data.token,
        }

        if (form[2].value) {
          localStorage.setItem('otpusk', JSON.stringify(objData))
        }

        dispatch({
          type: LOGIN_SUCCESS,
          payload: objData,
        })
      })
  } catch (e) {
    if (e.status === 401) {
      dispatch({
        type: ERR_MSG,
        payload: 'Email or password is incorrect',
      })
    }
  }
}

// if exist token
export const loadUser = (store, history, dispatch) => {
  if (!store.token && localStorage.getItem('otpusk')) {
    dispatch({
      type: LOAD_USER,
      payload: JSON.parse(localStorage.getItem('otpusk')),
    })
  } else {
    !store.isAuthenticated && history.push('/login')
  }
}

// logout
export const logout = (history, dispatch) => {
  localStorage.removeItem('otpusk')
  history.push('/login')
  dispatch({ type: LOGOUT })
}

//get flights
export const getAllFlights = async (token, dispatch) => {
  try {
    await getFlights(token)
      .then((res) => res.json())
      .then((data) => {
        const arrKey = Object.keys(data.data)
        const arrData = []

        arrKey.map((a) => arrData.push(data.data[a]))
        arrData.sort((s, ss) => {
          s = new Date(s.date)
          ss = new Date(ss.date)
          return s > ss ? -1 : s < ss ? 1 : 0
        })

        dispatch({
          type: GET_FLIGHTS,
          payload: arrData,
        })
      })
  } catch (error) {
    dispatch({
      type: ERR_MSG,
      payload: 'Something went wrong...',
    })
  }
}
