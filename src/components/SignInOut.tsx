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
          <strong>Log out</strong>
        </button>
        :
        <button className="button is-primary is-outlined" onClick={db.signInWithGoogle}>
          Log in
        </button>
      }
    </div>
  );
}

export default SignInOut;
