import React, { useEffect } from 'react'
import StorageInput from '../components/StorageInput'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage } from '../slices/StorageSlice'

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
    }, [storages])
  
  return (
    <div className='storage-wrapper'>
      <StorageInput />
      <h3>Your basement / storage units</h3>
      {storages && storages.map((storage)=>(
        <div className="storage-details" key={storage._id}>
          <h3>Storage unit: {storage.facilityName}</h3>
          <span>Length: {storage.length}m</span>
          <span>Width: {storage.width}m</span>
          <span>Height: {storage.height}m</span>
        </div>
      ))}
    </div>
  )
}

export default StorageList