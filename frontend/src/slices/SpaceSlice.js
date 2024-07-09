import { createSlice } from '@reduxjs/toolkit'

export const remainingSpaceSlice = createSlice({
    name: 'remainingSpace',
    initialState: {
        value: null
    },
    reducers: {
        updatesSpace: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {updatesSpace} = remainingSpaceSlice.actions

export default remainingSpaceSlice.reducer