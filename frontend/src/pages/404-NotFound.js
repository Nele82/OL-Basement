import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import light404 from '../assets/404-light.png'
import dark404 from '../assets/404-dark.png'

const NotFound = () => {
  const navigate = useNavigate()
  // Redux
  const theme = useSelector(state => state.theme.value)

  useEffect(()=>{
    const layoutOnResize = () => {
      if (window.innerWidth < 960) {
        document.getElementById('not-found').style.flexDirection = 'column'
      }
      if (window.innerWidth > 959) {
        document.getElementById('not-found').style.flexDirection = 'row'
      }
    }
    // Handler for resize event (changes layout of the housing element)
    window.addEventListener('resize', layoutOnResize)
    // Cleanup
    return ()=> {
      window.removeEventListener('resize', layoutOnResize)
    }
  }, [])

  return (
    <div 
      id='not-found'
      className={window.innerWidth > 959 ? 'display-f' : 'display-f fd-c'}
    >
        <div 
          id="not-found-upper"
          className='display-f fd-c ai-c col-12-xs col-6-lg'
        >
          <h1>Ooops... The page you're looking for doesn't exist!</h1>
          <img 
            src={theme ? dark404 : light404} 
            alt="Page not found image" 
            className='col-12-xs col-10-sm col-9-md col-12-lg col-7-xl'
          />
        </div>
        <div 
          id="not-found-lower"
          className='display-f fd-c ai-c col-12-xs col-6-lg'
        >
          <p
            className='col-12-xs col-10-sm col-8-xl'        
          >
            Please check the URL or navigate back to the homepage.
          </p>
          <button 
              className='display-f jc-c col-12-xs col-10-sm col-7-xl'
              onClick={() => navigate('/')}
              style={{ 
                  backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
                  color: theme ? 'rgb(238, 238, 238)' : 'black' 
              }}
          >
            <i className="fa-solid fa-house"></i>
            <span className="ml-1">Home</span>
          </button>
        </div>
    </div>
  )
}

export default NotFound