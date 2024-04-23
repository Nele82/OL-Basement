import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        value: null
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: state => {
            state.value = null
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer