// 'devServer' and 'deployServer' constants hold the http addresses (no endpoints as  
// they don't change) for the backend server, for deployment and production - whichever is used by the Developer
const devServer = 'http://localhost:3500'
const deployServer = process.env.REACT_APP_HTTP_DEPLOY

export const deleteOneStorage = async (id) => {
    
    const user = JSON.parse(localStorage.getItem('user'))

    const response = await fetch(`${deployServer}/facilities/deleteStorage/${id}`, {
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

    const response = await fetch(`${deployServer}/items/deleteAllStorageItems/${storeId}`, {
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

    const response = await fetch(`${deployServer}/items/deleteItem/${id}`, {
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

