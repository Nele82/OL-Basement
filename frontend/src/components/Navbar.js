import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='display-f'>
        <Link 
          to="/"
          onClick={()=> {
            if(localStorage.length == 3) {
              localStorage.removeItem('singleStorage')
            }            
          }}
        >
          Home
        </Link>
        <Link           
          to="/about"
          onClick={()=> {
            if(localStorage.length == 3) {
              localStorage.removeItem('singleStorage')
            }            
          }}
        >
          About
        </Link>
        <Link           
          to="contact"
          onClick={()=> {
            if(localStorage.length == 3) {
              localStorage.removeItem('singleStorage')
            }            
          }}
        >
          Contact
        </Link>
        <span>Show menu</span>
    </nav>
  )
}

export default Navbar