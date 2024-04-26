import React, { useEffect, useState } from 'react'

const Items = () => {
    const [title, setTitle] = useState('')

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('singleStorage'))
        const user = JSON.parse(localStorage.getItem('user'))
        setTitle(local.title)
        const fetchItems = async () => {
          const response = await fetch(`http://localhost:3500/items/getItems/${local.id}`, {
            headers: {'Authorization': `User ${user.jwt}`},
          })
          const json = await response.json()

          if (response.ok) {
            console.log(json)       
          }
        }
    }, [])

  return (
    <div className='single-storage'>
        <h3>Storage / basement unit: "{title}"</h3>
        
    </div>
  )
}

export default Items