import { createSlice } from '@reduxjs/toolkit'

// HTTP addresses for development and production environments for the backend
export const httpSlice = createSlice({
    name: 'httpAddress',
    initialState: {
        value: 'http://localhost:3500'
    }
})

export default httpSlice.reducer

// Addresses to be used for the backend server:
// DEV: http://localhost:3500
// DEPLOY: https://ol-basement.onrender.com