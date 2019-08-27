import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import history from '../history'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), thunk, logger);

const store = createStore(reducer, {}, enhancer);

sagaMiddleware.run(saga);

window.store = store;

export default store;
