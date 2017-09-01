import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware
  )
);

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, enhancer)
  
  return store;
}