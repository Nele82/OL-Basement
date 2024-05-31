import React, { useEffect, useState } from 'react'
import { createItem } from '../slices/ItemsSlice'
import { useDispatch } from 'react-redux'
import { getButtons } from '../slices/ButtonsSlice'

const ItemInput = ({storageId, storeSpace, array, dimensions}) => {
  const [itemTitle, setItemTitle] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)
  const [basementSpace, setbasementSpace] = useState(null)
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
      
      // Fetching data for the filter buttons
      const arr = await fetch(`http://localhost:3500/items/getItems/${storageId}`)
      const arrJSON = await arr.json()

      if (response.ok) {
          console.log('Item has been added to the storage')
          dispatch(createItem(json))
      }

      if(arr.ok) {
        let array = []
        for (let i = 0; i < arrJSON.length; i++) {
          array.push(arrJSON[i]['category'])
        }
        array = array.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1])
        dispatch(getButtons(array))
      }

      if (!response.ok) {
          setError(json.message)
      }

      if (!arr.ok) {
          console.log(arrJSON.message)
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
    if(!description || !testDescription) {
      setError('Please provide the description for the item. The description may contain uppercase letters, lowercase letters, digits, whitespace, and special characters (from 10 to 200 characters).')
      return
    }
    if(!category) {
      setError('Please select the category')
      return
    }

    if(parseFloat((length*width*height)/1000000) > parseFloat(basementSpace - (occupiedSpaceCubic(array)))){
      setError('Unfortunately, there isn\'t sufficient space in the storage or basement unit to accommodate this item. I recommend trying to store a smaller item instead. It\'s essential to consider maneuvering space for storage operations.')
      setTimeout(() => {
        setError(null)
      }, 10000)
      return
    } else {
      addItem(itemTitle, length, width, height, description, category, storageId)
      setItemTitle('')
      setLength('')
      setWidth('')
      setHeight('')
      setDescription('')
      setCategory('')
    }
  }

  const occupiedSpaceCubic = (arr) => {      
    let occupiedInCubicMeters = 0
    for (let i = 0; i < arr.length; i++) {
        occupiedInCubicMeters += parseFloat((arr[i].length * arr[i].height * arr[i].width)/1000000)
    }
    occupiedInCubicMeters = occupiedInCubicMeters.toFixed(4)
    return occupiedInCubicMeters
  }

  const occupiedSpacePercentage = (totalSpace, itemsSpace) => {      
    let occupiedSpace = parseInt((itemsSpace * 100) / totalSpace)
    return occupiedSpace
  }

  useEffect(()=>{
    setbasementSpace(storeSpace)
    occupiedSpaceCubic(array)
}, [storeSpace, array])

  return (
    <div className="form-space-housing display-f fd-c">
      {/* S T O R A G E  D E T A I L S  &  S P A C E */}
      <div className='space-component display-f fd-c mt-1'>
        {basementSpace && <span>Storage/basement space: <b>{basementSpace} m3</b></span>}
        <span>Available space: <b>{(basementSpace - (occupiedSpaceCubic(array))).toFixed(4)} m3</b></span>
        <span>Dimensions: <b>L</b> - {dimensions.length} m / <b>W</b> - {dimensions.width} m / <b>H</b> - {dimensions.height} m</span>
        {/* Progress bar */}
          <div 
            className="progress-bar mt-2 mb-2"
            style={{'--width': occupiedSpacePercentage(basementSpace, occupiedSpaceCubic(array))}}
          >
            <span id='single-storage-avail'>{`Used space: ${occupiedSpacePercentage(basementSpace, occupiedSpaceCubic(array))}%`}</span>
          </div>
      </div>
      <h3 id='form-space-housing-h3'>Add New Item</h3>
      {/* I N P U T */}
      <form 
        className='items-form display-f fd-c'
        onSubmit={handleSubmit}
      >
        <label>Item title:</label>
        <input 
          type="text" 
          onChange={(e)=> setItemTitle(e.target.value)}
          onClick={() => {
            setError(null)
          }}
          value={itemTitle}
        />
        <label>Item length (cm):</label>
        <input 
          type="text" 
          onChange={(e)=> setLength(e.target.value)}
          onClick={() => {
            setError(null)
          }}
          value={length}
        />
        <label>Item width (cm):</label>
        <input 
          type="text" 
          onChange={(e)=> setWidth(e.target.value)}
          onClick={() => {
            setError(null)
          }}
          value={width}
        />
        <label>Item height (cm):</label>
        <input 
          type="text" 
          onChange={(e)=> setHeight(e.target.value)}
          onClick={() => {
            setError(null)
          }}
          value={height}
        />
        <label>Item description:</label>
        <textarea 
          rows="5" 
          cols="50"
          onChange={(e)=> setDescription(e.target.value)}
          onClick={() => {
            setError(null)
          }}
          value={description}
        ></textarea>
        <label>Category:</label>
        <select 
          onChange={(e)=> setCategory(e.target.value)}
          onClick={() => {
            setError(null)
          }}
          value={category}
        >
          <option value=""></option>
          <option value="Chemicals">Chemicals</option>
          <option value="Cleaning">Cleaning Supplies</option>
          <option value="Electronics">Electronics</option>
          <option value="Fabrics">Fabrics / Seasonal Clothing</option>
          <option value="Food & drinks">Food / Beverages</option>
          <option value="Metals">Metals</option>
          <option value="Machines, appliances & other equipment">Machines, appliances & other equipment</option>
          <option value="Documents & Books">Papers, Records & Books</option>
          <option value="Memorabilia">Photographs and Memorabilia</option>
          <option value="Sports">Sports Equipment</option>
          <option value="Tools & hardware">Tools and Hardware</option>
          <option value="Wood / Furniture">Wood / Furniture</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Item</button>
        {error && <div className='display-f fd-c ai-c p-1 bd-black mt-2 mb-3'><span className='fsz-10'>&#9888;</span> {error}</div>}
      </form>
    </div>
  )
}

export default ItemInput