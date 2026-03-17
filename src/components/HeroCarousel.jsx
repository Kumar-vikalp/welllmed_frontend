import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      tag: "Express Delivery",
      title: "Medicine delivered in 10 minutes",
      subtitle: "Emergency essentials or daily refills, we've got you covered.",
      cta: "Order Now",
      link: "/products",
      // Using mesh-style gradients for a modern look
      bg: "bg-[#4F46E5]", 
      accent: "bg-indigo-400",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg"
    },
    {
      id: 2,
      tag: "Limited Offer",
      title: "Get FLAT 80% OFF",
      subtitle: "Your first step towards affordable healthcare starts here.",
      cta: "Claim Discount",
      link: "/products?trending=true",
      bg: "bg-[#E11D48]",
      accent: "bg-rose-400",
      image: "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative h-[250px] md:h-[400px] overflow-hidden mx-4 md:mx-10 rounded-[2rem] shadow-2xl my-8 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 ${slides[currentSlide].bg}`}
        >
          {/* Decorative Modern Shapes */}
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30 ${slides[currentSlide].accent}`} />
          <div className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 ${slides[currentSlide].accent}`} />

          <div className="relative h-full flex items-center px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full max-w-7xl mx-auto">
              
              {/* Text Content */}
              <div className="md:col-span-7 z-10">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md"
                >
                  {slides[currentSlide].tag}
                </motion.span>
                
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-6xl font-extrabold text-white leading-tight mb-4"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/80 text-sm md:text-xl max-w-lg mb-8"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                  <Link 
                    to={slides[currentSlide].link}
                    className="bg-white text-gray-900 px-8 py-3.5 rounded-2xl font-bold shadow-xl hover:shadow-white/20 hover:scale-105 transition-all inline-block text-sm md:text-base"
                  >
                    {slides[currentSlide].cta}
                  </Link>
                </motion.div>
              </div>

              {/* Image Content - Floating Effect */}
              <div className="hidden md:block md:col-span-5 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <img
                    src={slides[currentSlide].image}
                    alt=""
                    className="w-full h-[300px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white/10"
                  />
                  {/* Floating badge for trust */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24 font-bold"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium leading-none">Verified</p>
                      <p className="text-sm font-bold text-gray-800">100% Genuine</p>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modern Slim Indicators */}
      <div className="absolute bottom-6 left-6 md:left-16 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}