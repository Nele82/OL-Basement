import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer
      className='display-f fd-c ai-c pt-2 pb-4'
    >
      <span 
        className='display-f ai-c pt-1 pb-1 pl-2 pr-2 mb-3'
        onClick={() => window.scrollTo(0, 0)}
      >
        <b>Back To Top</b><i className="fa-solid fa-turn-up"></i>
      </span>
      <span className='mt-1'>Designed by <a href="https://nebojsapavlovic.netlify.app/">NP DEV</a></span>
      <span className='mt-1'>June, 2024</span>  
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