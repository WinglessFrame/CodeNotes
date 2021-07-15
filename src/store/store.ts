import thunk from 'redux-thunk';
import { persistMiddleware } from './middlewares/persistMiddleware';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk, persistMiddleware))
);
