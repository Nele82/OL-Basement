import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [angle, setAngle] = useState('fa-solid fa-angle-down')
  const [boolean, setBoolean] = useState(false)
  // Redux
  const theme = useSelector(state => state.theme.value)
  
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
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : null 
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
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : null 
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
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : null 
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
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : null,
              boxShadow: theme ? '0px 0px 3px 1px #FFFFFF' : '0px 4px 7px -2px #9E9284'
            }}
          >
            <i className={angle}></i>
          </span>
        </div>        
    </nav>
  )
}

export default Navbar