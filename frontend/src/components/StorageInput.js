import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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

  // Create a basement / storage unit
  const createStorageUnit = async (facilityName, length, width, height) => {
    const response = await fetch('http://localhost:3500/facilities/createStorage', {
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
      document.querySelector("#root > div > div > main > div > form > input:nth-child(3)").classList.add('bg-error-light-7')
      return
    }
    if(!length || !testLength) {
      setError('Please enter length. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      document.querySelector("#root > div > div > main > div > form > input:nth-child(5)").classList.add('bg-error-light-7')
      return
    }
    if(!width || !testWidth) {
      setError('Please enter width. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      document.querySelector("#root > div > div > main > div > form > input:nth-child(7)").classList.add('bg-error-light-7')
      return
    }
    if(!height || !testHeight) {
      setError('Please enter height. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      document.querySelector("#root > div > div > main > div > form > input:nth-child(9)").classList.add('bg-error-light-7')
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
    className='create-storage'
    onSubmit={handleSubmit}
    >
      <h3>Create a basement / storage unit:</h3>
      <label>Storage unit title:</label>
      <input 
        type="text" 
        className='storage-input'
        onChange={(e)=> setFacilityName(e.target.value)}
        onClick = {() => {
          setError(null)
          setSuccess(null)
          document.querySelector("#root > div > div > main > div > form > input:nth-child(3)").classList.remove('bg-error-light-7')
        }}
        value={facilityName}
      />
      <label>Storage unit length (m):</label>
      <input 
        type="text" 
        className='storage-input'
        onChange={(e)=> setLength(e.target.value)}
        onClick = {() => {
          setError(null)
          setSuccess(null)
          document.querySelector("#root > div > div > main > div > form > input:nth-child(5)").classList.remove('bg-error-light-7')
        }}
        value={length}
      />
      <label>Storage unit width (m):</label>
      <input 
        type="text" 
        className='storage-input'
        onChange={(e)=> setWidth(e.target.value)}
        onClick = {() => {
          setError(null)
          setSuccess(null)
          document.querySelector("#root > div > div > main > div > form > input:nth-child(7)").classList.remove('bg-error-light-7')
        }}
        value={width}
      />
      <label>Storage unit height (m):</label>
      <input 
        type="text" 
        className='storage-input'
        onChange={(e)=> setHeight(e.target.value)}
        onClick = {() => {
          setError(null)
          setSuccess(null)
          document.querySelector("#root > div > div > main > div > form > input:nth-child(9)").classList.remove('bg-error-light-7')
        }}
        value={height}
      />
      <button 
        type="submit"
        disabled={loading}
      >
        Create Storage
      </button>
      {error && <div className="text-error">{error}</div>}
      {success && <div className="text-green-dark-4">{success}</div>}
    </form>
  )
}

export default StorageInput