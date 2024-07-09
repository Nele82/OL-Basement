import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOneItem } from '../hooks/useDelete'
import { deleteItem } from '../slices/ItemsSlice'
import { getButtons } from '../slices/ButtonsSlice'

const DialogBoxItems = ({itemId, storeId}) => {
    const dispatch = useDispatch()
    const httpInput = useSelector(state => state.httpAddress.value)

    // Fetching data for the filter buttons
    const buttonsArray = async () => {
    // 'httpInput' reducer holds the http address (no endpoint as it doesn't change) for 
    // deployment or production (whichever is set by the Developer inside it's Redux slice) 
    // for the backend
        try {
            const arr = await fetch(`${httpInput}/items/getItems/${storeId}`)
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
        } catch (error) {
            if (!error?.response) {
                // No server response (server is down)
                console.log('Server Down - Unable to generate a buttons array')
            } 
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
                    deleteOneItem(itemId) // Calls a 'useDelete' custom hook function 
                    dispatch(deleteItem(itemId)) // Updates the state
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