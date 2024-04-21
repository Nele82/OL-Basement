import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'loggedin',
    initialState: {
        value: null
    },
    reducers: {
        login: (state, action) => {
            state.value = localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: state => {
            state.value = localStorage.clear()
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer