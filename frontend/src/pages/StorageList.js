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
    const storages = useSelector(state=> state.storage.value)
    const user = useSelector(state => state.user.value)
    const navigate = useNavigate()
    // Redux
    const theme = useSelector(state => state.theme.value)
    const dispatch = useDispatch()

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
    <div className='storage-wrapper col-11-sm col-12-md display-f fd-c ai-c ml-a mr-a'>
      <h3>Basement / storage units (User: {user.username})</h3>
      {/* NO STORAGE MESSAGE */}
      {storages.length === 0 && <p className='display-f fd-c jc-c'>There are no storage units saved for<b className='ml-1'>{user.username}</b></p>}
      {/* STORAGE UNITS HOUSING */}
      {storages.length > 0 &&
      <div 
        id="storage-units-housing"
        className='display-f fr-w jc-sa col-12-xs col-11-md col-12-lg col-9-xl mr-a ml-a'
      >
          {storages && storages.map((storage)=>(
          // SINGLE UNIT (HOUSING DIV)
          <div 
            id={storage._id.slice(4, 11)}
            className="storage-details display-f fd-c jc-c col-12-xs col-12-md col-5-lg col-5-xl" 
            key={storage._id}
            style={{ 
              backgroundColor: theme ? 'black' : 'white'
            }}
          >
          {/* STORAGE UNIT INFO */}
            <h3>Storage unit: {storage.facilityName}</h3>
            <span>Length: <b>{(storage.length).toFixed(2)}m</b></span>
            <span>Width: <b>{(storage.width).toFixed(2)}m</b></span>
            <span>Height: <b>{(storage.height).toFixed(2)}m</b></span>
            <span>Volume (m³): <b>{(parseFloat(storage.length) * parseFloat(storage.width) * parseFloat(storage.height)).toFixed(2)}m3</b></span>
            <span>Created <b>{distanceToNow(new Date(storage.createdAt))}</b> ago</span>
            <span>Updated <b>{distanceToNow(new Date(storage.updatedAt))}</b> ago</span>
            {/* BUTTONS DIV */}
            <div className="manage-storage-unit display-f fd-c">
              {/* Delete & update storage - DIV */}
              <div className="delete-update-store display-f jc-sb">
                <button onClick={() => {
                  document.getElementById(`${storage._id.slice(4, 11)}-delete`).style.display = 'block'
                  document.getElementById(`${storage._id.slice(4, 11)}-update`).style.display = 'none'
                }}
                style={{ 
                  backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
                  color: theme ? 'rgb(238, 238, 238)' : 'black' 
                }}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <button onClick={() => {
                  document.getElementById(`${storage._id.slice(4, 11)}-update`).style.display = 'flex'
                  document.getElementById(`${storage._id.slice(4, 11)}-delete`).style.display = 'none'
                  dispatch(updateTitle(storage.facilityName))
                  dispatch(updateLength(storage.length))
                  dispatch(updateWidth(storage.width))
                  dispatch(updateHeight(storage.height))
                }}
                style={{ 
                  backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
                  color: theme ? 'rgb(238, 238, 238)' : 'black' 
                }}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </div>
              {/* DELETE DIALOG BOX & STORAGE UNIT'S UPDATE FORM */}
              <DialogBox storageId={storage._id} />
              <UpdateForm storageId={storage._id} />
              {/* View storage details button */}
              <Link
                onClick={() => {
                  localStorage.setItem('singleStorage', JSON.stringify({title: storage.facilityName, id: storage._id, space: ((parseFloat(storage.length) * parseFloat(storage.width) * parseFloat(storage.height))).toFixed(4), dimensions: {length: storage.length, width: storage.width, height: storage.height}}))
                  window.scrollTo(0, 0)
                }}
                to='/storage-overview'
                style={{ 
                  backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
                  color: theme ? 'rgb(238, 238, 238)' : 'black' 
                }}
              >
                View Storage Items
              </Link>
            </div>
          </div>
        ))}
      </div>
      }
      {/* STORAGE INPUT */}
      <StorageInput />
      {/* LOG OUT BUTTON */}
      <button 
        className='col-12-xs col-7-lg'
        onClick={() => {
          dispatch(logout())
          localStorage.clear()
          navigate('/login')
        }}
        style={{ 
          backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
          color: theme ? 'rgb(238, 238, 238)' : 'black' 
        }}
      >
        Log Out
      </button>
    </div>
  )
}

export default StorageList