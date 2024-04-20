import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteStorage } from '../slices/StorageSlice'
import { deleteOneStorage } from '../hooks/useDelete'

const DialogBox = ({storageId}) => {
  const dispatch = useDispatch()

  return (
    <div className='delete-box'>
        <h3>Attention!</h3>
        <p>Deleting this storage unit will remove all assigned items. Are you sure you want to proceed?</p>
        <div>
            <button onClick={() => {
              deleteOneStorage(storageId)
              dispatch(deleteStorage(storageId))
            }}>
              Yes
            </button>
            <button onClick={() => {
              document.querySelector("#root > div > div > main > div > div > div").style.display = 'none'
            }}>
              No
            </button>
        </div>
    </div>
  )
}

export default DialogBox