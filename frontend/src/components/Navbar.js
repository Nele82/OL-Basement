import React from 'react'
import icon from '../img/storage_icon.png'

const Navbar = () => {
  return (
    <nav className='menu'>
        <img 
            src={icon} 
            alt="Storage icon" 
        />
        <span>Log In</span>
        <span>Log Out</span>
    </nav>
  )
}

export default Navbar