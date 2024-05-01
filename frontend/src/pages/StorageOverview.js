import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createItem, getItem, updateItem, deleteItem } from '../slices/ItemsSlice'
import { Link, useNavigate } from 'react-router-dom'
import ItemInput from '../components/ItemInput'
import distanceToNow from 'date-fns/formatDistanceToNow'

const StorageOverview = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.value)
    const [local, setLocal] = useState(JSON.parse(localStorage.getItem('singleStorage')))
    const [title, setTitle] = useState('')
    const [basementSpace, setbasementSpace] = useState(null)
    const [filterButtons, setFilterButtons] = useState(null)
    const navigate = useNavigate()

    const occupiedSpaceCubic = (arr) => {      
      let occupiedInCubicMeters = 0
      for (let i = 0; i < arr.length; i++) {
        occupiedInCubicMeters += parseFloat(arr[i].innerHTML)
      }
      return occupiedInCubicMeters
    }

    const occupiedSpacePercentage = (totalSpace, itemsSpace) => {      
      let occupiedSpace = parseInt((itemsSpace * 100) / totalSpace)
      return occupiedSpace
    }

    const buttonsArray = (arr) => {
      let buttonArray = []    
      for (let i = 0; i < arr.length; i++) {
        buttonArray.push(arr[i].category)
      }    
      buttonArray = buttonArray.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1])    
      return buttonArray
    }    

    useEffect(() => {

        if(!local){
          navigate('/storage-list')
        } else {
          setTitle(local.title)
          setbasementSpace(local.space)
        }

        const fetchItems = async () => {
          const response = await fetch(`http://localhost:3500/items/getItems/${local.id}`)
          const json = await response.json()

          if (response.ok) {
            dispatch(getItem(json))  
            setFilterButtons(buttonsArray(json))
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
        <h3>Storage / basement unit: "{title}"</h3>
        {local && <ItemInput storageId={local.id}/>}
        {basementSpace && <span>Basement space: <b>{basementSpace.toFixed(2)} m3</b></span>}
        <span>Available space: <b>{(basementSpace - (occupiedSpaceCubic(document.getElementsByClassName('single-item-space')))).toFixed(2)} m3</b></span>
          <div 
            className="progress-bar"
            style={{'--width': occupiedSpacePercentage(basementSpace, occupiedSpaceCubic(document.getElementsByClassName('single-item-space')))}}
          >
            <span id='single-storage-avail'>{`Used space: ${occupiedSpacePercentage(basementSpace, occupiedSpaceCubic(document.getElementsByClassName('single-item-space')))}%`}</span>
          </div>
          <Link to='/storage-list'>
            Back to storage(s)
          </Link>
        <div className='storage-items'>
        <h3>Items:</h3>
          {items.length == 0 && <p>There are no items stored in this storage unit</p>}
          {filterButtons && <h4 
            className="filter-button-title"
            >
              Filter Items By Category:
            </h4>}
          {filterButtons && filterButtons.map((btn) => (
              <span 
                className="filter-buttons"
                key={btn}
              >
                {btn}
              </span>
          ))}
          {items.length > 0 && items.map((item) => (
            <div 
              id={item._id.slice(4, 11)}
              className="storage-item"
              key={item._id}
              onMouseLeave={()=>{
                document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.display = 'none'
              }}
            >
              <div className="storage-item-header">
                <span>{item.itemTitle}</span>
                <span>{item.category}</span>
                <span>Space taken: 
                  <b 
                    className="single-item-space"
                  >
                    {(((parseFloat(item.length) * parseFloat(item.width) * parseFloat(item.height)))/1000000).toFixed(2)} m3
                  </b>
                </span>
                  <i
                    id={`${item._id.slice(4, 11)}-edit`} 
                    className="fa-regular fa-pen-to-square storage-item-buttons"
                  >
                  </i>
                  <i
                    id={`${item._id.slice(4, 11)}-delete`} 
                    className="fa-regular fa-trash-can storage-item-buttons"
                  >
                  </i>
                  <i 
                    id={`${item._id.slice(4, 11)}-info`}
                    className="fa-regular fa-circle-question storage-item-buttons"
                    onMouseEnter={()=>{
                      document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.display = 'flex'
                      document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.flexDirection = 'column'
                    }}
                  >
                  </i>
              </div>
              <div 
                id={`${item._id.slice(4, 11)}-item-details`}
                className="storage-item-details"
              >
                <div className="description-section">
                  <span>Item description:</span>
                  <p>{item.description}</p>
                </div>
                <span>Length: {item.length} cm</span>
                <span>Width: {item.width} cm</span>
                <span>Height: {item.height} cm</span>
                <span>Created: {distanceToNow(new Date(item.createdAt))} ago</span>
                <span>Updated: {distanceToNow(new Date(item.updatedAt))} ago</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default StorageOverview