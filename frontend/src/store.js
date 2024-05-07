import { configureStore } from '@reduxjs/toolkit'
import setAuth from './slices/AuthSlice'
import setStorage from './slices/StorageSlice'
import setUpdateStore from './slices/UpdateSlice'
import setItems from './slices/ItemsSlice'
import setInventoryKey from './slices/StoreInventorySlice'
import setSessionMessage from './slices/SessionSlice'
import setButtons from './slices/ButtonsSlice'
import setUpdateItem from './slices/UpdateItemSlice'

export default configureStore({
  reducer: {
    user: setAuth,
    storage: setStorage,
    update: setUpdateStore,
    items: setItems,
    inventory: setInventoryKey,
    session: setSessionMessage,
    buttons: setButtons,
    updatedItems: setUpdateItem
  }
})