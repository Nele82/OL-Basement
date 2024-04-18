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
        updateStorage: state => {
            state.value = null
        },
        deleteStorage: (state, action) => {
            state.value = (state.value).filter((storage) => storage._id !== action.payload)
        }
    }
})

export const {createStorage, getStorage, updateStorage, deleteStorage} = storageSlice.actions

export default storageSlice.reducer