import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axiosConfig'

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000

// Async thunks for Categories
export const fetchCategories = createAsyncThunk(
  'labTests/fetchCategories',
  async (type = '', { getState, rejectWithValue }) => {
    try {
      const cacheKey = `categories_${type}`
      const { labTests } = getState()
      const cachedData = labTests.cache[cacheKey]
      
      // Return cached data if it's still valid
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return { categories: cachedData.data, fromCache: true, cacheKey }
      }
      
      const queryParams = new URLSearchParams()
      if (type) queryParams.append('type', type)
      
      const response = await api.get(`/lab/categories/?${queryParams.toString()}`)
      const categories = response.data.results || response.data || []
      
      return { categories, fromCache: false, cacheKey }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories')
    }
  }
)

// Async thunks for Lab Tests
export const fetchLabTests = createAsyncThunk(
  'labTests/fetchLabTests',
  async (params = {}, { getState, rejectWithValue }) => {
    try {
      const cacheKey = `tests_${JSON.stringify(params)}`
      const { labTests } = getState()
      const cachedData = labTests.cache[cacheKey]
      
      // Return cached data if it's still valid
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return { tests: cachedData.data, fromCache: true, cacheKey }
      }
      
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })
      
      const response = await api.get(`/lab/tests/?${queryParams.toString()}`)
      const tests = response.data.results || response.data || []
      
      return { tests, fromCache: false, cacheKey }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch lab tests')
    }
  }
)

export const fetchLabTestBySlug = createAsyncThunk(
  'labTests/fetchLabTestBySlug',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const { labTests } = getState()
      const cachedTest = labTests.testCache[slug]
      
      // Return cached test if it's still valid
      if (cachedTest && Date.now() - cachedTest.timestamp < CACHE_DURATION) {
        return { test: cachedTest.data, fromCache: true }
      }
      
      const response = await api.get(`/lab/tests/${slug}/`)
      return { test: response.data, fromCache: false, slug }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch lab test')
    }
  }
)

// Async thunks for Health Packages
export const fetchHealthPackages = createAsyncThunk(
  'labTests/fetchHealthPackages',
  async (_, { getState, rejectWithValue }) => {
    try {
      const cacheKey = 'packages'
      const { labTests } = getState()
      const cachedData = labTests.cache[cacheKey]
      
      // Return cached data if it's still valid
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return { packages: cachedData.data, fromCache: true, cacheKey }
      }
      
      const response = await api.get('/lab/packages/')
      const packages = response.data.results || response.data || []
      
      return { packages, fromCache: false, cacheKey }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch health packages')
    }
  }
)

export const fetchHealthPackageBySlug = createAsyncThunk(
  'labTests/fetchHealthPackageBySlug',
  async (slug, { getState, rejectWithValue }) => {
    try {
      const { labTests } = getState()
      const cachedPackage = labTests.packageCache[slug]
      
      // Return cached package if it's still valid
      if (cachedPackage && Date.now() - cachedPackage.timestamp < CACHE_DURATION) {
        return { package: cachedPackage.data, fromCache: true }
      }
      
      const response = await api.get(`/lab/packages/${slug}/`)
      return { package: response.data, fromCache: false, slug }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch health package')
    }
  }
)

// Async thunks for Bookings
export const createLabBooking = createAsyncThunk(
  'labTests/createLabBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await api.post('/lab/bookings/', bookingData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create booking')
    }
  }
)

export const fetchMyBookings = createAsyncThunk(
  'labTests/fetchMyBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/lab/bookings/my/')
      const bookings = response.data.results || response.data || []
      return bookings
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch bookings')
    }
  }
)

export const fetchBookingById = createAsyncThunk(
  'labTests/fetchBookingById',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/lab/bookings/${bookingId}/`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch booking')
    }
  }
)

export const cancelBooking = createAsyncThunk(
  'labTests/cancelBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/lab/bookings/${bookingId}/cancel/`)
      return { bookingId, ...response.data }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to cancel booking')
    }
  }
)

const labTestsSlice = createSlice({
  name: 'labTests',
  initialState: {
    // Categories
    categories: [],
    categoriesLoading: false,
    
    // Lab Tests
    tests: [],
    currentTest: null,
    testsLoading: false,
    testLoading: false,
    
    // Health Packages
    packages: [],
    currentPackage: null,
    packagesLoading: false,
    packageLoading: false,
    
    // Bookings
    bookings: [],
    currentBooking: null,
    bookingsLoading: false,
    bookingLoading: false,
    creatingBooking: false,
    cancellingBooking: false,
    
    // Cache
    cache: {},
    testCache: {},
    packageCache: {},
    
    // Error handling
    error: null,
    
    // Filters
    filters: {
      category: '',
      search: '',
      ordering: '',
      daily_offer: false
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        search: '',
        ordering: '',
        daily_offer: false
      }
    },
    clearCurrentTest: (state) => {
      state.currentTest = null
    },
    clearCurrentPackage: (state) => {
      state.currentPackage = null
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null
    },
    clearCache: (state) => {
      state.cache = {}
      state.testCache = {}
      state.packageCache = {}
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false
        state.categories = action.payload.categories
        
        // Cache the results if not from cache
        if (!action.payload.fromCache) {
          state.cache[action.payload.cacheKey] = {
            data: action.payload.categories,
            timestamp: Date.now()
          }
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false
        state.error = action.payload
      })
      
      // Lab Tests
      .addCase(fetchLabTests.pending, (state) => {
        state.testsLoading = true
        state.error = null
      })
      .addCase(fetchLabTests.fulfilled, (state, action) => {
        state.testsLoading = false
        state.tests = action.payload.tests
        
        // Cache the results if not from cache
        if (!action.payload.fromCache) {
          state.cache[action.payload.cacheKey] = {
            data: action.payload.tests,
            timestamp: Date.now()
          }
        }
      })
      .addCase(fetchLabTests.rejected, (state, action) => {
        state.testsLoading = false
        state.error = action.payload
      })
      
      // Lab Test by Slug
      .addCase(fetchLabTestBySlug.pending, (state) => {
        state.testLoading = true
        state.error = null
      })
      .addCase(fetchLabTestBySlug.fulfilled, (state, action) => {
        state.testLoading = false
        state.currentTest = action.payload.test
        
        // Cache the test if not from cache
        if (!action.payload.fromCache) {
          state.testCache[action.payload.slug] = {
            data: action.payload.test,
            timestamp: Date.now()
          }
        }
      })
      .addCase(fetchLabTestBySlug.rejected, (state, action) => {
        state.testLoading = false
        state.error = action.payload
      })
      
      // Health Packages
      .addCase(fetchHealthPackages.pending, (state) => {
        state.packagesLoading = true
        state.error = null
      })
      .addCase(fetchHealthPackages.fulfilled, (state, action) => {
        state.packagesLoading = false
        state.packages = action.payload.packages
        
        // Cache the results if not from cache
        if (!action.payload.fromCache) {
          state.cache[action.payload.cacheKey] = {
            data: action.payload.packages,
            timestamp: Date.now()
          }
        }
      })
      .addCase(fetchHealthPackages.rejected, (state, action) => {
        state.packagesLoading = false
        state.error = action.payload
      })
      
      // Health Package by Slug
      .addCase(fetchHealthPackageBySlug.pending, (state) => {
        state.packageLoading = true
        state.error = null
      })
      .addCase(fetchHealthPackageBySlug.fulfilled, (state, action) => {
        state.packageLoading = false
        state.currentPackage = action.payload.package
        
        // Cache the package if not from cache
        if (!action.payload.fromCache) {
          state.packageCache[action.payload.slug] = {
            data: action.payload.package,
            timestamp: Date.now()
          }
        }
      })
      .addCase(fetchHealthPackageBySlug.rejected, (state, action) => {
        state.packageLoading = false
        state.error = action.payload
      })
      
      // Create Booking
      .addCase(createLabBooking.pending, (state) => {
        state.creatingBooking = true
        state.error = null
      })
      .addCase(createLabBooking.fulfilled, (state, action) => {
        state.creatingBooking = false
        // Add new booking to the beginning of the list
        state.bookings.unshift(action.payload)
      })
      .addCase(createLabBooking.rejected, (state, action) => {
        state.creatingBooking = false
        state.error = action.payload
      })
      
      // Fetch My Bookings
      .addCase(fetchMyBookings.pending, (state) => {
        state.bookingsLoading = true
        state.error = null
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.bookingsLoading = false
        state.bookings = action.payload
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.bookingsLoading = false
        state.error = action.payload
      })
      
      // Fetch Booking by ID
      .addCase(fetchBookingById.pending, (state) => {
        state.bookingLoading = true
        state.error = null
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.bookingLoading = false
        state.currentBooking = action.payload
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.bookingLoading = false
        state.error = action.payload
      })
      
      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.cancellingBooking = true
        state.error = null
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.cancellingBooking = false
        // Update booking status in the list
        const bookingIndex = state.bookings.findIndex(
          booking => booking.booking_id === action.payload.bookingId
        )
        if (bookingIndex !== -1) {
          state.bookings[bookingIndex].status = 'cancelled'
        }
        // Update current booking if it's the same one
        if (state.currentBooking?.booking_id === action.payload.bookingId) {
          state.currentBooking.status = 'cancelled'
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.cancellingBooking = false
        state.error = action.payload
      })
  }
})

export const {
  setFilters,
  clearFilters,
  clearCurrentTest,
  clearCurrentPackage,
  clearCurrentBooking,
  clearCache,
  clearError
} = labTestsSlice.actions

// Selectors
export const selectCategories = (state) => state.labTests.categories
export const selectCategoriesLoading = (state) => state.labTests.categoriesLoading

export const selectLabTests = (state) => state.labTests.tests
export const selectCurrentTest = (state) => state.labTests.currentTest
export const selectTestsLoading = (state) => state.labTests.testsLoading
export const selectTestLoading = (state) => state.labTests.testLoading

export const selectHealthPackages = (state) => state.labTests.packages
export const selectCurrentPackage = (state) => state.labTests.currentPackage
export const selectPackagesLoading = (state) => state.labTests.packagesLoading
export const selectPackageLoading = (state) => state.labTests.packageLoading

export const selectBookings = (state) => state.labTests.bookings
export const selectCurrentBooking = (state) => state.labTests.currentBooking
export const selectBookingsLoading = (state) => state.labTests.bookingsLoading
export const selectBookingLoading = (state) => state.labTests.bookingLoading
export const selectCreatingBooking = (state) => state.labTests.creatingBooking
export const selectCancellingBooking = (state) => state.labTests.cancellingBooking

export const selectLabTestsError = (state) => state.labTests.error
export const selectLabTestsFilters = (state) => state.labTests.filters

export default labTestsSlice.reducer