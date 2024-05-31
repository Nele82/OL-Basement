import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updateStorage } from "../slices/StorageSlice"
import {updateTitle, updateLength, updateWidth, updateHeight} from '../slices/UpdateSlice'

const UpdateForm = ({storageId}) => {
    const facilityName = useSelector(state => state.update.value.title)
    const length = useSelector(state => state.update.value.length)
    const width = useSelector(state => state.update.value.width)
    const height = useSelector(state => state.update.value.height)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(null)
    const dispatch = useDispatch()

    const patchStorage = async (facilityName, length, width, height, id) => {
        const user = JSON.parse(localStorage.getItem('user'))
    
        const response = await fetch(`http://localhost:3500/facilities/updateStorage/${id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `User ${user.jwt}`},
            body: JSON.stringify({facilityName, length, width, height})
        })
        const json = await response.json()
    
        if (response.ok) {
            console.log('Storage has been updated')
            dispatch(updateStorage(json))
        }
        if (!response.ok) {
            console.log(json.message)
        }
    } 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validTitleInput = /^[(A-Z)(a-z)\d\s(!@#$%^&*()_+=[\]{}|;:'",.<>?`~\-)]{4,20}$/
        const validNumberInput = /^(0|[1-9]\d*)(\.\d{1,2})?$/
        const testTitle = validTitleInput.test(facilityName)
        const testLength = validNumberInput.test(length)
        const testWidth = validNumberInput.test(width)
        const testHeight = validNumberInput.test(height)
    
        if(!facilityName || !testTitle) {
          setError('Please provide the updated title for the basement. The title can consist of a combination of lowercase or uppercase letters, digits, and any characters, with a length ranging from 4 to 20 characters.')
          return
        }
        if(!length || !testLength) {
          setError('Please enter the updated length. The input can be either a whole number or a decimal with up to two digits after the decimal point')
          return
        }
        if(!width || !testWidth) {
          setError('Please enter the updated width. The input can be either a whole number or a decimal with up to two digits after the decimal point')
          return
        }
        if(!height || !testHeight) {
          setError('Please enter the updated height. The input can be either a whole number or a decimal with up to two digits after the decimal point')
          return
        }
    
        patchStorage(facilityName, length, width, height, storageId)
        setSuccess('The basement / storage unit has been successfully updated!')
        setTimeout(() => {
          setSuccess(null)
          document.getElementById(`${storageId.slice(4, 11)}-update`).style.display = 'none'
        }, 2000)
      }

  return (
    <form 
        id={`${storageId.slice(4, 11)}-update`}
        className='update-form fd-c p-2'
        onSubmit={handleSubmit}
    >
        <div className="storage-unit-header-house display-f">
            <h3>Update Form</h3>
            <i
                className="fa-regular fa-rectangle-xmark"
                onClick={()=>{
                    document.getElementById(`${storageId.slice(4, 11)}-update`).style.display = 'none'
                }}
            > 
            </i>
        </div>
        <label>New storage facility title:</label>
        <input 
            type="text" 
            id={`${storageId.slice(4, 11)}-facility-title`}
            className='storage-input'
            onChange={(e)=> dispatch(updateTitle(e.target.value))}
            onClick = {() => {
                setError(null)
                setSuccess(null)
            }}
            value={facilityName}
        />
        <label>New length (m):</label>
        <input 
            type="text" 
            id={`${storageId.slice(4, 11)}-length`}
            className='storage-input'
            onChange={(e)=> dispatch(updateLength(e.target.value))}
            onClick = {() => {
                setError(null)
                setSuccess(null)
            }}
            value={length}
        />
        <label>New width (m):</label>
        <input 
            type="text" 
            id={`${storageId.slice(4, 11)}-width`}
            className='storage-input'
            onChange={(e)=> dispatch(updateWidth(e.target.value))}
            onClick = {() => {
                setError(null)
                setSuccess(null)
            }}
            value={width}
        />
        <label>New height (m):</label>
        <input 
            type="text" 
            id={`${storageId.slice(4, 11)}-height`}
            className='storage-input display-f fd-c jc-c'
            onChange={(e)=> dispatch(updateHeight(e.target.value))}
            onClick = {() => {
                setError(null)
                setSuccess(null)
            }}
            value={height}
        />
        <button 
            type="submit"
            disabled={loading}
        >
            Update
        </button>
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
    </form>
  )
}

export default UpdateForm