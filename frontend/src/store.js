import { configureStore } from '@reduxjs/toolkit'
import setAuth from './slices/AuthSlice'
import setStorage from './slices/StorageSlice'
import setUpdateStore from './slices/UpdateSlice'
import setItems from './slices/ItemsSlice'
import setInventoryKey from './slices/StoreInventorySlice'

export default configureStore({
  reducer: {
    user: setAuth,
    storage: setStorage,
    update: setUpdateStore,
    items: setItems,
    inventory: setInventoryKey
  }
})