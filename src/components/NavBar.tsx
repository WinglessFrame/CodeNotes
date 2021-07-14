import React from 'react'
import firebase from 'firebase/app'
import * as db from '../firestore'
import SignInOut from './SignInOut'

interface NavBarProps {
  user: firebase.User | null
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const [dropDownActive, setDropDownActive] = React.useState<boolean>(false)
  const dropDownClass = `dropdown ${dropDownActive ? 'is-active' : ''}`

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
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
