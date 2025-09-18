import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import ProductCard from '../components/ProductCard'
import Skeleton from '../components/Skeleton'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import TrendingCarousel from '../components/TrendingCarousel'

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(true)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTrendingProducts()
    fetchFeaturedProducts()
    fetchCategories()
  }, [])

  const fetchTrendingProducts = async () => {
    setTrendingLoading(true)
    try {
      const response = await api.get('/products/?trending=true&page_size=10')
      const data = response.data
      const productsData = data.results || (Array.isArray(data) ? data : [data])
      
      const transformedProducts = productsData.map(transformProduct)
      setTrendingProducts(transformedProducts)
    } catch (error) {
      console.error('Failed to fetch trending products', error)
      setTrendingProducts([])
    } finally {
      setTrendingLoading(false)
    }
  }

  const fetchFeaturedProducts = async () => {
    setFeaturedLoading(true)
    try {
      const response = await api.get('/products/?featured=true&page_size=8')
      const data = response.data
      const productsData = data.results || (Array.isArray(data) ? data : [data])
      
      const transformedProducts = productsData.map(transformProduct)
      setFeaturedProducts(transformedProducts)
    } catch (error) {
      console.error('Failed to fetch featured products', error)
      setFeaturedProducts([])
    } finally {
      setFeaturedLoading(false)
    }
  }

  const fetchCategories = async () => {
    // Mock categories for now
    setCategories([
      { name: 'Fever & Pain', icon: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', count: 25 },
      { name: 'Allergy & Cold', icon: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', count: 18 },
      { name: 'Digestive Health', icon: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', count: 22 },
      { name: 'Heart & Blood Pressure', icon: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', count: 15 },
      { name: 'Vitamins & Supplements', icon: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', count: 30 },
      { name: 'Antibiotics', icon: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', count: 12 },
      { name: 'Skin Care', icon: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', count: 20 },
      { name: 'Women\'s Health', icon: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', count: 16 }
    ])
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
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
  }

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Medicine delivered in 10 minutes</h1>
            <p className="text-sm md:text-lg opacity-90 mb-6">Get your medicines delivered to your doorstep</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Delivering to your location</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white">
        <div className="px-4 py-3 bg-gray-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="flex items-center space-x-2 text-sm md:text-base font-medium">
              <span className="animate-pulse">🎉</span>
              <span className='text-gray-900'>FLAT 80% OFF on your first order!</span>
              <span className="animate-pulse">🎉</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View All →
          </Link>
        </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {categories.map(category => (
            <motion.div
              key={category.name}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white rounded-lg p-3 md:p-4 text-center cursor-pointer hover:shadow-md transition-all border border-gray-100"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 rounded-lg overflow-hidden">
                <img src={category.icon} alt={category.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1 leading-tight">{category.name}</h3>
              {/* <p className="text-xs text-gray-500">{category.count}</p> */}
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="px-4 mb-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-xl overflow-hidden h-32 md:h-48">
            <img 
              src="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop"
              alt="Featured Products"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-700/90 flex items-center">
              <div className="px-6 text-white">
                <h2 className="text-xl md:text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-sm md:text-lg mb-4 opacity-90">Handpicked medicines for your wellness</p>
                <Link 
                  to="/products?featured=true"
                  className="bg-white text-primary-600 font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                >
                  Explore Featured
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Carousel */}
      <div className="px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
      {featuredLoading ? (
          <div className="mb-8">
            <h2 className="text-lg md:text-2xl font-bold mb-4 text-gray-900">Featured Products</h2>
          <div className="flex gap-4 overflow-x-auto">
            {Array(4).fill(0).map((_, i) => <Skeleton key={i} type="trending" />)}
          </div>
        </div>
      ) : (
        <TrendingCarousel products={featuredProducts} title="Featured Products" />
      )}
        </div>
      </div>

      {/* Trending Products Carousel */}
      <div className="px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
      {trendingLoading ? (
          <div className="mb-8">
            <h2 className="text-lg md:text-2xl font-bold mb-4 text-gray-900">Trending Products</h2>
          <div className="flex gap-4 overflow-x-auto">
            {Array(5).fill(0).map((_, i) => <Skeleton key={i} type="trending" />)}
          </div>
        </div>
      ) : (
        <TrendingCarousel products={trendingProducts} title="Trending Products" />
      )}
        </div>
      </div>

      {/* Generic Medicine Info */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-4 text-gray-900">Understanding Generic Medicines</h2>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                  Generic medicines contain the same active ingredients as branded medicines and are equally effective. 
                  They undergo rigorous testing to ensure safety and efficacy while being significantly more affordable.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span className="text-sm md:text-base text-gray-700">Same active ingredients as branded medicines</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span className="text-sm md:text-base text-gray-700">20-80% cheaper than branded alternatives</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span className="text-sm md:text-base text-gray-700">FDA approved and rigorously tested</span>
                  </div>
                </div>
                <Link 
                  to="/generic-info"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg transition-colors text-sm md:text-base"
                >
                  Learn More About Generics
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm md:text-base">Video: Generic vs Branded Medicines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Banner */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-xl overflow-hidden h-32 md:h-48">
            <img 
              src="https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop"
              alt="Health & Wellness"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">Your Health Journey Starts Here</h2>
                <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90">Quality medicines, expert advice, doorstep delivery</p>
                <Link 
                  to="/products"
                  className="bg-white text-blue-600 font-bold py-2 px-4 md:py-3 md:px-8 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
