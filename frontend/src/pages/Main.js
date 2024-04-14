import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../slices/AuthSlice'
import { useLogout } from '../hooks/useLogout'
  
const Main = () => {
  const [username, setUsername] = useState('')
  const user = useSelector(state => state.loggedin.value)
  const dispatch = useDispatch()
  const {logoutUser} = useLogout()

  useEffect(() => {
      // Sets the username and jwt if a user is logged in
      dispatch(login()) 
      // Gets user details from the local storage
      const name = JSON.parse(localStorage.getItem('user'))  
      // Sets the name for the 'Welcome' greeting
      if (name) {
        setUsername(name.username)
      }
  }, [])

  return (
    <div className='main-page display-f'>
      <main>
        {user == null ? <span>Welcome!</span> : <span>Welcome, {username}!</span>}
        <h1>Online Basement</h1>
        <h2>Your online home storage space manager</h2>
        <p>Calculate your storage space while keeping track of all your supplies and remember:
        a well-organized basement not only provides efficient storage but also contributes to a more functional home.  
        </p>
        {user == null ? 
        <div>
          <Link to="/login">Log In</Link>
          <div>
            <span>Don't have an account? Sign Up.</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
        : 
        <div>
          <button
            onClick={logoutUser}
          >
            Log Out
          </button>
          <button>Go to basement</button>
        </div>
        }
      </main>
      <section className='display-f'>
        <div>Section 1</div>
        <div>Section 2</div>
      </section>
    </div>
  )
}

export default Main