import { createSlice } from '@reduxjs/toolkit'

export const updateItemSlice = createSlice({
    name: 'updatedItems',
    initialState: {
        value: {
            title: '',
            length: '',
            width: '',
            height: '',
            description: '',
            category: ''
        }
    },
    reducers: {
        updateItemTitle: (state, action) => {
            state.value.title = action.payload
        },
        updateItemLength: (state, action) => {
            state.value.length = action.payload
        },
        updateItemWidth: (state, action) => {
            state.value.width = action.payload
        },
        updateItemHeight: (state, action) => {
            state.value.height = action.payload
        },
        updateItemDescription: (state, action) => {
            state.value.description = action.payload
        },
        updateItemCategory: (state, action) => {
            state.value.category = action.payload
        }
    }
})

export const {updateItemTitle, updateItemLength, updateItemWidth, updateItemHeight, updateItemDescription, updateItemCategory} = updateItemSlice.actions

export default updateItemSlice.reducer