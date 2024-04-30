import { createSlice } from "@reduxjs/toolkit"

export const timeOutSlice = createSlice({
    name: 'session',
    initialState: {
        value: null
    },
    reducers: {
        setTimeoutMessage: state => {
            state.value = 'Your session has timed out'
        },
        removeTimeoutMessage: state => {
            state.value = null
        },
    }
})

export const {setTimeoutMessage, removeTimeoutMessage} = timeOutSlice.actions

export default timeOutSlice.reducer