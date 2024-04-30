import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../slices/AuthSlice'
import { removeTimeoutMessage, setTimeoutMessage } from '../slices/SessionSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const navigate = useNavigate()
  // Redux
  const dispatch = useDispatch()
  const sessionTimeout = useSelector(state => state.session.value)

  // User login function
  const loginUser = async (username, password) => { 
    setLoading(true)
    setError(null)

    const response = await fetch('http://localhost:3500/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    const json = await response.json() // returns email & token

    if (!response.ok) {
      setLoading(false)
      setError(json.message)
    }

    if (response.ok) {
      // Adding a timestamp 
      const timestamp = new Date().toISOString()

      // update the local storage
      dispatch(login(json)) // sets 'user' to {email: string, token: string}

      // update the local storage
      localStorage.setItem('user', JSON.stringify(json))
      localStorage.setItem('time', JSON.stringify(timestamp))

      // update loading state
      setLoading(false)

      // update error state
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
  }, [])
  
  return (
    <form className='login' onSubmit={handleSubmit}>
      <h3>Log In</h3>
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
      />
      <button disabled={loading}>Log in</button>
      {error && <div className="error text-red">{error}</div>}
    </form>
  )
}

export default Login