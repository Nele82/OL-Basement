import { configureStore } from '@reduxjs/toolkit'
import setAuth from './slices/AuthSlice'
import setStorage from './slices/storageSlice'

export default configureStore({
  reducer: {
    loggedin: setAuth,
    storage: setStorage
  }
})