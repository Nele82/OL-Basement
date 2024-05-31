import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [angle, setAngle] = useState('fa-solid fa-angle-down')
  const [boolean, setBoolean] = useState(false)
  
  return (
    <nav className='display-f fd-c'>
        <div className="nav-housing display-f jc-se">
          <Link 
            className='pl-2 pt-2 pb-2'
            to="/"
            onClick={()=> {
              if(localStorage.length === 3) {
                localStorage.removeItem('singleStorage')
              }  
              window.scrollTo(0, 0)          
            }}
          >
            Home
          </Link>
          <Link  
            className='pl-2 pt-2 pb-2'       
            to="/about"
            onClick={()=> {
              if(localStorage.length === 3) {
                localStorage.removeItem('singleStorage')
              } 
              window.scrollTo(0, 0)           
            }}
          >
            About
          </Link>
          <Link  
            className='pl-2 pt-2 pb-2'        
            to="contact"
            onClick={()=> {
              if(localStorage.length === 3) {
                localStorage.removeItem('singleStorage')
              }     
              window.scrollTo(0, 0)       
            }}
          >
            Contact
          </Link>
        </div>
        <div 
          id="reveal-menu"
          className='display-f jc-c p-2'
        >
          <span
            className='display-f ai-c pt-2 pb-1 pl-3 pr-3'
            onClick={(e)=>{
              setBoolean(!boolean)
              if (boolean === false) {
                setAngle('fa-solid fa-angle-up')
                if (window.innerWidth < 480) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '39vw'
                }
              } else {
                setAngle('fa-solid fa-angle-down')
                if (window.innerWidth < 480) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '25vw'
                }
              }
            }}
          >
            <i className={angle}></i>
          </span>
        </div>        
    </nav>
  )
}

export default Navbar