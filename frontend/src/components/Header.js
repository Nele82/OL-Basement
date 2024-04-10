import React, { useState } from 'react'

const Header = () => {
  const [username, setUsername] = useState('')

  return (
    <header className='header'>
      <p>Welcome <span>, {username}</span>!</p>
    </header>
  )
}

export default Header