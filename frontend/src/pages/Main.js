import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { login, logout } from '../slices/AuthSlice'

const Main = () => {
  // Redux
  const theme = useSelector(state => state.theme.value)
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  // Location
  const navigate = useNavigate()

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem('user'))) {
        dispatch(login(JSON.parse(localStorage.getItem('user'))))
    } else {
        dispatch(logout())
    }
    navigate('/')

    // Changes layout on resize
    const changeLayout = () => {
      if(window.innerWidth > 1199) {
        document.getElementById('main-page-housing').style.flexDirection = 'row'
      } 
      if (window.innerWidth < 1200) {
        document.getElementById('main-page-housing').style.flexDirection = 'column'
      }
    }

    window.addEventListener('resize', changeLayout)

    // Cleanup
    return () => {
      window.removeEventListener('resize', changeLayout)
    }

  }, [])

  return (
    <div 
      className={window.innerWidth > 1199 ? 'main-page display-f' : 'main-page display-f fd-c'}
      id='main-page-housing'
    >
      <main className='col-11-md col-6-xl ml-a mr-a'>
        {/* GREETING */}
        {!user ? <span>Welcome!</span> : <span>Welcome, {user.username}!</span>}
        {/* HEADLINE */}
        <h1>OL Basement</h1>
        <h2>Your online home storage space manager</h2>
        <p>Calculate your storage space while keeping track of all your supplies and remember:
        a well-organized basement not only provides efficient storage but also contributes to a more functional home.  
        </p>
        {!user ? 
        // LOGGED OUT
        <div
          className='display-f fd-c col-8-xs col-7-sm col-7-lg col-12-xl'
          id='loggedOut'
        >
          <Link 
            className='display-f jc-c'
            to="/login"
            onClick={() => window.scrollTo(0, 0)}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
          >
            Log In
          </Link>
          <div
            className='display-f fd-c'
          >
            <span
              className='display-f jc-c'
            >
              Don't have an account? Sign Up.
            </span>
            <Link 
              className='display-f jc-c'
              to="/signup"
              onClick={() => window.scrollTo(0, 0)}
              style={{ 
                backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
                color: theme ? 'rgb(255, 255, 255)' : 'black' 
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
        : 
        // LOGGED IN
        <div
          className='display-f fd-c col-8-xs col-7-sm col-7-lg col-12-xl'
          id='loggedIn'
        >
          <button
            onClick={() => {
              dispatch(logout())
              localStorage.clear()
              navigate('/')
            }}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
          >
            Log Out
          </button>
          <Link 
            to="/storage-list"
            className='display-f jc-c'
            onClick={() => window.scrollTo(0, 0)}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
              color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
          >
            Go to the basement
          </Link>
        </div>
        }
      </main>
      <section 
        id='features'
        className='display-f fr-w jc-c col-5-xl ml-a mr-a'
      >
        <div
          className='col-12-xs col-12-sm col-11-md col-5-lg col-10-xl display-f fd-c p-3'
          style={{ 
            backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
            color: theme ? 'rgb(255, 255, 255)' : 'black' 
          }}  
        >
          <h4>Space calculation</h4>
          <p>App is designed to help you efficiently manage the available space in 
            your storage areas, such as a home basement, garage, or any other storage 
            facility. It calculates the remaining space in percentages based on the 
            dimensions of the storage area and the items stored within it. Simply add 
            the dimensions of each item you store, and the app will keep track of the 
            cumulative space these items occupy.
          </p>
        </div>
        <div
          className='col-12-xs col-12-sm col-11-md col-5-lg col-10-xl display-f fd-c p-3'
          style={{ 
            backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
            color: theme ? 'rgb(255, 255, 255)' : 'black' 
          }}
        >
          <h4>Categorization</h4>
          <p>After entering an item’s details, users can assign it to a predefined category from a dropdown menu. 
          With items categorized, the app can filter and display items based on their assigned categories. This 
          makes finding and managing items in the storage space much easier. <br/><br/> <b>Additional functionality - </b> All items may be downloaded as an Excel Spreadsheet!
          </p>
        </div>
      </section>
    </div>
  )
}

export default Main