import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../slices/AuthSlice'
import { setTimeoutMessage } from '../slices/SessionSlice'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const navigate = useNavigate()
  // Redux
  const dispatch = useDispatch()
  const sessionTimeout = useSelector(state => state.session.value)

  // User sign-up function
  const signupUser = async (username, email, password) => {
      setLoading(true)
      setError(null)

      const response = await fetch('http://localhost:3500/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password })
    })
    const json = await response.json() // Returns username, email & token

    if (!response.ok) {
      setLoading(false)
      setError(json.message)
    }

    if (response.ok) {
      // Adding a timestamp 
      const timestamp = new Date().toISOString()

      // Saves User to the local storage
      localStorage.setItem('user', JSON.stringify(json))
      localStorage.setItem('time', JSON.stringify(timestamp))

      // Update the redux store
      dispatch(login(json)) // sets the 'user' key {username: string, email: string, token: string}

      // Navigate to 'storage-list'
      navigate('/storage-list')

      // Update loading state
      setLoading(false)

      // Update error state
      setError(null)

      // Logout user after 1 hour
      setTimeout(() => {
        dispatch(logout())
        dispatch(setTimeoutMessage())
        localStorage.clear()
        navigate('/login')
      }, 3590000)
    } 
  }

  // Checking the input (regExp & empty input) and submitting
  const handleSubmit = async (e) => {
    e.preventDefault()
    // The 'username' input begins with the capital or a lowcase letter and
    // can include letters, digits, hyphens, or underscores (input length: 6-30)
    const user_RegExp = /^[A-z][A-z0-9-_]{6,30}$/
    // The 'password' input must contain at least one lowercase letter, one 
    // uppercase letter, one digit (0-9) and one special character from the 
    // !@#$% set. (input length: 6-30)
    const email_RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
    // The 'email' input may contain the following:
    // - Local part (part before '@'): one or more characters that are letters 
    // (both uppercase and lowercase), digits, dots, underscores, percent signs, 
    // plus signs, or hyphens
    // - Domain (part after '@'): one or more characters that are letters (both uppercase 
    // and lowercase), digits, dots, or hyphens
    // - Top level domain (part after '.'): two or more letters for the top-level domain (like .com, .org, etc.) 
    const pass_RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/
    // Password may contain the following: one lowercase letter, one uppercase letter, one digit (0-9) and one special 
    // character from the !@#$% set and needs to be between 8 and 20 characters long
    const testUser = user_RegExp.test(username)
    const testEmail = email_RegExp.test(email)
    const testPass = pass_RegExp.test(password)

    if(!username || !password || !email) {
      setError('All fields are required!')
      return
    }
    if(!testUser) {
      setError('Your username must be between 6 and 30 characters long and can include letters, digits, hyphens, or underscores')
      return
    }
    if(!testEmail) {
      setError(`Your email should contain the following: Local part (part before '@'): should contain one or more characters that are letters 
      (both uppercase and lowercase), digits, dots, underscores, percent signs, plus signs, or hyphens; Domain (part after '@'): should contain one 
      or more characters that are letters (both uppercase and lowercase), digits, dots, or hyphens; Top level domain (part after '.'): should contain
      two or more letters for the top-level domain (like .com, .org, etc.)`)
      return
    }
    if(!testPass) {
      setError('Password must include at least one lowercase letter, one uppercase letter, one digit (0-9) and one special character from the !@#$% set and needs to be between 8 and 20 characters long')
      return
    }
    await signupUser(username, email, password)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Username *</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
        onClick={() => {
          setError(null)
        }}
        value={username}
      />
      <label>Email address *</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        onClick={() => {
          setError(null)
        }}
        value={email}
      />
      <label>Password *</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        onClick={() => {
          setError(null)
        }}
        value={password}
      />
      <button disabled={loading}>Sign Up</button>
      <span>* - Required field</span>
      {error && <div className="error text-red">{error}</div>}
    </form>
  )
}

export default Signup