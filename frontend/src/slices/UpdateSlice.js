import { createSlice } from '@reduxjs/toolkit'

export const updateSlice = createSlice({
    name: 'update',
    initialState: {
        value: {
            title: '',
            length: '',
            width: '',
            height: ''
        }
    },
    reducers: {
        updateTitle: (state, action) => {
            state.value.title = action.payload
        },
        updateLength: (state, action) => {
            state.value.length = action.payload
        },
        updateWidth: (state, action) => {
            state.value.width = action.payload
        },
        updateHeight: (state, action) => {
            state.value.height = action.payload
        }
    }
})

export const {updateTitle, updateLength, updateWidth, updateHeight} = updateSlice.actions

export default updateSlice.reducer