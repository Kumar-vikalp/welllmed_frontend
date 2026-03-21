import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

export default function NeoBrutalistCarousel({ 
  children, 
  title, 
  showControls = true, 
  showTitle = true,
  className = "",
  itemWidth = "w-64",
  gap = "gap-4"
}) {
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Check scroll position to show/hide controls
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition)
      checkScrollPosition() // Initial check
      
      return () => carousel.removeEventListener('scroll', checkScrollPosition)
    }
  }, [children])

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
    carouselRef.current.style.cursor = 'grabbing'
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
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab'
    }
  }

  // Touch handlers
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

  // Scroll controls
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Add event listeners
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

  return (
    <div className={`relative ${className}`}>
      {/* Title and Controls */}
      {(showTitle || showControls) && (
        <div className="flex justify-between items-center mb-6">
          {showTitle && title && (
            <h2 className="text-2xl md:text-3xl font-black uppercase -rotate-1">
              {title}
            </h2>
          )}
          
          {showControls && (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rotate-2 ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="w-6 h-6 stroke-[4px]" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`-rotate-2 ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
              >
                <ChevronRight className="w-6 h-6 stroke-[4px]" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative">
        <div 
          ref={carouselRef}
          className={`flex ${gap} overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-4 touch-pan-x`}
          style={{ 
            scrollBehavior: 'smooth',
            userSelect: 'none'
          }}
        >
          {children}
        </div>

        {/* Gradient Overlays for Visual Cues */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-neo-canvas to-transparent pointer-events-none z-10" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-neo-canvas to-transparent pointer-events-none z-10" />
        )}
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(children?.length / 2) || 0 }).map((_, index) => (
            <div
              key={index}
              className="w-3 h-3 bg-neo-ink border-2 border-neo-ink opacity-30 rotate-45"
            />
          ))}
        </div>
      </div>
    </div>
  )
}