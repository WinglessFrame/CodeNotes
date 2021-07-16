import React from 'react'
import firebase from 'firebase/app'
import SignInOut from './SignInOut'
import logo from '../images/IconWithoutFrame.svg'

interface NavBarProps {
  user: firebase.User | null
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="logo" />
          <span style={{ marginLeft: "5px", fontSize: "1.5rem", letterSpacing: "1px" }}>CodeNotes</span>
        </a>
      </div>

      <div className="navbar-start">
        {/* <a className="navbar-item">
          Home
        </a>

        <a className="navbar-item">
          Documentation
        </a> */}
      </div>
      <div className="navbar-item">
        {user &&
          <>
            <span> {user.displayName}</span>
            <figure className="image" style={{ margin: "auto 10px" }}>
              <img src={user.photoURL || undefined} style={{ width: "32px", height: "32px", objectFit: 'cover', background: "#fff" }} alt="google profile img" className="is-rounded" />
            </figure>
          </>
        }
        <SignInOut user={user} />
      </div>

    </nav >
  )
}

export default NavBar
