import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { appReducer, initialState } from './appReducer'

export const store = createStore(
  appReducer,
  initialState,
  composeWithDevTools(applyMiddleware(promiseMiddleware, thunk))
)
