import { createSlice } from '@reduxjs/toolkit'

export const buttonsSlice = createSlice({
    name: 'buttons',
    initialState: {
        value: []
    },
    reducers: {
        getButtons: (state, action) => {
            state.value = [...action.payload]
        }
    }
})

export const { getButtons } = buttonsSlice.actions

export default buttonsSlice.reducer