import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from '../slices/ItemsSlice'
import { getButtons } from '../slices/ButtonsSlice'
import { Link, useNavigate } from 'react-router-dom'
import ItemInputAndSpace from '../components/ItemInputAndSpace'
import distanceToNow from 'date-fns/formatDistanceToNow'
import DialogBoxItems from '../components/DialogBoxItems'
import UpdateItemsForm from '../components/UpdateItemsForm'
import { 
  updateItemTitle, 
  updateItemLength, 
  updateItemWidth, 
  updateItemHeight, 
  updateItemDescription, 
  updateItemCategory 
} from '../slices/UpdateItemSlice'

const StorageOverview = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.value)
    const buttons = useSelector(state => state.buttons.value)
    const [local, setLocal] = useState(JSON.parse(localStorage.getItem('singleStorage')))
    const [title, setTitle] = useState('')
    const navigate = useNavigate() 

    const filterElements = (arr, category) => {
      if(category === 'Show All Items') {
        for (let i = 0; i < arr.length; i++) {
          arr[i].style.display = 'flex'
          arr[i].style.flexDirection = 'column'
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children[0].children[1].innerText !== category) {
            arr[i].style.display = 'none'
          } else {
            arr[i].style.display = 'flex'
            arr[i].style.flexDirection = 'column'
          }  
        }
      }
    }

    useEffect(() => {

        if(!local){
          navigate('/storage-list')
        } else {
          setTitle(local.title)
        }

        const fetchItems = async () => {
          const response = await fetch(`http://localhost:3500/items/getItems/${local.id}`)
          const json = await response.json()

          if (response.ok) {
            dispatch(getItem(json)) 
            let arr = []
            for (let i = 0; i < json.length; i++) {
              arr.push(json[i]['category'])
            }
            arr = arr.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1])
            dispatch(getButtons(arr))
          }

          if (!response.ok) {
            console.log(json.message)       
          }
        }

        if (local) {
          fetchItems()
        }

    }, [])

  return (
    <div className="single-storage-housing">
        <h3>Storage / basement unit: "{title}"</h3>
        {/* I N P U T  &  S P A C E */}
        {local && items && <ItemInputAndSpace storageId={local.id} storeSpace={local.space} array={items} dimensions={local.dimensions}/>}
          <Link to='/storage-list'>
            Back to storage(s)
          </Link>
        <div className='storage-items'>
        <h3>Items:</h3>
          {items.length == 0 && <p>There are no items stored in this storage unit</p>}
          {/* BUTTONS GROUP */}
          <div className="buttons-group">
            {items.length > 0 &&
              <h4 
                className="filter-button-title"
              >
                Filter Items By Category:
              </h4>
            }
            {items.length > 0 && 
              <span 
                className="filter-buttons" 
                onClick={(e)=> {
                  filterElements(document.getElementsByClassName('items-group')[0].children, e.target.innerText)
                }}
              >
                Show All Items
              </span>
            }
            {buttons && buttons.map((btn, i) => (   
                <span 
                  className="filter-buttons"
                  key={i}
                  onClick={(e)=> {
                    filterElements(document.getElementsByClassName('items-group')[0].children, e.target.innerText)
                  }}
                >
                  {btn}
                </span>
            ))}
          </div>
          {/* ITEMS */}
          <div className="items-group">
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
                      {(((parseFloat(item.length) * parseFloat(item.width) * parseFloat(item.height)))/1000000).toFixed(4)} m3
                    </b>
                  </span>
                    <i
                      id={`${item._id.slice(4, 11)}-edit`} 
                      className="fa-regular fa-pen-to-square storage-item-buttons"
                      onClick={()=>{
                        document.getElementById(`${item._id.slice(4, 11)}-update-items`).style.display = 'flex'
                        document.getElementById(`${item._id.slice(4, 11)}-update-items`).style.flexDirection = 'column'
                        document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.display = 'none'
                        document.getElementById(`${item._id.slice(4, 11)}-delete-item`).style.display = 'none'
                        dispatch(updateItemTitle(item.itemTitle))
                        dispatch(updateItemLength(item.length))
                        dispatch(updateItemWidth(item.width))
                        dispatch(updateItemHeight(item.height))
                        dispatch(updateItemDescription(item.description))
                        dispatch(updateItemCategory(item.category))
                      }}
                    >
                    </i>
                    <i
                      id={`${item._id.slice(4, 11)}-delete`} 
                      className="fa-regular fa-trash-can storage-item-buttons"
                      onClick={()=>{
                        document.getElementById(`${item._id.slice(4, 11)}-delete-item`).style.display = 'flex'
                        document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.display = 'none'
                        document.getElementById(`${item._id.slice(4, 11)}-update-items`).style.display = 'none'
                      }}
                    >
                    </i>
                    <i 
                      id={`${item._id.slice(4, 11)}-info`}
                      className="fa-regular fa-circle-question storage-item-buttons"
                      onMouseEnter={()=>{
                        document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.display = 'flex'
                        document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.flexDirection = 'column'
                        document.getElementById(`${item._id.slice(4, 11)}-delete-item`).style.display = 'none'
                        document.getElementById(`${item._id.slice(4, 11)}-update-items`).style.display = 'none'
                      }}
                    >
                    </i>
                </div>
                {local && <UpdateItemsForm itemId={item._id} itemName={item.itemTitle} storeId={local.id}/>}
                {local && <DialogBoxItems itemId={item._id} storeId={local.id}/>}
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
    </div>
  )
}

export default StorageOverview