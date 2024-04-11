import React from 'react'
import icon from '../assets/storage_icon.jpg'

const Header = () => {

  return (
    <header>
      <img 
          src={icon} 
          alt="Storage icon" 
      />
      <span>OL Basement</span>
      <span>Test</span>
    </header>
  )
}

export default Header