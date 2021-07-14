import React from 'react'
import firebase from 'firebase/app'
import SignInOut from './SignInOut'

import logo from '../images/codelogo.png'

interface NavBarProps {
  user: firebase.User | null
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">


      <div className="navbar-start">
        {/* <a className="navbar-item">
          Home
        </a>

        <a className="navbar-item">
          Documentation
        </a> */}
      </div>

      {user &&
        <figure className="image" style={{ width: "35px", height: "35px", margin: "auto 10px" }}>
          <img src={user.photoURL || undefined} alt="google profile img" className="is-rounded" />
        </figure>
      }

      <div className="navbar-item">
        <SignInOut user={user} />
      </div>

    </nav >
  )
}

export default NavBar
