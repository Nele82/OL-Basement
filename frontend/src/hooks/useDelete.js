export const deleteOneStorage = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const response = await fetch(`http://localhost:3500/facilities/deleteStorage/${id}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `User ${user.jwt}`},
    })
    const json = await response.json()

    if (response.ok) {
        console.log('Storage has been deleted')
    }
    if (!response.ok) {
        console.log(json.message)
    }
} 

export const deleteOneItem = async (id) => {

    const response = await fetch(`http://localhost:3500/items/deleteItem/${id}`, {
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