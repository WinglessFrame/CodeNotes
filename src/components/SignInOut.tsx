import React from "react";
import * as db from "../firestore";
import firebase from "firebase/app"

interface SignInOutProps {
  user: firebase.User | null
}

const SignInOut: React.FC<SignInOutProps> = ({ user }) => {
  return (
    <div className="buttons">
      {user ?
        <button className="button is-light is-outlined" onClick={db.logOut}>
          <strong style={{ letterSpacing: "1px" }}>Log out</strong>
        </button>
        :
        <button className="button is-primary is-outlined" onClick={db.signInWithGoogle} style={{ letterSpacing: "1px" }}>
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
