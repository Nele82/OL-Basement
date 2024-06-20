import { useSelector } from "react-redux"

// Redux reducer
const httpInput = useSelector(state => state.httpAddress.value)

export const deleteOneStorage = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'))

    // 'httpInput' reducer holds the http address (no endpoint as it doesn't change) for 
    // deployment or production (whichever is set by the Developer inside it's Redux slice) 
    // for the backend
    const response = await fetch(`${httpInput}/facilities/deleteStorage/${id}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `User ${user.jwt}`},
    })
    const json = await response.json()

    if (response.ok) {
        console.log('Storage has been deleted')
        deleteAllItems(id)
    }
    if (!response.ok) {
        console.log(json.message)
    }
} 

const deleteAllItems = async (storeId) => {

    // 'httpInput' reducer holds the http address (no endpoint as it doesn't change) for 
    // deployment or production (whichever is set by the Developer inside it's Redux slice) 
    // for the backend
    const response = await fetch(`${httpInput}/items/deleteAllStorageItems/${storeId}`, {
        method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
        console.log(`All items assigned to the storage ${storeId} have been deleted`)
    }
    if (!response.ok) {
        console.log(json.message)
    }
}

export const deleteOneItem = async (id) => {

    // 'httpInput' reducer holds the http address (no endpoint as it doesn't change) for 
    // deployment or production (whichever is set by the Developer inside it's Redux slice) 
    // for the backend
    const response = await fetch(`${httpInput}/items/deleteItem/${id}`, {
        method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
        console.log('Item has been deleted')
    }
    if (!response.ok) {
        console.log(json.message)
    }
} 

