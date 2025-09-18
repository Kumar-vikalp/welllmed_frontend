import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import ProductCard from '../components/ProductCard'
import Skeleton from '../components/Skeleton'
import { motion } from 'framer-motion'
import SearchBar from '../components/SearchBar'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    company: searchParams.get('company') || '',
    search: searchParams.get('search') || '',
    ordering: searchParams.get('ordering') || '',
    trending: searchParams.get('trending') || ''
  })
  const [page, setPage] = useState(1)
  const [pageSize] = useState(12)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [filters, page])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.category) params.append('disease_category', filters.category)
      if (filters.company) params.append('company', filters.company)
      if (filters.ordering) params.append('ordering', filters.ordering)
      if (filters.trending) params.append('trending', 'true')
      params.append('page', page)
      params.append('page_size', pageSize)

      const response = await api.get(`/products/?${params.toString()}`)
      const data = response.data
      
      const productsData = data.results || (Array.isArray(data) ? data : [data])
      
      const transformedProducts = productsData.map(transformProduct)
      
      setProducts(transformedProducts)
      setFiltered(transformedProducts)
      
      if (data.count) {
        setTotalPages(Math.ceil(data.count / pageSize))
      }
    } catch (error) {
      console.error('Failed to fetch products', error)
      setProducts([])
      setFiltered([])
    } finally {
      setLoading(false)
    }
  }

  const transformProduct = (product) => ({
    product_id: product.product_id,
    slug: product.slug,
    name: product.name,
    company: product.company,
    disease_category: product.disease_category,
    mrp: parseFloat(product.mrp),
    discount: product.discount,
    discounted_price: parseFloat(product.discounted_price),
    images: product.images?.map(img => img.stream_url) || ['/images/placeholder.jpg'],
    trending: product.trending,
    available_stock: product.available_stock || 100,
    description: product.description || `${product.name} from ${product.company}. Effective treatment for ${product.disease_category}.`
  })

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }))
    setPage(1)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
    setPage(1)
  }

  const clearFilters = () => {
    setFilters({ category: '', company: '', search: '', ordering: '', trending: '' })
    setPage(1)
  }

  // Unique filter values
  const categories = [...new Set(products.map(p => p.disease_category))]
  const companies = [...new Set(products.map(p => p.company))]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">All Products</h1>
        <p className="text-xl text-teal-100 mb-6">Find the right medicine for your needs</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="container mx-auto px-4 py-6 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="w-64 hidden md:block">
          <div className="bg-white rounded shadow p-4 mb-4 sticky top-24">
            <h3 className="font-bold mb-4 text-gray-800 text-lg">Filters</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">Sort By</label>
              <select 
                className="w-full border rounded px-3 py-2 text-gray-800 focus:ring-2 focus:ring-teal-500"
                value={filters.ordering}
                onChange={e => handleFilterChange('ordering', e.target.value)}
              >
                <option value="">Default</option>
                <option value="mrp">Price: Low to High</option>
                <option value="-mrp">Price: High to Low</option>
                <option value="-discount">Discount: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
              <select 
                className="w-full border rounded px-3 py-2 text-gray-800 focus:ring-2 focus:ring-teal-500"
                value={filters.category}
                onChange={e => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">Company</label>
              <select 
                className="w-full border rounded px-3 py-2 text-gray-800 focus:ring-2 focus:ring-teal-500"
                value={filters.company}
                onChange={e => handleFilterChange('company', e.target.value)}
              >
                <option value="">All Companies</option>
                {companies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.trending === 'true'}
                  onChange={e => handleFilterChange('trending', e.target.checked ? 'true' : '')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Trending Only</span>
              </label>
            </div>

            <button 
              className="w-full text-sm text-teal-600 hover:text-teal-800 font-medium underline"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        <div className="flex-1">
          {/* Mobile filters */}
          <div className="md:hidden mb-4 flex gap-2 flex-wrap">
            <select 
              className="border rounded px-2 py-1 text-gray-800"
              value={filters.ordering}
              onChange={e => handleFilterChange('ordering', e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="mrp">Price ↑</option>
              <option value="-mrp">Price ↓</option>
              <option value="-discount">Discount ↓</option>
            </select>
            <select 
              className="border rounded px-2 py-1 text-gray-800"
              value={filters.category}
              onChange={e => handleFilterChange('category', e.target.value)}
            >
              <option value="">Category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button 
              className="text-xs text-teal-600 underline px-2"
              onClick={clearFilters}
            >
              Reset
            </button>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {filters.trending ? 'Trending Products' : 'All Products'}
            </h2>
            <p className="text-gray-400">{filtered.length} products found</p>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array(pageSize).fill(0).map((_, i) => <Skeleton key={i} />)
              : filtered.map(product =>
                <div key={product.product_id} onClick={() => navigate(`/product/${product.slug}`)}
                  className="cursor-pointer">
                  <ProductCard product={product} />
                </div>
              )
            }
          </div>
          
          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button 
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              {Array(Math.min(5, totalPages)).fill(0).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button 
                    key={i} 
                    className={`px-4 py-2 border rounded ${page === pageNum ? 'bg-teal-500 text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button 
                disabled={page === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}