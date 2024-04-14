import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'loggedin',
    initialState: {
        value: null
    },
    reducers: {
        login: state => {
            state.value = JSON.parse(localStorage.getItem('user'))
        },
        logout: state => {
            state.value = null
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer