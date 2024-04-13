import { configureStore } from '@reduxjs/toolkit'
import setAuth from './slices/AuthSlice'

export default configureStore({
  reducer: {
    loggedin: setAuth
  }
})