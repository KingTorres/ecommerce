// productStore.ts
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/cartSlice'
import userReducer from './features/userSlice'

const loadCartState = () => {
  try {
    const savedCart = localStorage.getItem('cart_items')
    return savedCart ? JSON.parse(savedCart) : undefined
  } catch(e) {
    console.error("Could not load cart state", 0)
    return undefined
  }
}
export const store = configureStore({
  reducer: {
    productCart: productReducer,
    userProfile: userReducer
  },
  preloadedState: {
    productCart: loadCartState(),
  }
})

store.subscribe(() => {
  try {
    localStorage.setItem('cart_items', JSON.stringify(store.getState().productCart))
  } catch(e) {
    console.error("Could not save cart state", e)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch