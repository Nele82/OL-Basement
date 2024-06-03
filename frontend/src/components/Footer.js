import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Footer = () => {
  const navigate = useNavigate()
  // Redux
  const theme = useSelector(state => state.theme.value)

  return (
    <footer
      className='display-f fd-c ai-c pt-2 pb-4'
      style={{ 
        backgroundColor: theme ? 'rgb(255, 255, 255)' : 'black',
        color: theme ? 'black' : 'rgb(255, 255, 255)' 
      }}
    >
      {/* Back to top button */}
      <span 
        className='display-f ai-c pt-1 pb-1 pl-2 pr-2 mb-3'
        onClick={() => window.scrollTo(0, 0)}
        style={{ 
          border: theme ? '2px dashed black' : '2px dashed rgb(255, 255, 255)'
        }}
      >
        <b>Back To Top</b><i className="fa-solid fa-turn-up"></i>
      </span>
      {/* Design & Author info */}
      <span className='mt-1'>Designed by <a href="https://nebojsapavlovic.netlify.app/" style={{color: theme ? 'black' : 'rgb(255, 255, 255)'}}>NP DEV</a></span>
      <span className='mt-1'>June, 2024</span>  
      {/* Terms of Use &  Privacy Policy links*/}
      <ul
        className='display-f fd-r'
      >
        <li>
          <u onClick={() => {
            navigate('/privacy-policy')
            window.scrollTo(0, 0)
          }}
          >
            Privacy Policy</u>
        </li>
        <li>
          <u onClick={() => {
            navigate('/terms-and-conditions')
            window.scrollTo(0, 0)  
          }}
          >
            Terms of Use</u>
        </li>
      </ul>
    </footer>
  )
}

export default Footer