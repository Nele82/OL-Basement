import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../slices/AuthSlice'
import { removeTimeoutMessage, setTimeoutMessage } from '../slices/SessionSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const userRef = useRef()
  const navigate = useNavigate()
  // Redux
  const dispatch = useDispatch()
  const sessionTimeout = useSelector(state => state.session.value)
  const theme = useSelector(state => state.theme.value)

  // User login function
  const loginUser = async (username, password) => { 
    setLoading(true)
    setError(null)

    // const response = await fetch('http://localhost:3500/user/login', {
    const response = await fetch('https://ol-basement.onrender.com/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    const json = await response.json() // returns username, email & token

    if (!response.ok) {
      setLoading(false)
      setError(json.message)
    }

    if (response.ok) {
      // Adding a timestamp 
      const timestamp = new Date().toISOString()

      // Update the local storage
      localStorage.setItem('user', JSON.stringify(json))
      localStorage.setItem('time', JSON.stringify(timestamp))

      // Update the 'user' slice
      dispatch(login(json)) // sets 'user' to {email: string, token: string}

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

  // Checking for an empty input
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!username || !password) {
      setError('Please enter your username and password')
      return
    }
    await loginUser(username, password)
  }

  useEffect(() => {
    if (sessionTimeout) {
      setError(sessionTimeout)
    }
    navigate('/login')
    userRef.current.focus()
  }, [])
  
  return (
    <form 
      className='login col-12-xs col-10-sm col-11-md col-9-lg col-5-xl display-f fd-c ml-a mr-a' 
      onSubmit={handleSubmit}
    >
      <h4>Log In</h4>
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
        onClick={() => {
          setError(null)
          dispatch(removeTimeoutMessage())
        }}
        value={username}
        autoComplete="off"
        ref={userRef}
        style={{ 
          backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
          color: theme ? 'rgb(255, 255, 255)' : 'black' 
        }}
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        onClick={() => {
          setError(null)
          dispatch(removeTimeoutMessage())
        }}
        value={password}
        autoComplete="off"
        style={{ 
          backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
          color: theme ? 'rgb(255, 255, 255)' : 'black' 
        }}
      />
      <button 
        className='col-6-xl'
        disabled={loading}
        style={{ 
          backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
          color: theme ? 'rgb(238, 238, 238)' : 'black' 
        }}
      >
        Log in
      </button>
      {error && <div className='display-f fd-c ai-c p-1 bd-black mt-1 mb-1' style={{border: theme ? '2px dotted white' : null}}><span>&#9888;</span> {error}</div>}
      <span 
        id='forgotten-password'
        onClick={()=>{
          navigate('/reset-request')
          window.scrollTo(0, 0)
        }}
      >
        Forgot your password? <b>Click here.</b>
      </span>
    </form>
  )
}

export default Login