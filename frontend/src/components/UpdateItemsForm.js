import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updateItem } from '../slices/ItemsSlice'
import { 
    updateItemTitle, 
    updateItemLength, 
    updateItemWidth, 
    updateItemHeight, 
    updateItemDescription, 
    updateItemCategory 
} from '../slices/UpdateItemSlice'
import { getButtons } from '../slices/ButtonsSlice'

const UpdateItemsForm = ({itemId, itemName, storeId}) => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    // Redux
    const dispatch = useDispatch()
    const itemTitle = useSelector(state => state.updatedItems.value.title)
    const length = useSelector(state => state.updatedItems.value.length)
    const width = useSelector(state => state.updatedItems.value.width)
    const height = useSelector(state => state.updatedItems.value.height)
    const description = useSelector(state => state.updatedItems.value.description)
    const category = useSelector(state => state.updatedItems.value.category)
    const httpInput = useSelector(state => state.httpAddress.value)

    const patchItem = async (itemTitle, length, width, height, description, category, itemId) => {
    
        // 'httpInput' reducer holds the http address (no endpoint as it doesn't change) for 
        // deployment or production (whichever is set by the Developer inside it's Redux slice) 
        // for the backend
        const response = await fetch(`${httpInput}/items/updateItem/${storeId}/${itemId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemTitle, length, width, height, description, category})
        })
        const json = await response.json()
    
        if (response.ok) {
            console.log('Item has been updated')
            let array = []
            for (let i = 0; i < json.length; i++) {
              array.push(json[i]['category'])
            }
            array = array.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1])
            dispatch(getButtons(array))
            dispatch(updateItem(json))
        }

        if (!response.ok) {
            console.log(json.message)
        }
    } 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validTitleInput = /^[(A-Z)(a-z)\d\s(!@#$%^&*()_+=[\]{}|;:'",.<>?`~\-)]{4,20}$/
        const validNumberInput = /^(0|[1-9]\d*)(\.\d{1,2})?$/
        const validDescriptionInput = /^[(A-Z)(a-z)\d\s(!@#$%^&*()_+=[\]{}|;:'",.<>?`~\-)]{10,200}$/
        const testItemTitle = validTitleInput.test(itemTitle)
        const testLength = validNumberInput.test(length)
        const testWidth = validNumberInput.test(width)
        const testHeight = validNumberInput.test(height)
        const testDescription = validDescriptionInput.test(description)
    
        if(!itemTitle || !testItemTitle) {
            setError('Please provide the updated title. The title can consist of a combination of lowercase or uppercase letters, digits, and any characters, with a length ranging from 4 to 20 characters.')
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
          if(!description || !testDescription) {
            setError('Please provide the updated description. The description may contain uppercase letters, lowercase letters, digits, whitespace, and special characters (from 10 to 200 characters).')
            return
          }
          if(!category) {
            setError('Please select the category')
            return
          }
    
        patchItem(itemTitle, length, width, height, description, category, itemId)
        setSuccess('Item has been successfully updated!')
        setTimeout(() => {
          setSuccess(null)
          document.getElementById(`${itemId.slice(4, 11)}-update-items`).style.display = 'none'
        }, 2000)
      }

  return (
    <form 
        id={`${itemId.slice(4, 11)}-update-items`}
        className='update-items fd-c'
        onSubmit={handleSubmit}
    >
      {/* UPDATE ITEM - HEADER */}
        <div className="update-items-header display-f ai-c jc-c">
          <h4>Item "{itemName}" - Update Form</h4>
          <i 
              className="fa-regular fa-rectangle-xmark display-f jc-c"
              onClick={()=>{
                document.getElementById(`${itemId.slice(4, 11)}-update-items`).style.display = 'none'
              }}
          > 
          </i>
        </div>
        {/* UPDATE ITEM - LABELS & INPUT FIELDS */}
        <div className="update-items-dimensions display-f fr-w">
          <label className='display-f ai-c jc-fs'>New Item title:</label>
          <input 
              type="text" 
              id={`${itemId.slice(4, 11)}-item-title`}
              className='item-update'
              onChange={(e)=> dispatch(updateItemTitle(e.target.value))}
              onClick = {() => {
                setError(null)
              }}
              value={itemTitle}
          />
          <label className='display-f ai-c jc-fs'>New Item length (cm):</label>
          <input 
              type="text" 
              id={`${itemId.slice(4, 11)}-item-length`}
              className='item-update'
              onChange={(e)=> dispatch(updateItemLength(e.target.value))}
              onClick = {() => {
                setError(null)
              }}
              value={length}
          />
          <label className='display-f ai-c jc-fs'>New Item width (cm):</label>
          <input 
              type="text" 
              id={`${itemId.slice(4, 11)}-item-width`}
              className='item-update'
              onChange={(e)=> dispatch(updateItemWidth(e.target.value))}
              onClick = {() => {
                setError(null)
              }}
              value={width}
          />
          <label className='display-f ai-c jc-fs'>New Item height (cm):</label>
          <input 
              type="text" 
              id={`${itemId.slice(4, 11)}-item-height`}
              className='item-update'
              onChange={(e)=> dispatch(updateItemHeight(e.target.value))}
              onClick = {() => {
                setError(null)
              }}
              value={height}
          />
        </div>
        {/* TEXTAREA, SELECT ELEMENT & BUTTONS */}
        <div className="update-item-description display-f fd-c">
          <label>
            New Item Description:
          </label>
          <textarea 
              id={`${itemId.slice(4, 11)}-item-description`}
              className='item-update'
              onChange={(e)=> dispatch(updateItemDescription(e.target.value))}
              onClick = {() => {
                setError(null)
              }}
              value={description}
          />
          <label>
            New Item Category:
          </label>
          <select 
              id={`${itemId.slice(4, 11)}-item-category`}
              className='item-update col-12-xl'
              onChange={(e)=> dispatch(updateItemCategory(e.target.value))}
              onClick = {() => {
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
          <button
          onClick={()=>{
            dispatch(updateItemTitle(''))
            dispatch(updateItemLength(''))
            dispatch(updateItemWidth(''))
            dispatch(updateItemHeight(''))
            dispatch(updateItemDescription(''))
            dispatch(updateItemCategory(''))
          }}
          >
            Clear All Fields
          </button>
          <button 
              type="submit"
          >
              Update Item details
          </button>
        </div>
        {/* ERROR & SUCCESS MESSAGE */}
        {error && <div><b>ATTENTION! </b>{error}</div>}
        {success && <div><b>SUCCESS! </b>{success}</div>}
    </form>
  )
}

export default UpdateItemsForm