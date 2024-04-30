import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Main from './pages/Main'
import StorageList from './pages/StorageList'
import StorageOverview from './pages/StorageOverview'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './slices/AuthSlice'
import { timeOverHour, timeUpToHour } from './hooks/useTimer'
import { setTimeoutMessage } from './slices/SessionSlice'

function App() {
  const user = useSelector(state => state.user.value)
  const inventoryKey = useSelector(state => state.inventory.value)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem('user'))) {
      dispatch(login(JSON.parse(localStorage.getItem('user'))))
    } else {
      dispatch(logout())
    }

    if (localStorage.length > 0) {
      const upToHour = timeUpToHour()
      const overHour = timeOverHour()
      console.log(upToHour, overHour)

      if(overHour >= 3590000) {
        dispatch(logout())
        localStorage.clear()
        dispatch(setTimeoutMessage())
      } else {
        setTimeout(() => {
          dispatch(logout())
          localStorage.clear()
          dispatch(setTimeoutMessage())
        }, upToHour)
      }
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route 
              path='/'
              element={<Layout />}
            >
              <Route
                index
                element={<Main />}
              />
              <Route
                path='about'
                element={<About />}
              />
              <Route
                path='login'
                element={!user ? <Login /> : <StorageList />}
              />
              <Route
                path='signup'
                element={!user ? <Signup /> : <StorageList />}
              />
              <Route
                path='contact'
                element={<Contact />}
              />
              <Route
                path='storage-list'
                element={!user ? <Login /> : <StorageList />}
              />
              <Route
                path='storage-overview'
                element={!user ? <Login /> : !inventoryKey ? <StorageList /> : <StorageOverview />}
              />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
