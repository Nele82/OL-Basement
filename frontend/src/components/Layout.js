import React from 'react'
import {Outlet} from 'react-router-dom'

import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='site-wrapper display-f'>
        <Header/>
        <Navbar/>
          <main className='main-wrapper display-f'>
            <Outlet/>
          </main>
        <Footer/>
    </div>
  )
}

export default Layout