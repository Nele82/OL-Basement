import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set } from '../slices/AuthSlice'

const Main = () => {
  const [username, setUsername] = useState('Welcome!')
  const user = useSelector(state => state.loggedin.value)
  const dispatch = useDispatch()

  return (
    <div className='main-page display-f'>
      <main>
        <span>{username}</span>
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
          <button>Log Out</button>
          <button>To basement (s)</button>
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