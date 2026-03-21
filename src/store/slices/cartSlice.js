import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axiosConfig'

// Debounced cart sync function
let syncTimeout = null
const SYNC_DELAY = 2000 // 2 seconds

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart/')
      const cartItems = Array.isArray(response.data) ? response.data : [response.data]
      return cartItems.map(item => ({
        product_id: item.product.product_id,
        cart_item_id: item.cart_item_id,
        name: item.product.name,
        company: item.product.company,
        disease_category: item.product.disease_category,
        mrp: parseFloat(item.product.mrp),
        discount: item.product.discount,
        images: item.product.images?.map(img => img.stream_url) || ['/images/placeholder.svg'],
        trending: item.product.trending,
        slug: item.product.slug,
        qty: item.quantity,
        available_stock: item.product.available_stock || 100,
        discounted_price: parseFloat(item.product.discounted_price)
      }))
    } catch (error) {
      // If cart is empty or not found, return empty array instead of error
      if (error.response?.status === 404 || error.response?.status === 400) {
        return []
      }
      return rejectWithValue(error.response?.data || 'Failed to fetch cart')
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product_id, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.post('/cart/add/', {
        product_id,
        quantity
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add to cart')
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cart_item_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/cart/update/${cart_item_id}/`, {
        quantity
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update cart item')
    }
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (cart_item_id, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/remove/${cart_item_id}/`)
      return cart_item_id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove item')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    syncing: false,
    error: null,
    lastSyncTime: null,
    initialized: false
  },
  reducers: {
    clearCart: (state) => {
      state.items = []
      state.initialized = false
    },
    
    setInitialized: (state, action) => {
      state.initialized = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.initialized = true
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.initialized = true
      })
      .addCase(addToCart.pending, (state) => {
        state.syncing = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.syncing = false
        // Refresh cart after adding
        // The actual cart update will be handled by fetchCart
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.syncing = false
        state.error = action.payload
      })
      .addCase(updateCartItem.pending, (state) => {
        state.syncing = true
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.syncing = false
        // Refresh cart after updating
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.syncing = false
        state.error = action.payload
      })
      .addCase(removeCartItem.pending, (state) => {
        state.syncing = true
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.syncing = false
        state.items = state.items.filter(item => item.cart_item_id !== action.payload)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.syncing = false
        state.error = action.payload
      })
  }
})

export const { clearCart, setInitialized } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) => state.cart.items.reduce((count, item) => count + item.qty, 0)
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => {
  const price = item.discounted_price || (item.mrp - (item.mrp * item.discount / 100))
  return total + (price * item.qty)
}, 0)
export const selectCartLoading = (state) => state.cart.loading
export const selectCartSyncing = (state) => state.cart.syncing
export const selectCartInitialized = (state) => state.cart.initialized

export default cartSlice.reducer