import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialBundlesState: BundlesState = {};

const bundleReducer = produce(
  (state: BundlesState = initialBundlesState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        const { cellId } = action.payload;
        state[cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;

      case ActionType.BUNDLE_COMPLETE:
        const { cellId: id } = action.payload;
        state[id] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;

      default:
        return state;
    }
  }
);

export default bundleReducer;
