import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PasswordReset = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [notification, setNotification] = useState('')
  const requestRef = useRef()

  const navigate = useNavigate()

  // Redux
  const theme = useSelector(state => state.theme.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const testEmail = emailRegExp.test(email)

    if (!email) {
      setError(`Please enter a valid email address`)
      return
    }
    
    if (!testEmail) {
      setError(`Your email should contain the following: Local part (part before '@'): should contain one or more characters that are letters 
      (both uppercase and lowercase), digits, dots, underscores, percent signs, plus signs, or hyphens; Domain (part after '@'): should contain one 
      or more characters that are letters (both uppercase and lowercase), digits, dots, or hyphens; Top level domain (part after '.'): should contain
      two or more letters for the top-level domain (like .com, .org, etc.)`)
      return
    }

    // const response = await fetch('http://localhost:3500/user/requestReset', {
    const response = await fetch('https://ol-basement.onrender.com/user/requestReset', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email })
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.message)
    }

    if (response.ok) {
      setNotification(`Success! A link to reset your password has been sent to your email address. Please check your inbox 
      and follow the instructions to create a new password. If you don’t see the email, be sure to check your spam or 
      junk folder or resubmit your email.`)
      setEmail('')
    }
  }

  useEffect(()=>{
    requestRef.current.focus()
  }, [])

  return (
        <form 
          className="reset-form col-12-xs col-10-sm col-11-md col-9-lg col-5-xl display-f fd-c ml-a mr-a"
          onSubmit={handleSubmit}
        >
          <h3>Password Reset Request Form:</h3>
          <label>Please provide your email address (required):</label>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => {
              setError(null)
              setNotification(null)
            }}
            ref={requestRef}
            value={email}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
          />
          <button 
            type="submit"
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
              color: theme ? 'rgb(238, 238, 238)' : 'black' 
            }}
          >
            Submit
          </button>
          {error && <div className='display-f fd-c ai-c p-1 bd-black mt-1 mb-1' style={{border: theme ? '2px dotted white' : null}}><div>&#9888;</div> {error}</div>}
          {notification && <span>{notification}</span>}
          <button
            onClick={()=>{
              navigate('/login')
              window.scrollTo(0, 0)
            }}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
              color: theme ? 'rgb(238, 238, 238)' : 'black' 
            }}
          >
            Back to Login
          </button>
        </form>
  )
}

export default PasswordReset