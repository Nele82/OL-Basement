import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        value: []
    },
    reducers: {
        createItem: (state, action) => {
            state.value = [action.payload, ...state.value]
        },
        getItem: (state, action) => {
            state.value = action.payload
        },
        updateItem: (state, action) => {
            state.value = action.payload
        },
        deleteItem: (state, action) => {
            state.value = (state.value).filter((storage) => storage._id !== action.payload)
        }
    }
})

export const {createItem, getItem, updateItem, deleteItem} = itemsSlice.actions

export default itemsSlice.reducer