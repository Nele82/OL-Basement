import { createSlice } from '@reduxjs/toolkit'

export const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        value: null
    },
    reducers: {
        getStorageList: state => {
            state.value = null
        },
        addStorage: state => {
            state.value = null
        },
        deleteStorage: state => {
            state.value = null
        }
    }
})

export const {getStorageList, addStorage, deleteStorage} = storageSlice.actions

export default storageSlice.reducer