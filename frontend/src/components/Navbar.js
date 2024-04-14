import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const user = useSelector(state => state.loggedin.value)
  const {logoutUser} = useLogout()

  return (
    <nav className='display-f'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {user && (
          <span
            onClick={logoutUser}
          >
            Log Out
          </span>
        )}
        {!user && (
          <Link to="/login">Log In</Link>
        )}
        <Link to="contact">Contact</Link>
        <span>Show menu</span>
    </nav>
  )
}

export default Navbar