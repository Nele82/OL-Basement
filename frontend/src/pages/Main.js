import React, { useState } from 'react'

const Main = () => {
  const [username, setUsername] = useState('')

  return (
    <div className='main-page display-f'>
      <main>
        <span>Welcome<span>, {username}</span>!</span>
        <h1>Online Basement</h1>
        <h2>Your online home storage space manager</h2>
        <p>Calculate your storage space while keeping track of all your supplies and remember:
        a well-organized basement not only provides efficient storage but also contributes to a more functional home.  
        </p>
        <div>
          <button>Log In</button>
          <div>
            <span>Don't have an account? Sign Up.</span>
            <button>Sign Up</button>
          </div>
        </div>
        <div>
          <button>Log Out</button>
          <button>To basement (s)</button>
        </div>
      </main>
      <section className='display-f'>
        <div>Section 1</div>
        <div>Section 2</div>
      </section>
    </div>
  )
}

export default Main