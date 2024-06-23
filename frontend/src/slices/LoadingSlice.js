import { createSlice } from '@reduxjs/toolkit'

export const loadingMessageSlice = createSlice({
    name: 'loading',
    initialState: {
        value: ''
    },
    reducers: {
        setLoadingMsg: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setLoadingMsg} = loadingMessageSlice.actions

export default loadingMessageSlice.reducer