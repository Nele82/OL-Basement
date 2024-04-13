import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='display-f'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Log In</Link>
        <Link to="/logout">Log Out</Link>
        <Link to="contact">Contact</Link>
        <span>Show menu</span>
    </nav>
  )
}

export default Navbar