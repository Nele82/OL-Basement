import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../slices/AuthSlice'
  
const Main = () => {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const dispatch = useDispatch()

  useEffect(() => {      
    // Sets the name for the 'Welcome' greeting
    if (user) {
      setUsername(user.username)
    }
  }, [user])

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
            onClick={() => {
              dispatch(logout())
              setUser(JSON.parse(localStorage.getItem('user')))
            }}
          >
            Log Out
          </button>
          <Link to="/storage-list">Go to the basement</Link>
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