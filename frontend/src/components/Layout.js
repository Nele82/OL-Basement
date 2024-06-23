import React from 'react'
import {Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
  
const Layout = () => {
  // Redux
  const theme = useSelector(state => state.theme.value)
  const loadingMsg = useSelector(state => state.loading.value)

  return (
    <div>
        <Header/>
        <Navbar/>
          {/* LOADER */}
          <div 
            className='fd-c jc-c ai-c'
            id="loading"
            style={{ 
              backgroundColor: theme ? 'rgba(255, 255, 255, 0.856)' : 'rgba(0, 0, 0, 0.705)'
            }}
          >
            <div id="loader"></div>
            <p
                style={{ 
                  color: theme ? 'black' : 'white',
                  fontWeight: theme ? 'bold' : 'normal'
                }}
            >
              {loadingMsg} Server's spin-up time is 35-45 seconds. If it remains inactive beyond this duration, please verify your internet connection, refresh the page and try again.
            </p>
          </div>
          {/* SITE WRAPPER */}
          <main className='site-wrapper col-10-xs col-10-sm col-9-md col-10-lg col-11-xl display-f fd-c ac-c jc-sb m-a'>
            <Outlet/>
          </main>
        <Footer/>
    </div>
  )
}

export default Layout