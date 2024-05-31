import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordReset = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

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

    const response = await fetch('http://localhost:3500/user/requestReset', {
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

  return (
        <form 
          className="reset-form display-f fd-c"
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
            value={email}
          />
          <button 
            type="submit"
          >
            Submit
          </button>
          {error && <div className='display-f fd-c ai-c p-1 bd-black mt-2 mb-3 fsz-5'><div className='fsz-10'>&#9888;</div> {error}</div>}
          {notification && <span>{notification}</span>}
          <button
            onClick={()=>{
              navigate('/login')
            }}
          >
            Back to Login
          </button>
        </form>
  )
}

export default PasswordReset