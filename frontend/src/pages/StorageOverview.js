import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createItem, getItem, updateItem, deleteItem } from '../slices/ItemsSlice'
import { Link, useNavigate } from 'react-router-dom'
import ItemInput from '../components/ItemInput'

const StorageOverview = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.value)
    const [local, setLocal] = useState(JSON.parse(localStorage.getItem('singleStorage')))
    const [title, setTitle] = useState('')
    const [availableSpace, setAvailableSpace] = useState(null)
    const navigate = useNavigate()
    const wLength = 10

    useEffect(() => {

        if(!local){
          navigate('/storage-list')
        } else {
          setTitle(local.title)
          setAvailableSpace(local.space)
        }

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

        if (local) {
          fetchItems()
        }

    }, [])

  return (
    <div className="single-storage-housing">
        {local && <ItemInput storageId={local.id}/>}
        <div className='single-storage'>
          <h3>Storage / basement unit: "{title}"</h3>
          {items.length == 0 && <p>There are no items stored in this storage unit</p>}
          {items.length > 0 && items.map((item) => (
            <div 
              className="storage-overview"
              key={item._id}
            >
              
            </div>
          ))}
          {availableSpace && <span>Available space: <b>{availableSpace.toFixed(2)}m3</b></span>}
          <div 
            className="progress-bar"
            data-label={`Used space`}
            style={{'--width': wLength}}
          >
          </div>
          <Link to='/storage-list'>
            Back to storage(s)
          </Link>
      </div>
    </div>
  )
}

export default StorageOverview