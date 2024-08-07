import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../slices/AuthSlice'
import { setTimeoutMessage } from '../slices/SessionSlice'
import { setLoadingMsg } from '../slices/LoadingSlice'
import { useNavigate } from 'react-router-dom'
import { loadBar, removeLoadBar } from '../hooks/useLoader'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [boolean, setBoolean] = useState(true)
  const signUpRef = useRef()
  const navigate = useNavigate()
  // Redux
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme.value)
  const httpInput = useSelector(state => state.httpAddress.value)

  // User sign-up function
  const signupUser = async (username, email, password) => {
      setError(null)
      // Displays Loading message
      dispatch(setLoadingMsg('USER SIGN-UP IN PROGRESS . . . .'))
      loadBar()

      // Response time variables
      let startTime = new Date()
      let responseTime = null
      try {
        // 'httpInput' reducer holds the http address (no endpoint as it doesn't change) for 
        // deployment or production (whichever is set by the Developer inside it's Redux slice) 
        // for the backend
        const response = await fetch(`${httpInput}/user/signup`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ username, email, password })
        })
        const json = await response.json() // Returns username & token
    
        if (!response.ok) {
          // Response time calculation
          responseTime = new Date() - startTime
    
          // Removes Loading message after 2 seconds or longer
          if (responseTime < 2000) {
            setTimeout(() => {
              removeLoadBar()
            }, 2000)
          } else {
              removeLoadBar()
          }
          setError(json.message)
        }
    
        if (response.ok) {
          // Response time calculation
          responseTime = new Date() - startTime

          // Removes Loading message after 2 seconds or longer
          if (responseTime < 2000) {
            setTimeout(() => {
              removeLoadBar()
            }, 2000)
          } else {
              removeLoadBar()
          }
          // Adding a timestamp 
          const timestamp = new Date().toISOString()
    
          // Saves User to the local storage
          localStorage.setItem('user', JSON.stringify(json))
          localStorage.setItem('time', JSON.stringify(timestamp))
    
          // Updates the redux store
          dispatch(login(json)) // sets the 'user' key {username: string, token: string}
    
          // Navigate to 'storage-list'
          navigate('/storage-list')
    
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
      } catch (error) {
        if (!error?.response) {
          // No server response (server is down)
          setError(`Unable to establish server connection. Please verify your internet 
            connection and try again. If the problem persists, kindly reach out to the 
            developer through the 'Contact' page.`)
          removeLoadBar()
        } 
      }
  }

  // Checking the input (regExp & empty input) and submitting
  const handleSubmit = async (e) => {
    e.preventDefault()
    // The 'username' input begins with the capital or a lowcase letter and
    // can include letters, digits, hyphens, or underscores (input length: 6-30)
    const user_RegExp = /^[A-z][A-z0-9-_ ]{5,30}$/
    // The 'username' input must contain at least one lowercase letter, one 
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
      setError('Your username must be between 6 and 30 characters long and may include letters, digits, hyphens, or underscores')
      return
    }
    if(!testEmail) {
      setError(`Your email should contain the following: LOCAL PART (part before '@'): should contain one or more characters that are letters 
      (both uppercase and lowercase), digits, dots, underscores, percent signs, plus signs, or hyphens; DOMAIN (part after '@'): should contain one 
      or more characters that are letters (both uppercase and lowercase), digits, dots, or hyphens; TOP LEVEL DOMAIN (part after '.'): should contain
      two or more letters for the top-level domain (like .com, .org, etc.)`)
      return
    }
    if(!testPass) {
      setError('Password must include at least one lowercase letter, one uppercase letter, one digit (0-9) and one special character from the !@#$% set and needs to be between 8 and 20 characters long')
      return
    }
    await signupUser(username, email, password)
  }

  useEffect(()=>{
    signUpRef.current.focus()
  }, [])

  return (
    <form 
      className='signup col-12-xs col-10-sm col-11-md col-9-lg col-5-xl display-f fd-c ml-a mr-a' 
      onSubmit={handleSubmit}
    >
      <h3>Sign Up</h3>
      <label>Username *</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
        onClick={() => {
          setError(null)
        }}
        ref={signUpRef}
        value={username}
        style={{ 
          backgroundColor: theme ? 'black' : null,
          color: theme ? 'rgb(255, 255, 255)' : 'black' 
        }}
      />
      <label>Email address *</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        onClick={() => {
          setError(null)
        }}
        value={email}
        style={{ 
          backgroundColor: theme ? 'black' : null,
          color: theme ? 'rgb(255, 255, 255)' : 'black' 
        }}
      />
      <label>Password *</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        onClick={() => {
          setError(null)
        }}
        value={password}
        style={{ 
          backgroundColor: theme ? 'black' : null,
          color: theme ? 'rgb(255, 255, 255)' : 'black' 
        }}
      />
      <button 
        disabled={boolean}
        style={{ 
          backgroundColor: theme ? 'black' : null,
          color: theme ? 'rgb(255, 255, 255)' : null 
        }}
      >
        Sign Up
      </button>
      <span>* - Required field</span>
      {error && <div className='display-f fd-c ai-c p-2 bd-black mt-1 mb-1' style={{border: theme ? '2px dotted white' : null}}><p>&#9888;</p>{error}</div>}
      <div 
        id='terms'
        className='display-f'
      >
        <input 
            type="checkbox" 
            name="checkbox" 
            id="check" 
            onClick={()=>{
              setBoolean(!boolean)
            }}
        />
        <label>I hereby acknowledge that I have read and understood the <u><b onClick={() => navigate('/privacy-policy')}>Privacy Policy</b></u> and the <u><b onClick={() => navigate('/terms-and-conditions')}>Terms of Use</b></u>.</label>
      </div>
    </form>
  )
}

export default Signup