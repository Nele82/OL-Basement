import { createSlice } from '@reduxjs/toolkit'

export const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        value: []
    },
    reducers: {
        createStorage: (state, action) => {
            state.value = [action.payload, ...state.value]
        },
        getStorage: (state, action) => {
            state.value = action.payload
        },
        updateStorage: (state, action) => {
            state.value = action.payload
        },
        deleteStorage: (state, action) => {
            state.value = (state.value).filter((storage) => storage._id !== action.payload)
        },
        nullStorage: (state) => {
            state.value = []
        }
    }
})

export const {createStorage, getStorage, updateStorage, deleteStorage, nullStorage} = storageSlice.actions

export default storageSlice.reducer