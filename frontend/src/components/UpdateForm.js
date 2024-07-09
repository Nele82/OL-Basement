import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updateStorage } from "../slices/StorageSlice"
import { setLoadingMsg } from '../slices/LoadingSlice'
import {updateTitle, updateLength, updateWidth, updateHeight} from '../slices/UpdateSlice'
import { loadBar, removeLoadBar } from '../hooks/useLoader'

const UpdateForm = ({storageId}) => {
    const facilityName = useSelector(state => state.update.value.title)
    const length = useSelector(state => state.update.value.length)
    const width = useSelector(state => state.update.value.width)
    const height = useSelector(state => state.update.value.height)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(null)
    // Redux
    const theme = useSelector(state => state.theme.value)
    const httpInput = useSelector(state => state.httpAddress.value)
    const dispatch = useDispatch()

    const patchStorage = async (facilityName, length, width, height, id) => {
        // Displays Loading message
        dispatch(setLoadingMsg('UPDATING STORAGE DETAILS . . . .'))
        loadBar()

        // Response time variables
        let startTime = new Date()
        let responseTime = null

        const user = JSON.parse(localStorage.getItem('user'))
        try {
            // 'httpInput' reducer holds the http address (no endpoint as it doesn't change) for 
            // deployment or production (whichever is set by the Developer inside it's Redux slice) 
            // for the backend
            const response = await fetch(`${httpInput}/facilities/updateStorage/${id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `User ${user.jwt}`},
                body: JSON.stringify({facilityName, length, width, height})
            })
            const json = await response.json()
        
            if (response.ok) {
                // Response time calculation
                responseTime = new Date() - startTime

                // Removes Loading message after 2 seconds or longer
                if (responseTime < 2000) {
                    setTimeout(() => {
                    removeLoadBar()
                    }, 2000)
                } else {
                    removeLoadBar()
                }
                setSuccess('The basement / storage unit has been successfully updated!')
                dispatch(updateStorage(json))
            }
            if (!response.ok) {
                // Response time calculation
                responseTime = new Date() - startTime

                // Removes Loading message after 2 seconds or longer
                if (responseTime < 2000) {
                    setTimeout(() => {
                    removeLoadBar()
                    }, 2000)
                } else {
                    removeLoadBar()
                }
                console.log(json.message)
            }
        } catch (error) {
            if (!error?.response) {
                // No server response (server is down)
                setError(`Unable to establish server connection. Please verify your internet 
                    connection and try again. If the problem persists, kindly reach out to the 
                    developer through the 'Contact' page.`)
                removeLoadBar()
            } 
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
        setTimeout(() => {
          setSuccess(null)
          document.getElementById(`${storageId.slice(4, 11)}-update`).style.display = 'none'
        }, 5000)
      }

  return (
    <form 
        id={`${storageId.slice(4, 11)}-update`}
        className='update-form fd-c p-1'
        onSubmit={handleSubmit}
        style={{ 
            backgroundColor: theme ? 'black' : 'white'
        }}
    >
        <div className="storage-unit-header-house display-f jc-c ai-c">
            <h3 className="display-f jc-c">Update Form</h3>
            <i
                className="fa-regular fa-rectangle-xmark display-f jc-c"
                onClick={()=>{
                    document.getElementById(`${storageId.slice(4, 11)}-update`).style.display = 'none'
                }}
                style={{ 
                    color: theme ? 'rgb(255, 255, 255)' : 'black' 
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
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
                color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
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
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
                color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
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
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
                color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
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
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
                color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
        />
        <button 
            type="submit"
            disabled={loading}
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
                color: theme ? 'rgb(238, 238, 238)' : 'black' 
            }}
        >
            Update
        </button>
        {error && <div><b>ATTENTION! </b>{error}</div>}
        {success && <div><b>SUCCESS! </b>{success}</div>}
    </form>
  )
}

export default UpdateForm