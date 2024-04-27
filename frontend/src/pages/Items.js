import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createItem, getItem, updateItem, deleteItem } from '../slices/ItemsSlice'
import { Link } from 'react-router-dom'

const Items = () => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.value)

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('singleStorage'))

        setTitle(local.title)
        const fetchItems = async () => {
          const response = await fetch(`http://localhost:3500/items/getItems/${local.id}`)
          const json = await response.json()

          if (response.ok) {
            dispatch(getItem(json))
            console.log(json)       
          }

          if (!response.ok) {
            console.log(json)       
          }
        }

        fetchItems()
    }, [])

  return (
    <div className='single-storage'>
        <h3>Storage / basement unit: "{title}"</h3>
        
    </div>
  )
}

export default Items