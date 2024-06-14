import React, { useEffect } from 'react'
import icon from '../assets/storage_icon.jpg'
import icon1 from '../assets/storage_icon1.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../slices/ThemeSlice'
import backgroundImage from '../assets/background.png'
import backgroundImageDark from '../assets/background-dark.png'

const Header = () => {
  const theme = useSelector(state => state.theme.value)
  const navigate = useNavigate()
  const dispatch = useDispatch()

    useEffect(()=>{
    // Changing the logo image on hover
    function hoverImage() {
        document.getElementById("flip1").addEventListener('mouseover', ()=>{
        document.getElementById("flip1").style.opacity = '0'
        document.getElementById("flip1").style.transform = 'rotate(360deg)'
        document.getElementById("flip2").style.transform = 'rotate(0deg)'
        setTimeout(() => {
          document.getElementById("flip1").style.display = 'none'
          document.getElementById("flip2").style.display = 'block'
          document.getElementById("flip2").style.opacity = '1'
        }, 150)
      })
      document.getElementById("flip2").addEventListener('mouseout', ()=>{
          document.getElementById("flip2").style.opacity = '0'
          document.getElementById("flip2").style.transform = 'rotate(-360deg)'
          document.getElementById("flip1").style.transform = 'rotate(0deg)'
        setTimeout(() => {
          document.getElementById("flip2").style.display = 'none'
          document.getElementById("flip1").style.display = 'block'
          document.getElementById("flip1").style.opacity = '1'
        }, 150)
      })
    }

      hoverImage()
    
    }, [])

    // Window size listener for the Header layout
    window.addEventListener('resize', ()=>{      
      if (window.innerWidth > 1199) {
        document.getElementsByTagName('header')[0].style.justifyContent = 'flex-start'
        document.getElementsByTagName('header')[0].style.padding = '.5vw 0 .5vw 3vw'
      } 
      if (window.innerWidth > 719 && window.innerWidth <= 1199) {
        document.getElementsByTagName('header')[0].style.justifyContent = 'flex-start'
        document.getElementsByTagName('header')[0].style.padding = '1vw 0 1vw 3vw'
      } 
      if (window.innerWidth <= 719) {
        document.getElementsByTagName('header')[0].style.justifyContent = 'center'
        document.getElementsByTagName('header')[0].style.padding = '2vw 0'
      }
    })

  return (
    <header 
      className={window.innerWidth > 1199 ? 'display-f jc-fs pt-1 pb-1' : window.innerWidth > 719 && window.innerWidth <= 1199 ? 'display-f jc-fs pt-2 pb-2' : 'display-f jc-c pt-4 pb-4'}
      style={{ 
        backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)'
      }}
    >
        <img 
            id='flip1'
            className='br-full'
            src={icon} 
            alt="Storage icon" 
        />
        <img 
            id='flip2'
            className='br-full display-n'
            src={icon1} 
            alt="Storage icon" 
            onClick={()=>{
              navigate('/')
              window.scrollTo(0, 0)
            }}
        />
        <div 
          id="theme"
          className='display-f br-lg jc-fs'
          style={{ 
            backgroundColor: theme ? 'rgb(255, 255, 255)' : 'grey'
          }}
        >
          {/* DARK THEME BUTTON */}
          <span
            className='br-full display-f jc-c ai-c'
            onClick={(e)=>{
              dispatch(toggleTheme())
              if(theme === false) {
                // DARK
                e.target.innerText = 'dark'
                document.getElementById('theme').style.justifyContent = 'flex-end'
                document.body.style.backgroundImage = `url(${backgroundImageDark})` 
                document.querySelector("#root > div > div > main").style.color = 'white'
              } else {
                // LIGHT
                e.target.innerText = 'light'
                document.getElementById('theme').style.justifyContent = 'flex-start'
                document.body.style.backgroundImage = `url(${backgroundImage})`   
                document.querySelector("#root > div > div > main").style.color = 'black'
              }
            }}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : 'grey' 
            }}
          >
            light
          </span>
        </div>
    </header>
  )
}

export default Header