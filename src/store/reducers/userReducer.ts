import { ActionType } from './../action-types/index';
import { produce } from 'immer';
import { Action } from './../actions/index';
import firebase from 'firebase/app';

interface userState {
  user: firebase.User | null;
}

const initialUserState: userState = {
  user: null,
};

const userReducer = produce((state = initialUserState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      state.user = action.payload.user;
      return state;
    default:
      return state;
  }
}, initialUserState);

export default userReducer;
