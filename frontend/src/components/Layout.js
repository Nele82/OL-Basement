import React from 'react'
import {Outlet} from 'react-router-dom'

import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
        <Header/>
        <Navbar/>
          <main className='site-wrapper col-10-xs col-10-sm col-9-md col-10-lg col-11-xl display-f fd-c ac-c jc-sb m-a'>
            <Outlet/>
          </main>
        <Footer/>
    </div>
  )
}

export default Layout