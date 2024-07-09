import { createSlice } from '@reduxjs/toolkit'

// HTTP addresses for development and production environments for the backend
export const httpSlice = createSlice({
    name: 'httpAddress',
    initialState: {
        value: process.env.REACT_APP_HTTP_DEPLOY
    }
})

export default httpSlice.reducer

// Addresses to be used for the backend server:
// DEV: http://localhost:3500
// DEPLOY: process.env.REACT_APP_HTTP_DEPLOY (please see the 'Setup' section of the 'README.md' file for further instructions)