import React, { useState } from 'react'
import { createItem } from '../slices/ItemsSlice'
import { useDispatch } from 'react-redux'

const ItemInput = ({storageId}) => {
  const [itemTitle, setItemTitle] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)
  // Redux
  const dispatch = useDispatch()

  const addItem = async () => {

    const response = await fetch('http://localhost:3500/items/createItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({itemTitle, length, width, height, description, category, storageId})
      })      
      const json = await response.json()

      if (response.ok) {
          console.log('Item has been added to the storage')
          dispatch(createItem(json))
      }
      if (!response.ok) {
          setError(json.message)
      }
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    const validTitleInput = /^[(A-Z)(a-z)\d\s(!@#$%^&*()_+=[\]{}|;:'",.<>?`~\-)]{4,20}$/
    const validNumberInput = /^(0|[1-9]\d*)(\.\d{1,2})?$/
    const validDescriptionInput = /^[(A-Z)(a-z)\d\s(!@#$%^&*()_+=[\]{}|;:'",.<>?`~\-)]{10,200}$/
    const testTitle = validTitleInput.test(itemTitle)
    const testLength = validNumberInput.test(length)
    const testWidth = validNumberInput.test(width)
    const testHeight = validNumberInput.test(height)
    const testDescription = validDescriptionInput.test(description)

    if(!itemTitle || !testTitle) {
      setError('Please provide the title for the item. The title can consist of a combination of lowercase or uppercase letters, digits, and any characters, with a length ranging from 4 to 20 characters.')
      document.querySelector("#root > div > div > main > div > div.form-housing > form > input[type=text]:nth-child(2)").classList.add('bg-error-light-7')
      return
    }
    if(!length || !testLength) {
      setError('Please enter length. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      document.querySelector("#root > div > div > main > div > div.form-housing > form > input[type=text]:nth-child(4)").classList.add('bg-error-light-7')
      return
    }
    if(!width || !testWidth) {
      setError('Please enter width. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      document.querySelector("#root > div > div > main > div > div.form-housing > form > input[type=text]:nth-child(6)").classList.add('bg-error-light-7')
      return
    }
    if(!height || !testHeight) {
      setError('Please enter height. The input can be either a whole number or a decimal with up to two digits after the decimal point')
      document.querySelector("#root > div > div > main > div > div.form-housing > form > input[type=text]:nth-child(8)").classList.add('bg-error-light-7')
      return
    }
    if(!description || !testDescription) {
      setError('Please provide the description for the item. The description may contain uppercase letters, lowercase letters, digits, whitespace, and special characters (from 10 to 200 characters).')
      document.querySelector("#root > div > div > main > div > div.form-housing > form > textarea").classList.add('bg-error-light-7')
      return
    }
    if(!category) {
      setError('Please select the category')
      document.querySelector("#root > div > div > main > div > div.form-housing > form > select").classList.add('bg-error-light-7')
      return
    }

    addItem(itemTitle, length, width, height, description, category, storageId)
    setItemTitle('')
    setLength('')
    setWidth('')
    setHeight('')
    setDescription('')
    setCategory('')
  }

  return (
    <div className="form-housing">
      <h3>Add New Item</h3>
      <form 
        className='items-form'
        onSubmit={handleSubmit}
      >
        <label>Item title:</label>
        <input 
          type="text" 
          onChange={(e)=> setItemTitle(e.target.value)}
          onClick={() => {
            document.querySelector("#root > div > div > main > div > div.form-housing > form > input[type=text]:nth-child(2)").classList.remove('bg-error-light-7')
            setError(null)
          }}
        />
        <label>Item length (cm):</label>
        <input 
          type="text" 
          onChange={(e)=> setLength(e.target.value)}
          onClick={() => {
            document.querySelector("#root > div > div > main > div > div.form-housing > form > input[type=text]:nth-child(4)").classList.remove('bg-error-light-7')
            setError(null)
          }}
        />
        <label>Item width (cm):</label>
        <input 
          type="text" 
          onChange={(e)=> setWidth(e.target.value)}
          onClick={() => {
            document.querySelector("#root > div > div > main > div > div.form-housing > form > input[type=text]:nth-child(6)").classList.remove('bg-error-light-7')
            setError(null)
          }}
        />
        <label>Item height (cm):</label>
        <input 
          type="text" 
          onChange={(e)=> setHeight(e.target.value)}
          onClick={() => {
            document.querySelector("#root > div > div > main > div > div.form-housing > form > input[type=text]:nth-child(8)").classList.remove('bg-error-light-7')
            setError(null)
          }}
        />
        <label>Item description:</label>
        <textarea 
          rows="5" 
          cols="50"
          onChange={(e)=> setDescription(e.target.value)}
          onClick={() => {
            document.querySelector("#root > div > div > main > div > div.form-housing > form > textarea").classList.remove('bg-error-light-7')
            setError(null)
          }}
        ></textarea>
        <label>Category:</label>
        <select 
          onChange={(e)=> setCategory(e.target.value)}
          onClick={() => {
            document.querySelector("#root > div > div > main > div > div.form-housing > form > select").classList.remove('bg-error-light-7')
            setError(null)
          }}
        >
          <option value=""></option>
          <option value="Documents">Papers and Records</option>
          <option value="Memorabilia">Photographs and Memorabilia</option>
          <option value="Metals">Metals</option>
          <option value="Food & drinks">Food / Beverages</option>
          <option value="Fabrics">Fabrics / Seasonal Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Tools & hardware">Tools and Hardware</option>
          <option value="Sports">Sports Equipment</option>
          <option value="Cleaning">Cleaning Supplies</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Item</button>
        {error && <p className='text-red-dark-2'>{error}</p>}
      </form>
    </div>
  )
}

export default ItemInput