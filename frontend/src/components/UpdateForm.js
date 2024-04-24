import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { updateStorage } from "../slices/StorageSlice"

const UpdateForm = ({storageId}) => {
    const [facilityName, setFacilityName] = useState('')
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
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
          document.querySelector(`#\\3${storageId.slice(0, 1)} ${storageId.slice(1, 5)} > input:nth-child(3)`).classList.add('bg-error-light-7')
          return
        }
        if(!length || !testLength) {
          setError('Please enter the updated length. The input can be either a whole number or a decimal with up to two digits after the decimal point')
          document.querySelector(`#\\3${storageId.slice(0, 1)} ${storageId.slice(1, 5)} > input:nth-child(5)`).classList.add('bg-error-light-7')
          return
        }
        if(!width || !testWidth) {
          setError('Please enter the updated width. The input can be either a whole number or a decimal with up to two digits after the decimal point')
          document.querySelector(`#\\3${storageId.slice(0, 1)} ${storageId.slice(1, 5)} > input:nth-child(7)`).classList.add('bg-error-light-7')
          return
        }
        if(!height || !testHeight) {
          setError('Please enter the updated height. The input can be either a whole number or a decimal with up to two digits after the decimal point')
          document.querySelector(`#\\3${storageId.slice(0, 1)} ${storageId.slice(1, 5)} > input:nth-child(9)`).classList.add('bg-error-light-7')
          return
        }
    
        patchStorage(facilityName, length, width, height, storageId)
        setFacilityName('')
        setLength('')
        setWidth('')
        setHeight('')
        setSuccess('The basement / storage unit has been successfully updated!')
        setTimeout(() => {
          setSuccess(null)
        }, 2000)
      }

  return (
    <form 
        id={storageId.slice(0, 5)}
        className='update-form'
        onSubmit={handleSubmit}
    >
        <i 
            className="exit-update fa-solid fa-person-walking-arrow-right"
            onClick={()=> {
                document.querySelector("#root > div > div > main > div > div > form").style.display = 'none'
            }}
        > 
        </i>
        <label>New storage facility title:</label>
        <input 
            type="text" 
            className='storage-input'
            onChange={(e)=> setFacilityName(e.target.value)}
            onClick = {() => {
            setError(null)
            setSuccess(null)
            document.querySelector(`#\\3${storageId.slice(0, 1)} ${storageId.slice(1, 5)} > input:nth-child(3)`).classList.remove('bg-error-light-7')
            }}
            value={facilityName}
        />
        <label>New length (m):</label>
        <input 
            type="text" 
            className='storage-input'
            onChange={(e)=> setLength(e.target.value)}
            onClick = {() => {
            setError(null)
            setSuccess(null)
            document.querySelector(`#\\3${storageId.slice(0, 1)} ${storageId.slice(1, 5)} > input:nth-child(5)`).classList.remove('bg-error-light-7')
            }}
            value={length}
        />
        <label>New width (m):</label>
        <input 
            type="text" 
            className='storage-input'
            onChange={(e)=> setWidth(e.target.value)}
            onClick = {() => {
            setError(null)
            setSuccess(null)
            document.querySelector(`#\\3${storageId.slice(0, 1)} ${storageId.slice(1, 5)} > input:nth-child(7)`).classList.remove('bg-error-light-7')
            }}
            value={width}
        />
        <label>New height (m):</label>
        <input 
            type="text" 
            className='storage-input'
            onChange={(e)=> setHeight(e.target.value)}
            onClick = {() => {
            setError(null)
            setSuccess(null)
            document.querySelector(`#\\3${storageId.slice(0, 1)} ${storageId.slice(1, 5)} > input:nth-child(9)`).classList.remove('bg-error-light-7')
            }}
            value={height}
        />
        <button 
            type="submit"
            disabled={loading}
        >
            Update storage details
        </button>
        {error && <div className="text-error">{error}</div>}
        {success && <div className="text-green-dark-4">{success}</div>}
    </form>
  )
}

export default UpdateForm