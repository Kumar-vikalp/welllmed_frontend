import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'
import Card from './Card'

export default function TrendingCarousel({ products, title = "Trending Products", showTitle = true }) {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef(null)
  const navigate = useNavigate()

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('mousedown', handleMouseDown)
      carousel.addEventListener('mousemove', handleMouseMove)
      carousel.addEventListener('mouseup', handleMouseUp)
      carousel.addEventListener('mouseleave', handleMouseUp)
      carousel.addEventListener('touchstart', handleTouchStart)
      carousel.addEventListener('touchmove', handleTouchMove)
      carousel.addEventListener('touchend', handleTouchEnd)

      return () => {
        carousel.removeEventListener('mousedown', handleMouseDown)
        carousel.removeEventListener('mousemove', handleMouseMove)
        carousel.removeEventListener('mouseup', handleMouseUp)
        carousel.removeEventListener('mouseleave', handleMouseUp)
        carousel.removeEventListener('touchstart', handleTouchStart)
        carousel.removeEventListener('touchmove', handleTouchMove)
        carousel.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, startX, scrollLeft])

  if (!products || products.length === 0) return null

  return (
    <div className="relative">
      {showTitle && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase -rotate-1">{title}</h2>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rotate-1"
              onClick={() => scrollCarousel('left')}
            >
              <ChevronLeft className="w-6 h-6 stroke-[3px]" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="-rotate-1"
              onClick={() => scrollCarousel('right')}
            >
              <ChevronRight className="w-6 h-6 stroke-[3px]" />
            </Button>
          </div>
        </div>
      )}

      <div 
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-4"
        style={{ 
          scrollBehavior: 'smooth',
          userSelect: 'none'
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.product_id}
            className="flex-shrink-0 w-64"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !isDragging && navigate(`/product/${product.slug}`)}
          >
            <Card
              className="overflow-hidden cursor-pointer"
              rotation={Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-40 object-cover border-b-4 border-neo-ink"
                  loading="lazy"
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
                <h3 className="text-base font-black mt-1 mb-3 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xl font-black">₹{product.discounted_price.toFixed(2)}</p>
                    {product.discount > 0 && (
                      <p className="text-sm font-bold line-through opacity-60">₹{product.mrp.toFixed(2)}</p>
                    )}
                  </div>
                  <span className="neo-badge bg-neo-secondary rotate-3">
                    {product.discount}% OFF
                  </span>
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
  )
}