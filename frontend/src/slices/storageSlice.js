import { createSlice } from '@reduxjs/toolkit'

export const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        value: null
    },
    reducers: {
        getStorage: (state, action) => {
            state.value = action.payload
        },
        createStorage: (state, action) => {
            state.value = action.payload
        },
        updateStorage: state => {
            state.value = null
        },
        deleteStorage: state => {
            state.value = null
        }
    }
})

export const {getStorage, createStorage, updateStorage, deleteStorage} = storageSlice.actions

export default storageSlice.reducer