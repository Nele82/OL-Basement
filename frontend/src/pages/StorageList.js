import React, { useEffect } from 'react'
import StorageInput from '../components/StorageInput'
import DialogBox from '../components/DialogBox'
import UpdateForm from '../components/UpdateForm'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage } from '../slices/StorageSlice'
import distanceToNow from 'date-fns/formatDistanceToNow'

import { login, logout } from '../slices/AuthSlice'
import { updateHeight, updateLength, updateTitle, updateWidth } from '../slices/UpdateSlice'
import { Link, useNavigate } from 'react-router-dom'

const StorageList = () => {
    const dispatch = useDispatch()
    const storages = useSelector(state=> state.storage.value)
    const user = useSelector(state => state.user.value)
    const navigate = useNavigate()

    useEffect(()=>{
      if (JSON.parse(localStorage.getItem('user'))) {
          dispatch(login(JSON.parse(localStorage.getItem('user'))))
      } else {
          dispatch(logout())
      }
      localStorage.removeItem('singleStorage')
      navigate('/storage-list')
    }, [])

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
    <div className='storage-wrapper display-f fd-c'>
      <h3>Basement / storage units (User: {user.username})</h3>
      {storages.length === 0 && <p>There are no storage units saved for {user.username}</p>}
      {storages && storages.map((storage)=>(
        <div 
          id={storage._id.slice(4, 11)}
          className="storage-details display-f fd-c jc-c mb-3" 
          key={storage._id}
        >
          <h3>Storage unit: {storage.facilityName}</h3>
          <span>Length: <b>{(storage.length).toFixed(2)}m</b></span>
          <span>Width: <b>{(storage.width).toFixed(2)}m</b></span>
          <span>Height: <b>{(storage.height).toFixed(2)}m</b></span>
          <span>Volume (m³): <b>{(parseFloat(storage.length) * parseFloat(storage.width) * parseFloat(storage.height)).toFixed(2)}m3</b></span>
          <span>Created <b>{distanceToNow(new Date(storage.createdAt))}</b> ago</span>
          <span>Updated <b>{distanceToNow(new Date(storage.updatedAt))}</b> ago</span>
          <div className="manage-storage-unit display-f jc-sb">
            <button onClick={() => {
              document.getElementById(`${storage._id.slice(4, 11)}-delete`).style.display = 'block'
              document.getElementById(`${storage._id.slice(4, 11)}-update`).style.display = 'none'
            }}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <button onClick={() => {
              document.getElementById(`${storage._id.slice(4, 11)}-update`).style.display = 'flex'
              document.getElementById(`${storage._id.slice(4, 11)}-delete`).style.display = 'none'
              dispatch(updateTitle(storage.facilityName))
              dispatch(updateLength(storage.length))
              dispatch(updateWidth(storage.width))
              dispatch(updateHeight(storage.height))
            }}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <Link
              onClick={() => {
                localStorage.setItem('singleStorage', JSON.stringify({title: storage.facilityName, id: storage._id, space: ((parseFloat(storage.length) * parseFloat(storage.width) * parseFloat(storage.height))).toFixed(4), dimensions: {length: storage.length, width: storage.width, height: storage.height}}))
                window.scrollTo(0, 0)
              }}
              to='/storage-overview'
            >
              View Storage Items
            </Link>
          </div>
          <DialogBox storageId={storage._id} />
          <UpdateForm storageId={storage._id} />
        </div>
      ))}
      <StorageInput />
      <button onClick={() => {
          dispatch(logout())
          localStorage.clear()
          navigate('/login')
        }}
      >
        Log Out
      </button>
    </div>
  )
}

export default StorageList