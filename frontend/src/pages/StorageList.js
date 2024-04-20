import React, { useEffect } from 'react'
import StorageInput from '../components/StorageInput'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage } from '../slices/StorageSlice'
import distanceToNow from 'date-fns/formatDistanceToNow'
import DialogBox from '../components/DialogBox'

const StorageList = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const storages = useSelector((state)=> state.storage.value)

    useEffect(()=>{
      const fetchStorage = async () => {
        const response = await fetch('http://localhost:3500/facilities/getStorages', {
          headers: {'Authorization': `User ${user.jwt}`},
        })
        const json = await response.json()

        if (response.ok) {
          dispatch(getStorage(json))          
        }
      }

      if (user) {
        fetchStorage()
      }
    }, [])
  
  return (
    <div className='storage-wrapper'>
      <StorageInput />
      <h3>Your basement / storage units</h3>
      {storages.length == 0 && <p>There are no storage units saved for {user.username}</p>}
      {storages && storages.map((storage)=>(
        <div className="storage-details" key={storage._id}>
          <h3>Storage unit: {storage.facilityName}</h3>
          <span>Length: <b>{(storage.length).toFixed(2)}m</b></span>
          <span>Width: <b>{(storage.width).toFixed(2)}m</b></span>
          <span>Height: <b>{(storage.height).toFixed(2)}m</b></span>
          <span>Available space: <b>{(parseFloat(storage.length) * parseFloat(storage.width) * parseFloat(storage.height)).toFixed(2)}m3</b></span>
          <span>Created <b>{distanceToNow(new Date(storage.createdAt))}</b> ago</span>
          <span>Updated <b>{distanceToNow(new Date(storage.updatedAt))}</b> ago</span>
          <button onClick={() => {
            document.querySelector("#root > div > div > main > div > div > div").style.display = 'block'
          }}>
            Delete
          </button>
          <DialogBox storageId={storage._id}/>
        </div>
      ))}
    </div>
  )
}

export default StorageList