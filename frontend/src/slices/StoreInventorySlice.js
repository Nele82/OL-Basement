import { createSlice } from "@reduxjs/toolkit"

export const storeInventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        value: JSON.parse(localStorage.getItem('singleStorage'))
    },
    reducers: {
        setKey: (state, action) => {
            state.value = action.payload
        },
    }
})

export const {setKey} = storeInventorySlice.actions

export default storeInventorySlice.reducer