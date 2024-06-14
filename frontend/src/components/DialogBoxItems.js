import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteOneItem } from '../hooks/useDelete'
import { deleteItem } from '../slices/ItemsSlice'
import { getButtons } from '../slices/ButtonsSlice'

const DialogBoxItems = ({itemId, storeId}) => {
    const dispatch = useDispatch()

    // Fetching data for the filter buttons
    const buttonsArray = async () => {
      const arr = await fetch(`http://localhost:3500/items/getItems/${storeId}`)
      const arrJSON = await arr.json()
      if(arr.ok) {
        let array = []
        for (let i = 0; i < arrJSON.length; i++) {
          array.push(arrJSON[i]['category'])
        }
        array = array.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1])
        dispatch(getButtons(array))
      }
      if (!arr.ok) {
          console.log(arrJSON.message)
      }
    }

  return (
    <div
        id={`${itemId.slice(4, 11)}-delete-item`}
        className='items-delete-box fd-c ai-c'
    >
        <p>Are you sure you want to delete this Item?</p>
        <div>
            <button
                onClick={()=>{
                    deleteOneItem(itemId)
                    dispatch(deleteItem(itemId))
                    document.getElementById(`${itemId.slice(4, 11)}-delete-item`).style.display = 'none'
                    buttonsArray()
                }}
            >
                Yes
            </button>
            <button
                onClick={()=>{
                    document.getElementById(`${itemId.slice(4, 11)}-delete-item`).style.display = 'none'
                }}
            >
                No
            </button>
        </div>
    </div>
  )
}

export default DialogBoxItems