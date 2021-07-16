import React from 'react'
import SignInOut from './SignInOut'
import logo from '../images/IconWithoutFrame.svg'
import useAuth from '../hooks/useAuth'



const NavBar: React.FC = () => {
  const { user } = useAuth()
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="logo" />
          <span className="mx-2 is-size-3">CodeNotes</span>
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
            <span className="is-size-5">{user.displayName}</span>
            <figure className="image mx-4">
              <img src={user.photoURL || undefined} alt="google profile img" className="is-rounded" />
            </figure>
          </>
        }
        <SignInOut />
      </div>

    </nav >
  )
}

export default NavBar
