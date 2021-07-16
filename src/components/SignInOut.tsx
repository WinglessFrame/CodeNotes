import React from "react";
import * as db from "../firestore";
import { useActions } from '../hooks/useActions';
import useAuth from '../hooks/useAuth';

const SignInOut: React.FC = () => {
  const { user } = useAuth()
  const { clearCellsState } = useActions()

  const onClickHandler = () => {
    if (!user) {
      clearCellsState()
    }
    db.signInWithGoogle()
  }

  return (
    <div className="buttons">
      {user ?
        <button className="button is-light is-outlined" onClick={db.logOut}>
          <strong style={{ letterSpacing: "1px" }}>Log out</strong>
        </button>
        :
        <button className="button is-primary is-outlined" onClick={onClickHandler} style={{ letterSpacing: "1px" }}>
          Log in with
          <span className='icon is-small' style={{ marginLeft: "5px" }}>
            <i className='fab fa-google'></i>
          </span>
        </button>
      }
    </div>
  );
}

export default SignInOut;
