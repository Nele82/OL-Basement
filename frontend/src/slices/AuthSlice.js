import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'loggedin',
    initialState: {
        value: null
    },
    reducers: {
        set: state => {
            state.value = JSON.parse(localStorage.getItem('user'))
        }
    }
})

export const {set} = authSlice.actions

export default authSlice.reducer