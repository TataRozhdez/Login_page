import { ERR_MSG, GET_FLIGHTS, LOAD_USER, LOGIN_SUCCESS, LOGOUT } from './types'

export const initialState = {
  isAuthenticated: false,
  token: null,
  errorMsg: '',

  flights: [],
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      }
    case ERR_MSG:
      return {
        ...state,
        errorMsg: action.payload,
      }
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        flights: [],
      }
    case GET_FLIGHTS:
      return {
        ...state,
        flights: action.payload,
      }
    default:
      return state
  }
}
