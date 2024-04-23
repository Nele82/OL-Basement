import { configureStore } from '@reduxjs/toolkit'
import setAuth from './slices/AuthSlice'
import setStorage from './slices/StorageSlice'

export default configureStore({
  reducer: {
    user: setAuth,
    storage: setStorage
  }
})