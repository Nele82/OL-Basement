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
import { timeOut } from './hooks/useTimer'

function App() {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem('user'))) {
      dispatch(login(JSON.parse(localStorage.getItem('user'))))
    } else {
      dispatch(logout())
    }

    const difference = timeOut()

    if(difference >= 3590000) {
      dispatch(logout())
      localStorage.clear()
    } else {
      setTimeout(() => {
        dispatch(logout())
        localStorage.clear()
      }, difference)
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
                element={<StorageOverview />}
              />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
