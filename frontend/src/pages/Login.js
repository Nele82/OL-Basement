import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../slices/AuthSlice'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const dispatch = useDispatch()

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
      // update the redux store
      dispatch(login(json)) // sets 'user' to {email: string, token: string}

      // update loading state
      setLoading(false)

      // update error state
      setError(null)

      // Logout user after 23 hours
      setTimeout(() => {
        console.log('Test')
      }, 3595000)
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
  
  return (
    <form className='login' onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        autoComplete="off"
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        autoComplete="off"
      />
      <button disabled={loading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login