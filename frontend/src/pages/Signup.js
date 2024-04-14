import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../slices/AuthSlice'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const dispatch = useDispatch()

  // User sign-up function
  const signupUser = async (username, password) => {
      setLoading(true)
      setError(null)

      const response = await fetch('http://localhost:3500/user/signup', {
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
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the redux store
      dispatch(login()) // sets 'user' to {email: string, token: string}

      // update loading state
      setLoading(false)

      // update error state
      setError(null)

      // TO BE PLACED: Code to navigate to the list of basements once 
      // the pages are ready!!!
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
    const pass_RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/
    const testUser = user_RegExp.test(username)
    const testPass = pass_RegExp.test(password)

    if(!username || !password) {
      setError('Please enter both username and password')
      return
    }
    if(!testUser) {
      setError('Your username must be between 6 and 30 characters long and can include letters, digits, hyphens, or underscores')
      return
    }
    if(!testPass) {
      setError('Password must include at least one lowercase letter, one uppercase letter, one digit (0-9) and one special character from the !@#$% set and needs to be between 8 and 20 characters long')
      return
    }
    await signupUser(username, password)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={loading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup