import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Zap, Shield, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'
import Card from './Card'

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      tag: "⚡ EXPRESS DELIVERY",
      title: "MEDICINE IN 10 MIN",
      subtitle: "Emergency essentials or daily refills, we've got you covered with authentic medicines at your doorstep.",
      cta: "ORDER NOW",
      link: "/products",
      bg: "bg-neo-accent",
      accent: "bg-red-500",
      images: {
        mobile: "https://storage.googleapis.com/pictographic/pictocache/YZ5NdBy88jsH7t4I1CN2.svg",
        tablet: "https://storage.googleapis.com/pictographic/pictocache/YZ5NdBy88jsH7t4I1CN2.svg",
        desktop: "https://storage.googleapis.com/pictographic/pictocache/YZ5NdBy88jsH7t4I1CN2.svg"
      }
    },
    {
      id: 2,
      tag: "🔥 LIMITED OFFER",
      title: "FLAT 80% OFF",
      subtitle: "Your first step towards affordable healthcare starts here. Quality medicines at unbeatable prices.",
      cta: "CLAIM DISCOUNT",
      link: "/products?trending=true",
      bg: "bg-neo-secondary",
      accent: "bg-yellow-400",
      images: {
        mobile: "https://storage.googleapis.com/pictographic/pictocache/C4dbARY6yG2iqiXNKxej.svg",
        tablet: "https://storage.googleapis.com/pictographic/pictocache/C4dbARY6yG2iqiXNKxej.svg",
        desktop: "https://storage.googleapis.com/pictographic/pictocache/C4dbARY6yG2iqiXNKxej.svg"
      }
    },
    {
      id: 3,
      tag: "🛡️ 100% AUTHENTIC",
      title: "TRUSTED PHARMACY",
      subtitle: "All medicines sourced directly from licensed manufacturers. Your health, our priority.",
      cta: "BROWSE MEDICINES",
      link: "/products",
      bg: "bg-neo-muted",
      accent: "bg-purple-400",
      images: {
        mobile: "https://storage.googleapis.com/pictographic/pictocache/XmABsaLYzA2zPs7wZjks3A.svg",
        tablet: "https://storage.googleapis.com/pictographic/pictocache/XmABsaLYzA2zPs7wZjks3A.svg",
        desktop: "https://storage.googleapis.com/pictographic/pictocache/XmABsaLYzA2zPs7wZjks3A.svg"
      }
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative overflow-hidden bg-neo-canvas border-y-4 border-neo-ink">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-neo-grid opacity-20"></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 rotate-12 z-10">
        <Star className="w-10 h-10 md:w-16 md:h-16 fill-neo-accent text-neo-accent animate-spin-slow" />
      </div>
      <div className="absolute top-40 right-20 -rotate-12 z-10">
        <Zap className="w-12 h-12 md:w-20 md:h-20 fill-neo-secondary text-neo-secondary animate-bounce-slow" />
      </div>
      <div className="absolute bottom-32 left-32 rotate-45 z-10 hidden md:block">
        <Shield className="w-10 h-10 fill-neo-muted text-neo-muted" />
      </div>

      <div className="neo-container relative z-20">
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`absolute inset-0 ${slides[currentSlide].bg} border-4 border-neo-ink shadow-neo-xl`}
            >
              {/* Decorative Accent Shapes */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl opacity-30 ${slides[currentSlide].accent}`} />
              <div className={`absolute -bottom-24 -left-24 w-32 h-32 md:w-72 md:h-72 rounded-full blur-3xl opacity-20 ${slides[currentSlide].accent}`} />

              <div className="relative h-full flex items-center px-6 md:px-12 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                  
                  {/* Text Content */}
                  <div className="lg:col-span-7 z-10 text-center lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block mb-4"
                    >
                      <span className="neo-badge rotate-1 bg-neo-ink text-white">
                        {slides[currentSlide].tag}
                      </span>
                    </motion.div>
                    
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-6xl lg:text-8xl font-black leading-none mb-6"
                    >
                      <span className="block -rotate-1">{slides[currentSlide].title.split(' ')[0]}</span>
                      <span className="block rotate-1 text-neo-ink text-stroke">
                        {slides[currentSlide].title.split(' ').slice(1).join(' ')}
                      </span>
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl font-bold max-w-lg mb-8 mx-auto lg:mx-0"
                    >
                      {slides[currentSlide].subtitle}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                      <Link to={slides[currentSlide].link}>
                        <Button size="lg" className="rotate-1 w-full sm:w-auto">
                          {slides[currentSlide].cta}
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg" className="-rotate-1 w-full sm:w-auto">
                        LEARN MORE
                      </Button>
                    </motion.div>
                  </div>

                  {/* Image Content - Responsive */}
                  <div className="lg:col-span-5 relative hidden lg:block">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      {/* Desktop Image */}
                      <Card className="overflow-hidden rotate-3" hover={false}>
                        <picture>
                          <source media="(min-width: 1024px)" srcSet={slides[currentSlide].images.desktop} />
                          <source media="(min-width: 768px)" srcSet={slides[currentSlide].images.tablet} />
                          <img
                            src={slides[currentSlide].images.mobile}
                            alt={slides[currentSlide].title}
                            className="w-full h-[300px] lg:h-[400px] object-cover"
                            loading="lazy"
                          />
                        </picture>
                      </Card>
                      
                      {/* Floating Trust Badges */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -bottom-6 -left-6"
                      >
                        <Card className="p-4 bg-white -rotate-6" hover={false}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 border-2 border-neo-ink flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-600 stroke-[4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs text-neo-ink font-black uppercase">Verified</p>
                              <p className="text-sm font-black text-neo-ink uppercase">100% Genuine</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute -top-6 -right-6"
                      >
                        <Card className="p-4 bg-neo-secondary rotate-12" hover={false}>
                          <div className="flex items-center gap-3">
                            <Clock className="w-6 h-6 stroke-[4px]" />
                            <div>
                              <p className="text-xs text-neo-ink font-black uppercase">24/7</p>
                              <p className="text-sm font-black text-neo-ink uppercase">Support</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </div>

                </div>
              </div>

              {/* Background Numbers */}
              <div className="absolute bottom-0 left-0 text-6xl md:text-9xl font-black text-neo-ink opacity-10 -rotate-12 pointer-events-none">
                Genx
              </div>
              <div className="absolute top-20 right-20 text-4xl md:text-6xl font-black text-neo-ink opacity-20 rotate-12 pointer-events-none hidden md:block">
                Medicos
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-4 flex items-center z-30">
            {/* <Button 
              variant="ghost" 
              size="sm" 
              className="rotate-1 bg-white/90 hover:bg-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6 stroke-[3px]" />
            </Button> */}
          </div>
          
          <div className="absolute inset-y-0 right-4 flex items-center z-30">
            {/* <Button 
              variant="ghost" 
              size="sm" 
              className="-rotate-1 bg-white/90 hover:bg-white"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6 stroke-[3px]" />
            </Button> */}
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-200 border-2 border-neo-ink ${
                  index === currentSlide 
                    ? 'w-8 h-4 bg-neo-ink rotate-1' 
                    : 'w-4 h-4 bg-white hover:bg-neo-secondary -rotate-1'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Image Section */}
      <div className="hidden lg:block relative">
        <motion.div
          key={`mobile-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="neo-container py-8"
        >
          <Card className="overflow-hidden rotate-1" hover={false}>
            <picture>
              <source media="(min-width: 768px)" srcSet={slides[currentSlide].images.tablet} />
              <img
                src={slides[currentSlide].images.mobile}
                alt={slides[currentSlide].title}
                className="w-full h-[200px] sm:h-[250px] object-cover"
                loading="lazy"
              />
            </picture>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}