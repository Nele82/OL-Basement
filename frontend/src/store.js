import { configureStore } from '@reduxjs/toolkit'
import setAuth from './slices/AuthSlice'
import setStorage from './slices/StorageSlice'
import setUpdateStore from './slices/UpdateSlice'
import setItems from './slices/ItemsSlice'
import setSessionMessage from './slices/SessionSlice'
import setButtons from './slices/ButtonsSlice'
import setUpdateItem from './slices/UpdateItemSlice'
import setTheme from './slices/ThemeSlice'
import setHttp from './slices/HTTPSlice'
import setLoadingMessage from './slices/LoadingSlice'
import setRemainingSpace from './slices/SpaceSlice'

export default configureStore({
  reducer: {
    user: setAuth,
    storage: setStorage,
    update: setUpdateStore,
    items: setItems,
    session: setSessionMessage,
    buttons: setButtons,
    updatedItems: setUpdateItem,
    theme: setTheme,
    httpAddress: setHttp,
    loading: setLoadingMessage,
    remainingSpace: setRemainingSpace
  }
})