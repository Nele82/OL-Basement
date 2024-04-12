import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'authorization',
    initialState: {
        value: null
    },
    reducers: {
        set: state => {
            state.value = 0
        }
    }
})

export const {set} = authSlice.actions

export default authSlice.reducer