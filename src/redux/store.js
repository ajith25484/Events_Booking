import {applyMiddleware, createStore} from 'redux'
import { rootReducer } from './rootReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

let middlewares = [logger, thunk]
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))