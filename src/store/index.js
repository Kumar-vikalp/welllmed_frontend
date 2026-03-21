import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

import cartSlice from './slices/cartSlice'
import productsSlice from './slices/productsSlice'
import userSlice from './slices/userSlice'
import ordersSlice from './slices/ordersSlice'
import labTestsSlice from './slices/labTestsSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'], // Only persist cart and user data
  blacklist: ['products', 'orders', 'labTests'] // Don't persist products, orders, and labTests as they should be fresh
}

const rootReducer = combineReducers({
  cart: cartSlice,
  products: productsSlice,
  user: userSlice,
  orders: ordersSlice,
  labTests: labTestsSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)