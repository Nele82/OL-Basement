import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [angle, setAngle] = useState('fa-solid fa-angle-down')
  const [boolean, setBoolean] = useState(false)
  // Redux
  const theme = useSelector(state => state.theme.value)

  // Window size listener for the Navbar position, layout & size
  window.addEventListener('resize', ()=>{
    // Navbar position
    if (angle === 'fa-solid fa-angle-up') {
      if (window.innerWidth <= 480) {
        document.getElementsByTagName('nav')[0].style.marginTop = '34.5vw'
      }
      if (window.innerWidth >= 480 && window.innerWidth < 720) {
        document.getElementsByTagName('nav')[0].style.marginTop = '28.5vw'
      }
      if (window.innerWidth >= 720 && window.innerWidth < 960) {
        document.getElementsByTagName('nav')[0].style.marginTop = '17.25vw'
      }
      if (window.innerWidth >= 960 && window.innerWidth < 1200) {
          document.getElementsByTagName('nav')[0].style.marginTop = '13vw'
      }
      if (window.innerWidth >= 1200) {
          document.getElementsByTagName('nav')[0].style.marginTop = '7.25vw'
      }
    }
    if (angle === 'fa-solid fa-angle-down') {
      if (window.innerWidth <= 480) {
        document.getElementsByTagName('nav')[0].style.marginTop = '21vw'
      }
      if (window.innerWidth >= 480 && window.innerWidth < 720) {
        document.getElementsByTagName('nav')[0].style.marginTop = '15vw'
      }
      if (window.innerWidth >= 720 && window.innerWidth < 960) {
        document.getElementsByTagName('nav')[0].style.marginTop = '7.75vw'
      }
      if (window.innerWidth >= 960 && window.innerWidth < 1200) {
          document.getElementsByTagName('nav')[0].style.marginTop = '5.25vw'
      }
      if (window.innerWidth >= 1200) {
          document.getElementsByTagName('nav')[0].style.marginTop = '1.5vw'
      }
    }
    
    // Navbar links - padding 
    if (window.innerWidth > 1199) {
      document.getElementById("nav-link-one").style.padding = '.5vw 0 .5vw .5vw'
      document.getElementById("nav-link-two").style.padding = '.5vw 0 .5vw .5vw'
      document.getElementById("nav-link-three").style.padding = '.5vw 0 .5vw .5vw'
    } 
    if (window.innerWidth > 719 && window.innerWidth <= 1199) {
      document.getElementById("nav-link-one").style.padding = '1vw 0 1vw 1vw'
      document.getElementById("nav-link-two").style.padding = '1vw 0 1vw 1vw'
      document.getElementById("nav-link-three").style.padding = '1vw 0 1vw 1vw'
    }
    if (window.innerWidth <= 719 && window.innerWidth > 0) {
      document.getElementById("nav-link-one").style.padding = '2vw 0 2vw 2vw'
      document.getElementById("nav-link-two").style.padding = '2vw 0 2vw 2vw'
      document.getElementById("nav-link-three").style.padding = '2vw 0 2vw 2vw'
    }
  })
  
  return (
    <nav className='display-f fd-c'>
        <div className="nav-housing display-f jc-se">
          <Link 
            id='nav-link-one'
            className={window.innerWidth > 1199 ? 'display-f jc-fs pl-1 pt-1 pb-1' : window.innerWidth > 719 && window.innerWidth <= 1199 ? 'display-f jc-fs pl-2 pt-2 pb-2' : 'display-f jc-fs pl-4 pt-4 pb-4'} 
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
            id='nav-link-two'
            className={window.innerWidth > 1199 ? 'display-f jc-fs pl-1 pt-1 pb-1' : window.innerWidth > 719 && window.innerWidth <= 1199 ? 'display-f jc-fs pl-2 pt-2 pb-2' : 'display-f jc-fs pl-4 pt-4 pb-4'}      
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
            id='nav-link-three'
            className={window.innerWidth > 1199 ? 'display-f jc-fs pl-1 pt-1 pb-1' : window.innerWidth > 719 && window.innerWidth <= 1199 ? 'display-f jc-fs pl-2 pt-2 pb-2' : 'display-f jc-fs pl-4 pt-4 pb-4'}      
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
          className='display-f jc-c p-4'
        >
          <span
            className='display-f ai-c'
            onClick={(e)=>{
              setBoolean(!boolean)
              if (boolean === false) {
                setAngle('fa-solid fa-angle-up')
                if (window.innerWidth <= 480) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '34.5vw'
                }
                if (window.innerWidth >= 480 && window.innerWidth < 720) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '28.5vw'
                }
                if (window.innerWidth >= 720 && window.innerWidth < 960) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '17.25vw'
                }
                if (window.innerWidth >= 960 && window.innerWidth < 1200) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '13vw'
                }
                if (window.innerWidth >= 1200) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '7.25vw'
                }
              } else {
                setAngle('fa-solid fa-angle-down')
                if (window.innerWidth <= 480) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '21vw'
                }
                if (window.innerWidth >= 480 && window.innerWidth < 720) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '15vw'
                }
                if (window.innerWidth >= 720 && window.innerWidth < 960) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '7.75vw'
                }
                if (window.innerWidth >= 960 && window.innerWidth < 1200) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '5.25vw'
                }
                if (window.innerWidth >= 1200) {
                  document.getElementsByTagName('nav')[0].style.marginTop = '1.5vw'
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