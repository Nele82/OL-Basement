import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStorage } from '../slices/StorageSlice'
import { deleteOneStorage } from '../hooks/useDelete'

const DialogBox = ({storageId}) => {
  const dispatch = useDispatch()
  // Redux
  const theme = useSelector(state => state.theme.value)

  return (
    <div 
      id={`${storageId.slice(4, 11)}-delete`}
      className='delete-box p-3'
    >
        <h3>Attention!</h3>
        <p>Confirming the deletion of this storage unit will also result in the <b>removal of all items associated with it.</b> Are you certain you wish to proceed?</p>
        <div className='display-f'>
            <button onClick={() => {
              deleteOneStorage(storageId)
              dispatch(deleteStorage(storageId))
            }}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
              color: theme ? 'rgb(238, 238, 238)' : 'black' 
            }}
            >
              Yes
            </button>
            <button onClick={() => {
              document.getElementById(`${storageId.slice(4, 11)}-delete`).style.display = 'none'
            }}
            style={{ 
              backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
              color: theme ? 'rgb(238, 238, 238)' : 'black' 
            }}
            >
              No
            </button>
        </div>
    </div>
  )
}

export default DialogBox