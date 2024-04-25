import { configureStore } from '@reduxjs/toolkit'
import setAuth from './slices/AuthSlice'
import setStorage from './slices/StorageSlice'
import setUpdateStore from './slices/UpdateSlice'

export default configureStore({
  reducer: {
    user: setAuth,
    storage: setStorage,
    update: setUpdateStore
  }
})