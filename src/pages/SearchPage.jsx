import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/axiosConfig'
import ProductCard from '../components/ProductCard'
import Skeleton from '../components/Skeleton'
import { motion } from 'framer-motion'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [recentSearches] = useState(['PARACETAMOL', 'VITAMIN C', 'COUGH SYRUP', 'ANTIBIOTICS'])
  const [popularCategories] = useState([
    'FEVER & PAIN', 'ALLERGY & COLD', 'DIGESTIVE HEALTH', 'VITAMINS & SUPPLEMENTS'
  ])

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      searchProducts(query)
    } else {
      setLoading(false)
    }
  }, [searchParams])

  const searchProducts = async (query) => {
    setLoading(true)
    try {
      const response = await api.get(`/products/?search=${encodeURIComponent(query)}`)
      const data = response.data
      const productsData = data.results || (Array.isArray(data) ? data : [data])
      
      const transformedProducts = productsData.map(transformProduct)
      setProducts(transformedProducts)
    } catch (error) {
      console.error('Failed to search products', error)
      setProducts([])
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
    images: product.images?.map(img => img.stream_url) || ['/images/placeholder.svg'],
    trending: product.trending,
    available_stock: product.available_stock || 100,
    description: product.description || `${product.name} from ${product.company}. Effective treatment for ${product.disease_category}.`
  })

  const handleSearch = (query) => {
    if (query.trim()) {
      const newUrl = `/search?q=${encodeURIComponent(query.trim())}`
      window.history.pushState({}, '', newUrl)
      // Update the search params to trigger useEffect
      const newSearchParams = new URLSearchParams(newUrl.split('?')[1])
      setSearchParams(newSearchParams)
      searchProducts(query.trim())
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#FFFDF5]"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Search Header */}
      {/* <div className="relative z-10 bg-[#C4B5FD] border-b-8 border-black sticky top-16 lg:top-16"> */}
        <div className="sticky top-16 z-50 bg-[#C4B5FD] border-b-8 border-black">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              placeholder="SEARCH FOR MEDICINES, HEALTH PRODUCTS..."
              className="w-full border-4 border-black bg-white font-bold text-base h-14 pl-14 pr-4
                placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                focus-visible:outline-none focus-visible:ring-0
                transition-all duration-100"
            />
            <button 
              onClick={() => handleSearch(searchQuery)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-100"
            >
              <svg className="w-6 h-6 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8">
        {!searchQuery ? (
          /* Search Suggestions */
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-4 -rotate-1">
                SEARCH MEDICINES
              </h1>
              <div className="bg-[#FFD93D] border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4 rotate-1 inline-block">
                <p className="font-bold uppercase tracking-wide">FIND EXACTLY WHAT YOU NEED</p>
              </div>
            </div>

            {/* Recent Searches */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              <div className="bg-[#FF6B6B] border-b-4 border-black p-4 sm:p-6">
                <h2 className="font-black uppercase tracking-widest text-sm text-white">RECENT SEARCHES</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="bg-white border-4 border-black font-bold uppercase tracking-wide text-sm px-4 py-3 h-12
                        shadow-[4px_4px_0px_0px_#000]
                        hover:bg-[#C4B5FD] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                        active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                        transition-all duration-100"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              <div className="bg-[#FFD93D] border-b-4 border-black p-4 sm:p-6">
                <h2 className="font-black uppercase tracking-widest text-sm">POPULAR CATEGORIES</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {popularCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(category)}
                      className="bg-white border-4 border-black p-4 sm:p-6 text-left shadow-[4px_4px_0px_0px_#000]
                        hover:bg-[#C4B5FD] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1
                        transition-all duration-200"
                      style={{ transform: `rotate(${Math.random() > 0.5 ? 1 : -1}deg)` }}
                    >
                      <div className="w-12 h-12 bg-[#FF6B6B] border-4 border-black mb-4 flex items-center justify-center">
                        <span className="text-xl font-black text-white">💊</span>
                      </div>
                      <div className="font-black uppercase tracking-tight text-sm mb-2">{category}</div>
                      <div className="font-bold uppercase tracking-wide text-xs opacity-60">EXPLORE PRODUCTS</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore More */}
            <div className="bg-black border-4 border-black shadow-[12px_12px_0px_0px_#000] p-8 sm:p-12 text-center -rotate-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4 rotate-1">
                EXPLORE MORE
              </h2>
              <div className="bg-[#FFD93D] border-4 border-white p-4 shadow-[6px_6px_0px_0px_#fff] inline-block mb-6">
                <p className="font-bold uppercase tracking-wide text-black">DISCOVER OUR WIDE RANGE OF MEDICINES AND HEALTH PRODUCTS</p>
              </div>
              <button
                onClick={() => window.location.href = '/products'}
                className="bg-[#FF6B6B] border-4 border-white font-black uppercase tracking-widest 
                  text-sm px-8 py-4 h-14 text-white
                  shadow-[6px_6px_0px_0px_#fff]
                  hover:shadow-[3px_3px_0px_0px_#fff] hover:translate-x-[3px] hover:translate-y-[3px]
                  active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                  transition-all duration-100"
              >
                BROWSE ALL PRODUCTS
              </button>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
                  SEARCH RESULTS
                </h2>
                <div className="bg-[#C4B5FD] border-4 border-black shadow-[4px_4px_0px_0px_#000] p-3 -rotate-1 inline-block">
                  <p className="font-bold uppercase tracking-wide text-sm">
                    FOR "{searchQuery}" - {!loading && `${products.length} PRODUCTS FOUND`}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSearchQuery('')
                  window.history.pushState({}, '', '/search')
                }}
                className="bg-white border-4 border-black font-black uppercase tracking-widest 
                  text-xs px-4 py-3 h-12 w-full sm:w-auto
                  shadow-[4px_4px_0px_0px_#000]
                  hover:bg-[#FFD93D] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                  active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                  transition-all duration-100"
              >
                CLEAR SEARCH
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array(10).fill(0).map((_, i) => (
                  <div key={i} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] h-80"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map(product => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] p-8 sm:p-12 inline-block rotate-1">
                  <div className="w-24 h-24 bg-[#FF6B6B] border-4 border-black mx-auto mb-6 flex items-center justify-center -rotate-12">
                    <svg className="w-12 h-12 stroke-[4px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">NO PRODUCTS FOUND</h3>
                  <p className="font-bold uppercase tracking-wide mb-6">TRY SEARCHING WITH DIFFERENT KEYWORDS</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      window.history.pushState({}, '', '/search')
                    }}
                    className="bg-[#FFD93D] border-4 border-black font-black uppercase tracking-widest 
                      text-sm px-6 py-4 h-14
                      shadow-[6px_6px_0px_0px_#000]
                      hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                      active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                      transition-all duration-100"
                  >
                    CLEAR SEARCH
                  </button>
                </div>
              </div>
            )}

            {/* Search Tips */}
            {!loading && products.length === 0 && (
              <div className="mt-12">
                <div className="bg-[#C4B5FD] border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
                  <div className="bg-black border-b-4 border-black p-4 sm:p-6">
                    <h3 className="font-black uppercase tracking-widest text-sm text-white">SEARCH TIPS</h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black"></div>
                          <span className="font-bold text-sm uppercase">TRY GENERIC NAMES</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black"></div>
                          <span className="font-bold text-sm uppercase">CHECK SPELLING</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black"></div>
                          <span className="font-bold text-sm uppercase">USE FEWER WORDS</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black"></div>
                          <span className="font-bold text-sm uppercase">SEARCH BY CONDITION</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black"></div>
                          <span className="font-bold text-sm uppercase">TRY BRAND NAMES</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black"></div>
                          <span className="font-bold text-sm uppercase">BROWSE CATEGORIES</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}