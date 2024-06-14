import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from '../slices/ItemsSlice'
import { getButtons } from '../slices/ButtonsSlice'
import { Link, useNavigate } from 'react-router-dom'
import distanceToNow from 'date-fns/formatDistanceToNow'
import ItemInputAndSpace from '../components/ItemInputAndSpace'
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
import { CSVLink } from "react-csv"

const StorageOverview = () => {
    const buttons = useSelector(state => state.buttons.value)
    const [local, setLocal] = useState(JSON.parse(localStorage.getItem('singleStorage')))
    const [title, setTitle] = useState('')
    const navigate = useNavigate() 
    // Redux    
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme.value)
    const items = useSelector(state => state.items.value)

    const filterElements = (arr, category) => {
      if(category === 'Show All Items') {
        for (let i = 0; i < arr.length; i++) {
          arr[i].style.display = 'flex'
          arr[i].style.flexDirection = 'column'
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children[0].children[4].children[1].innerText.split(': ')[1] !== category) {
            arr[i].style.display = 'none'
          } else {
            arr[i].style.display = 'flex'
            arr[i].style.flexDirection = 'column'
          }  
        }
      }
    }

    // CSV file generetor function
    const csvGenerate = (arr) => {
      let csvItems = []
      for (let i = 0; i < arr.length; i++) {
        csvItems = [...csvItems, new Array(
          arr[i].category, 
          arr[i].itemTitle, 
          arr[i].height, 
          arr[i].width, 
          arr[i].length, 
          arr[i].description, 
          new Date(arr[i].createdAt), 
          new Date(arr[i].updatedAt) 
        )]
      }
      csvItems.unshift(['CATEGORY',
      'TITLE',
      'ITEM HEIGHT (CM)',
      'ITEM WIDTH (CM)',
      'ITEM LENGTH (CM)',
      'DESCRIPTION',
      'CREATED ON (DATE)',
      'UPDATED ON (DATE)'
      ])
      return csvItems
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

        // Changes main DIV's layout on resize
        const changeLayout = () => {
          if (window.innerWidth > 1199) {
            document.getElementsByClassName('single-storage-housing')[0].style.flexDirection = 'row'
          } else {
            document.getElementsByClassName('single-storage-housing')[0].style.flexDirection = 'column'
          }
        }

        window.addEventListener('resize', changeLayout)

        // Cleanup
        return () => {
          window.removeEventListener('resize', changeLayout)
        }
    }, [])
    
  return (
    <div className={window.innerWidth > 1199 ? "single-storage-housing display-f fd-r" : "single-storage-housing display-f fd-c"}>

        {/* U P P E R */}

        <div 
          id="storage-overview-upper"
          className='display-f fd-c col-12-xs col-5-xl ml-a mr-a'
        >
          {/* TITLE */}
          <h3>Storage / basement unit: "{title}"</h3>
          {/* STORAGE UNIT INFO & INPUT FORM */}
          {local && items && <ItemInputAndSpace storageId={local.id} storeSpace={local.space} array={items} dimensions={local.dimensions}/>}
          {/* BACK TO STORAGES */}
          <Link 
            to='/storage-list'
            onClick={() => window.scrollTo(0, 0)}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
              color: theme ? 'rgb(238, 238, 238)' : 'black' 
            }}
          >
            Back to storage(s)
          </Link>
        </div> 

        {/* L O W E R */}

        <div 
          id="storage-overview-lower"
          className='display-f fd-c col-5-xl ml-a mr-a'
        >
          {/* TITLE*/}
          <h3>Items:</h3>
          {/* NO ITEMS MESSAGE */}
          {items.length === 0 && <p><b>There are no items stored in this storage unit.</b></p>}
          {/* BUTTONS */}
          {items.length > 0 && 
          <div className="buttons-group display-f fd-c">
            {items.length > 0 &&
              <h4 
                className="filter-button-title"
              >
                Filter Items By Category:
              </h4>
            }
            <div className="filter-buttons display-f fr-w">
              {items.length > 0 && 
                <span 
                  className="filter-button display-f jc-c ai-c" 
                  onClick={(e)=> {
                    filterElements(document.getElementsByClassName('items-group')[0].children, e.target.innerText)
                  }}
                  style={{ 
                    border: theme ? '1px solid white' : '1px solid black'
                  }}
                >
                  Show All Items
                </span>
              }
              {buttons && buttons.map((btn, i) => (   
                  <span 
                    className="filter-button display-f jc-c ai-c"
                    key={i}
                    onClick={(e)=> {
                      filterElements(document.getElementsByClassName('items-group')[0].children, e.target.innerText)
                    }}
                    style={{ 
                      border: theme ? '1px solid white' : '1px solid black'
                    }}
                  >
                    {btn}
                  </span>
              ))}
            </div>
          </div>
          }
          {/* ITEMS */}
          {items.length > 0 && 
          <div className="items-group display-f ai-c col-12-xs">
            {items.length > 0 && items.map((item) => (
              // Single item DIV element
              <div 
                id={item._id.slice(4, 11)}
                className="storage-item p-1 col-12-xs col-5-lg"
                key={item._id}
                onMouseLeave={()=>{
                  document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.display = 'none'
                  document.getElementById(`${item._id.slice(4, 11)}-update-items`).style.display = 'none'
                  document.getElementById(`${item._id.slice(4, 11)}-delete-item`).style.display = 'none'
                }}
              >
                {/* Item header DIV element - Info & buttons*/}
                <div className="storage-item-header display-f fd-c">
                  {/* Item management buttons - DIV element */}
                  <div className="storage-item-buttons display-f ai-c m-a">
                    <i
                        id={`${item._id.slice(4, 11)}-edit`} 
                        className="fa-regular fa-pen-to-square storage-item-buttons ml-1"
                        onClick={()=>{
                          document.getElementById(`${item._id.slice(4, 11)}-update-items`).style.display = 'flex'
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
                        className="fa-regular fa-trash-can storage-item-buttons ml-1"
                        onClick={()=>{
                          document.getElementById(`${item._id.slice(4, 11)}-delete-item`).style.display = 'flex'
                          document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.display = 'none'
                          document.getElementById(`${item._id.slice(4, 11)}-update-items`).style.display = 'none'
                        }}
                      >
                      </i>
                      <i 
                        id={`${item._id.slice(4, 11)}-info`}
                        className="fa-regular fa-circle-question storage-item-buttons ml-1"
                        onMouseEnter={()=>{
                          document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.display = 'flex'
                          document.getElementById(`${item._id.slice(4, 11)}-item-details`).style.flexDirection = 'column'
                          document.getElementById(`${item._id.slice(4, 11)}-delete-item`).style.display = 'none'
                          document.getElementById(`${item._id.slice(4, 11)}-update-items`).style.display = 'none'
                        }}
                      >
                      </i>
                  </div>
                  {/* Item update form component */}
                  {local && <UpdateItemsForm itemId={item._id} itemName={item.itemTitle} storeId={local.id}/>}
                  {/* Item delete - dialog box component */}
                  {local && <DialogBoxItems itemId={item._id} storeId={local.id}/>}
                  {/* Item info housing */}
                  <div 
                    id={`${item._id.slice(4, 11)}-item-details`}
                    className="storage-item-details"
                  >
                    <div className="description-section display-f fd-c">
                      <span><b>Item description:</b></span>
                      <p>{item.description}</p>
                    </div>
                    <span><b>Length:</b> {item.length} cm</span>
                    <span><b>Width:</b> {item.width} cm</span>
                    <span><b>Height:</b> {item.height} cm</span>
                    <span><b>Created:</b> {distanceToNow(new Date(item.createdAt))} ago</span>
                    <span><b>Updated:</b> {distanceToNow(new Date(item.updatedAt))} ago</span>
                  </div>
                  {/* Item info */}
                  <div className="storage-item-info display-f fd-c col-12-xs">
                    <span>Title: <b>{item.itemTitle}</b></span>
                    <span>Category: {item.category}</span>
                    <span>Space taken: <b className="single-item-space">{(((parseFloat(item.length) * parseFloat(item.width) * parseFloat(item.height)))/1000000).toFixed(4)} m3</b></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          }
          {/* CSV GENERATOR*/}
          <div 
            id="download-csv"
          >
            <span>By clicking the <b>'Download CSV'</b> button, all stored items will be downloaded as a <b>.csv</b> file:</span>
            <CSVLink 
              data={csvGenerate(items)}
              style={{ 
                backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
                color: theme ? 'rgb(238, 238, 238)' : 'black' 
              }}
            >
              Download CSV
            </CSVLink>
          </div>
        </div>    
    </div>
  )
}

export default StorageOverview