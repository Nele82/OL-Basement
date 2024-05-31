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
          <main className='col-10-xs col-9-sm col-9-md col-8-lg col-8-xl display-f fd-c ac-c jc-sb m-a'>
            <Outlet/>
          </main>
        <Footer/>
    </div>
  )
}

export default Layout