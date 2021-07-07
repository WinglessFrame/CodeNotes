import cellsReducer from './cellsReducer';
import { combineReducers } from 'redux';
import bundleReducer from './bundleReducer';

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
