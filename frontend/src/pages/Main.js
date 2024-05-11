import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { login, logout } from '../slices/AuthSlice'

const Main = () => {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem('user'))) {
        dispatch(login(JSON.parse(localStorage.getItem('user'))))
    } else {
        dispatch(logout())
    }
    navigate('/')
  }, [])

  return (
    <div className='main-page display-f'>
      <main>
        {!user ? <span>Welcome!</span> : <span>Welcome, {user.username}!</span>}
        <h1>Online Basement</h1>
        <h2>Your online home storage space manager</h2>
        <p>Calculate your storage space while keeping track of all your supplies and remember:
        a well-organized basement not only provides efficient storage but also contributes to a more functional home.  
        </p>
        {!user ? 
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
              localStorage.clear()
              navigate('/')
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