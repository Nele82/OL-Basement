import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStorage } from '../slices/StorageSlice'

const StorageInput = () => {
  const [facilityName, setFacilityName] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(null)
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem('user'))
  // Redux
  const theme = useSelector(state => state.theme.value)

  // Create a basement / storage unit
  const createStorageUnit = async (facilityName, length, width, height) => {
    // const response = await fetch('http://localhost:3500/facilities/createStorage', {
    const response = await fetch('https://ol-basement.onrender.com/facilities/createStorage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `User ${user.jwt}`
      },
      body: JSON.stringify({facilityName, length, width, height})
    })
    const json = await response.json()

    if (response.ok) {
      dispatch(createStorage(json))
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
      setError('Please provide the title for the basement. The title can consist of a combination of lowercase or uppercase letters, digits, and any characters, with a length ranging from 4 to 20 characters.')
      return
    }
    if(!length || !testLength) {
      setError('Please enter length. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      return
    }
    if(!width || !testWidth) {
      setError('Please enter width. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      return
    }
    if(!height || !testHeight) {
      setError('Please enter height. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      return
    }

    createStorageUnit(facilityName, length, width, height)
    setFacilityName('')
    setLength('')
    setWidth('')
    setHeight('')
    setSuccess('The basement / storage unit has been successfully created!')
    setTimeout(() => {
      setSuccess(null)
    }, 2000)
  }

  return (
    <form
      className='create-storage col-11-sm col-11-md col-7-lg col-5-xl display-f fd-c mt-2 ml-a mr-a'
      onSubmit={handleSubmit}
    >
      <h3>Create a basement / storage unit:</h3>
      <label>Storage unit title:</label>
      <input 
        type="text" 
        onChange={(e)=> setFacilityName(e.target.value)}
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
      <label>Storage unit length (m):</label>
      <input 
        type="text" 
        onChange={(e)=> setLength(e.target.value)}
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
      <label>Storage unit width (m):</label>
      <input 
        type="text" 
        onChange={(e)=> setWidth(e.target.value)}
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
      <label>Storage unit height (m):</label>
      <input 
        type="text" 
        onChange={(e)=> setHeight(e.target.value)}
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
        Create Storage
      </button>
      {error && <div className='display-f fd-c ai-c bd-black' style={{border: theme ? '2px dotted white' : null}}><div>&#9888;</div> {error}</div>}
      {success && <span>{success}</span>}
    </form>
  )
}

export default StorageInput