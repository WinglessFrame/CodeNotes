import thunk from 'redux-thunk';
import { persistMiddleware } from './middlewares/persistMiddleware';
import { ActionType } from './action-types/index';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk, persistMiddleware))
);
//     id: null,
//     type: 'code',
//   },
// });
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'text',
//   },
// });
