import { useEffect, useState, useMemo, useRef } from 'react'
import api from '../api/axiosConfig'
import ProductCard from '../components/ProductCard'
import Skeleton from '../components/Skeleton'
import { dummyProducts, dummyFeaturedProducts, dummyTrendingProducts } from '../data/dummyProducts'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import TrendingCarousel from '../components/TrendingCarousel'
import HeroCarousel from '../components/HeroCarousel'
import Button from '../components/Button'
import Card from '../components/Card'
import { Star, Zap, Shield, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(true)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const navigate = useNavigate()

  // Carousel refs
  const categoryCarouselRef = useRef(null)
  const healthConditionsRef = useRef(null)
  const featuredCarouselRef = useRef(null)
  const flashDealsRef = useRef(null)

  const categories = useMemo(() => [
    {
      name: 'Fever & Pain',
      icon: 'https://rmigvtefdeitvrstdmkt.supabase.co/storage/v1/object/public/media/ctg/1.png',
      count: 25,
      color: 'bg-neo-accent'
    },
    {
      name: 'Allergy & Cold',
      icon: 'https://rmigvtefdeitvrstdmkt.supabase.co/storage/v1/object/public/media/ctg/2.png',
      count: 18,
      color: 'bg-neo-secondary'
    },
    {
      name: 'Digestive Health',
      icon: 'https://rmigvtefdeitvrstdmkt.supabase.co/storage/v1/object/public/media/ctg/3.png',
      count: 22,
      color: 'bg-neo-muted'
    },
    {
      name: 'Heart & BP',
      icon: 'https://rmigvtefdeitvrstdmkt.supabase.co/storage/v1/object/public/media/ctg/4.png',
      count: 15,
      color: 'bg-neo-accent'
    },
    {
      name: 'Vitamins',
      icon: 'https://rmigvtefdeitvrstdmkt.supabase.co/storage/v1/object/public/media/ctg/5.png',
      count: 30,
      color: 'bg-neo-secondary'
    },
    {
      name: 'Antibiotics',
      icon: 'https://rmigvtefdeitvrstdmkt.supabase.co/storage/v1/object/public/media/ctg/6.png',
      count: 12,
      color: 'bg-neo-muted'
    },
    {
      name: 'Skin Care',
      icon: 'https://rmigvtefdeitvrstdmkt.supabase.co/storage/v1/object/public/media/ctg/7.png',
      count: 20,
      color: 'bg-neo-accent'
    },
    {
      name: 'Women\'s Health',
      icon: 'https://rmigvtefdeitvrstdmkt.supabase.co/storage/v1/object/public/media/ctg/8.png',
      count: 16,
      color: 'bg-neo-secondary'
    }
  ], [])

  const healthConditions = [
    { name: 'Diabetes Care', icon: 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=200&h=200&fit=crop', link: '/products?condition=diabetes' },
    { name: 'Cardiac Care', icon: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=200&h=200&fit=crop', link: '/products?condition=cardiac' },
    { name: 'Stomach Care', icon: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop', link: '/products?condition=stomach' },
    { name: 'Pain Relief', icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', link: '/products?condition=pain' },
    { name: 'Liver Care', icon: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=200&h=200&fit=crop', link: '/products?condition=liver' },
    { name: 'Oral Care', icon: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=200&h=200&fit=crop', link: '/products?condition=oral' },
    { name: 'Respiratory', icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', link: '/products?condition=respiratory' },
    { name: 'Sexual Health', icon: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop', link: '/products?condition=sexual' },
    { name: 'Elderly Care', icon: 'https://images.unsplash.com/photo-1581579186913-45ac3e648364?w=200&h=200&fit=crop', link: '/products?condition=elderly' },
    { name: 'Cold & Immunity', icon: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&h=200&fit=crop', link: '/products?condition=immunity' }
  ]

  useEffect(() => {
    fetchTrendingProducts()
    fetchFeaturedProducts()
  }, [])

  const fetchTrendingProducts = async () => {
    setTrendingLoading(true)
    try {
      const response = await api.get('/products/?trending=true&page_size=10', {
        timeout: 30000
      })
      const data = response.data
      const productsData = data.results || (Array.isArray(data) ? data : [data])

      const transformedProducts = productsData.map(transformProduct)
      setTrendingProducts(transformedProducts)
    } catch (error) {
      console.error('Failed to fetch trending products', error)
      setTrendingProducts(dummyTrendingProducts)
    } finally {
      setTrendingLoading(false)
    }
  }

  const fetchFeaturedProducts = async () => {
    setFeaturedLoading(true)
    try {
      const response = await api.get('/products/?featured=true&page_size=8', {
        timeout: 30000
      })
      const data = response.data
      const productsData = data.results || (Array.isArray(data) ? data : [data])

      const transformedProducts = productsData.map(transformProduct)
      setFeaturedProducts(transformedProducts)
    } catch (error) {
      console.error('Failed to fetch featured products', error)
      setFeaturedProducts(dummyFeaturedProducts)
    } finally {
      setFeaturedLoading(false)
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

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`)
  }

  // Carousel scroll functions
  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-neo-canvas min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Neo-Brutalist Flash Sale */}
      {/* <div className="bg-neo-accent border-y-4 border-neo-ink">
        <div className="neo-container py-6">
          <div className="flex items-center justify-center gap-4">
            <Zap className="w-8 h-8 animate-bounce" />
            <span className="text-2xl md:text-4xl font-black uppercase tracking-wider">
              FLASH SALE: UP TO 30% OFF!
            </span>
            <Zap className="w-8 h-8 animate-bounce" />
          </div>
        </div>
      </div> */}

      {/* Categories Section with Neo-Brutalist Carousel */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase -rotate-1">
              SHOP BY CATEGORY
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rotate-1"
                onClick={() => scrollCarousel(categoryCarouselRef, 'left')}
              >
                <ChevronLeft className="w-6 h-6 stroke-[3px]" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="-rotate-1"
                onClick={() => scrollCarousel(categoryCarouselRef, 'right')}
              >
                <ChevronRight className="w-6 h-6 stroke-[3px]" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div 
              ref={categoryCarouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0"
                >
                  <Card
                    className="w-48 h-64 cursor-pointer relative overflow-hidden"
                    rotation={Math.random() > 0.5 ? 1 : -1}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="relative h-full">
                      <img 
                        src={category.icon} 
                        alt={category.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        {/* <div className={`${category.color} border-4 border-neo-ink p-3 -rotate-2`}>
                          <h3 className="text-lg font-black uppercase text-center leading-tight">
                            {category.name}
                          </h3>
                          <p className="text-sm font-bold text-center mt-1">
                            {category.count} ITEMS
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flash Deals Section with Neo-Brutalist Carousel */}
      <div className="neo-section bg-neo-secondary border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 bg-white -rotate-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase flex items-center">
                  <Zap className="mr-4 w-12 h-12 fill-neo-accent text-neo-accent" />
                  FLASH DEALS
                </h2>
                <p className="text-lg font-bold uppercase tracking-wide">LIMITED TIME OFFERS</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rotate-2"
                  onClick={() => scrollCarousel(flashDealsRef, 'left')}
                >
                  <ChevronLeft className="w-6 h-6 stroke-[3px]" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="-rotate-2"
                  onClick={() => scrollCarousel(flashDealsRef, 'right')}
                >
                  <ChevronRight className="w-6 h-6 stroke-[3px]" />
                </Button>
              </div>
              <div className="neo-badge bg-neo-accent animate-pulse rotate-3">
                ENDS SOON!
              </div>
            </div>
            
            {featuredLoading ? (
              <div className="flex gap-4 overflow-x-auto">
                {Array(4).fill(0).map((_, i) => <Skeleton key={i} type="trending" />)}
              </div>
            ) : (
              <div className="relative">
                <div 
                  ref={flashDealsRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {featuredProducts.map((product, index) => (
                    <motion.div
                      key={product.product_id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 w-64"
                    >
                      <Card className="overflow-hidden" rotation={Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0}>
                        <div className="relative">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-full h-40 object-cover border-b-4 border-neo-ink" 
                          />
                          {product.trending && (
                            <span className="absolute -top-2 -left-2 neo-badge bg-neo-accent rotate-12 z-10">
                              🔥 HOT
                            </span>
                          )}
                          {product.discount > 0 && (
                            <span className="absolute -top-2 -right-2 neo-badge bg-neo-secondary -rotate-12 z-10">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-bold uppercase tracking-wide">{product.company}</p>
                          <h3 className="text-base font-black mt-1 mb-2 line-clamp-2 leading-tight">
                            {product.name}
                          </h3>
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <p className="text-xl font-black">₹{product.discounted_price.toFixed(2)}</p>
                              {product.discount > 0 && (
                                <p className="text-sm font-bold line-through opacity-60">₹{product.mrp.toFixed(2)}</p>
                              )}
                            </div>
                          </div>
                          <Button variant="primary" size="sm" className="w-full">
                            ADD TO CART
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Lab Tests Section - Redesigned */}
      <div className="relative min-h-[50vh] w-full text-gray-800 overflow-hidden">
        {/* Gradient Base */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)",
          }}
        />

        {/* Light Circuit Pattern Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.08) 19px, rgba(255,255,255,0.08) 20px, transparent 20px, transparent 39px, rgba(255,255,255,0.08) 39px, rgba(255,255,255,0.08) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.08) 19px, rgba(255,255,255,0.08) 20px, transparent 20px, transparent 39px, rgba(255,255,255,0.08) 39px, rgba(255,255,255,0.08) 40px),
      radial-gradient(circle at 20px 20px, rgba(255,255,255,0.15) 2px, transparent 2px),
      radial-gradient(circle at 40px 40px, rgba(255,255,255,0.15) 2px, transparent 2px)
    `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-[50vh] px-6 py-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Dr Das PathLabs
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8">
            Tests you can trust — Advanced diagnostics at your doorstep
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/lab"
              className="bg-white text-purple-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Lab Tests
            </Link>
            <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-purple-700 transition-colors">
              Home Collection
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products with Neo-Brutalist Carousel */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 bg-neo-muted rotate-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase flex items-center -rotate-1">
                  <Star className="mr-4 w-12 h-12 fill-neo-accent text-neo-accent" />
                  FEATURED PRODUCTS
                </h2>
                <p className="text-lg font-bold uppercase tracking-wide">HANDPICKED FOR YOU</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rotate-2"
                  onClick={() => scrollCarousel(featuredCarouselRef, 'left')}
                >
                  <ChevronLeft className="w-6 h-6 stroke-[3px]" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="-rotate-2"
                  onClick={() => scrollCarousel(featuredCarouselRef, 'right')}
                >
                  <ChevronRight className="w-6 h-6 stroke-[3px]" />
                </Button>
              </div>
            </div>
            
            {featuredLoading ? (
              <div className="flex gap-4 overflow-x-auto">
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} />)}
              </div>
            ) : (
              <div className="relative">
                <div 
                  ref={featuredCarouselRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {featuredProducts.slice(0, 8).map((product, index) => (
                    <motion.div
                      key={product.product_id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 w-64"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Health Conditions Section with Neo-Brutalist Carousel */}
      <div className="neo-section bg-neo-secondary border-y-4 border-neo-ink">
        <div className="neo-container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase rotate-1">
              BROWSE BY HEALTH CONDITIONS
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rotate-1"
                onClick={() => scrollCarousel(healthConditionsRef, 'left')}
              >
                <ChevronLeft className="w-6 h-6 stroke-[3px]" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="-rotate-1"
                onClick={() => scrollCarousel(healthConditionsRef, 'right')}
              >
                <ChevronRight className="w-6 h-6 stroke-[3px]" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div 
              ref={healthConditionsRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {healthConditions.map((condition, index) => (
                <motion.div
                  key={condition.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0"
                >
                  <Link to={condition.link}>
                    <Card
                      className="w-48 h-64 cursor-pointer relative overflow-hidden"
                      rotation={Math.random() > 0.5 ? 1 : -1}
                    >
                      <div className="relative h-full">
                        <img 
                          src={condition.icon} 
                          alt={condition.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-4">
                          <div className="bg-white border-4 border-neo-ink p-3 rotate-2">
                            <h3 className="text-lg font-black uppercase text-center leading-tight">
                              {condition.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products with Neo-Brutalist Design */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 bg-neo-accent -rotate-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl md:text-5xl font-black uppercase rotate-1">
                🔥 TRENDING NOW
              </h2>
              <div className="neo-badge bg-white animate-bounce -rotate-3">
                HOT PICKS!
              </div>
            </div>
            
            {trendingLoading ? (
              <div className="flex gap-4 overflow-x-auto">
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} type="trending" />)}
              </div>
            ) : (
              <TrendingCarousel products={trendingProducts} title="" showTitle={false} />
            )}
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="neo-section bg-neo-muted border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 bg-white rotate-1">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase -rotate-1">
              HOW genx WORKS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <Card className="p-6 bg-neo-secondary rotate-2" hover={false}>
                  <div className="w-16 h-16 bg-white border-4 border-neo-ink rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black mb-2 uppercase">SEARCH & ORDER</h3>
                  <p className="font-bold">Find your medicines and place your order in seconds</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <Card className="p-6 bg-neo-accent -rotate-1" hover={false}>
                  <div className="w-16 h-16 bg-white border-4 border-neo-ink rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black mb-2 uppercase">WE PREPARE</h3>
                  <p className="font-bold">Our pharmacists carefully prepare your order</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <Card className="p-6 bg-neo-secondary rotate-1" hover={false}>
                  <div className="w-16 h-16 bg-white border-4 border-neo-ink rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black mb-2 uppercase">FAST DELIVERY</h3>
                  <p className="font-bold">Get your medicines delivered in 10 minutes</p>
                </Card>
              </motion.div>
            </div>
          </Card>
        </div>
      </div>

      {/* Generic Medicine Info */}
      <div className="neo-section bg-white border-y-4 border-neo-ink">
        <div className="neo-container">
          <Card className="p-8 bg-neo-muted -rotate-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase rotate-1">
                  WHY CHOOSE GENERIC MEDICINES?
                </h2>
                <p className="font-bold mb-6 leading-relaxed">
                  Generic medicines contain the same active ingredients as branded medicines and are equally effective.
                  They undergo rigorous testing to ensure safety and efficacy while being significantly more affordable.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3 text-2xl">✓</span>
                    <span className="font-bold">Same active ingredients as branded medicines</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3 text-2xl">✓</span>
                    <span className="font-bold">20-80% cheaper than branded alternatives</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3 text-2xl">✓</span>
                    <span className="font-bold">FDA approved and rigorously tested</span>
                  </div>
                </div>
                <Link to="/generic-info">
                  <Button variant="primary" className="rotate-2">
                    LEARN MORE ABOUT GENERICS
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <Card className="p-8 bg-white rotate-2">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-neo-accent border-4 border-neo-ink rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-black mb-2 uppercase">GENERIC VS BRANDED</h3>
                    <p className="font-bold">Watch our educational video</p>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="neo-section bg-neo-ink border-y-4 border-neo-ink">
        <div className="neo-container text-center text-white">
          <Card className="p-8 bg-neo-ink border-white rotate-1" hover={false}>
            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase -rotate-1">
              YOUR HEALTH, OUR PRIORITY
            </h2>
            <p className="text-xl md:text-2xl mb-8 font-bold opacity-90">
              Quality medicines, expert advice, doorstep delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="secondary" size="lg" className="rotate-2">
                  START SHOPPING
                </Button>
              </Link>
              <Link to="/how-to-order">
                <Button variant="outline" size="lg" className="-rotate-2">
                  HOW TO ORDER
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}