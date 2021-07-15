import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundleReducer from './bundleReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
  user: userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
