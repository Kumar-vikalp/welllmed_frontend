import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Zap, Shield } from 'lucide-react'
import Card from './Card'
import Button from './Button'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="bg-neo-ink border-t-8 border-neo-ink relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-neo-dots opacity-10"></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-20 rotate-12">
        <Star className="w-12 h-12 fill-neo-secondary text-neo-secondary animate-spin-slow" />
      </div>
      <div className="absolute bottom-20 right-32 -rotate-12">
        <Zap className="w-16 h-16 fill-neo-accent text-neo-accent animate-bounce-slow" />
      </div>
      <div className="absolute top-32 right-10 rotate-45">
        <Shield className="w-10 h-10 fill-neo-muted text-neo-muted" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="neo-container py-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Card className="p-6 bg-neo-secondary rotate-2" hover={false}>
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-neo-ink border-4 border-neo-ink flex items-center justify-center -rotate-3">
                  <span className="text-neo-secondary font-black text-2xl">G</span>
                </div>
                <span className="text-3xl font-black uppercase text-neo-ink -rotate-1">genx</span>
              </Link>
              <p className="text-neo-ink font-bold text-sm mb-6 leading-relaxed">
                YOUR TRUSTED ONLINE PHARMACY FOR QUALITY MEDICINES AT AFFORDABLE PRICES. 
                WE DELIVER HEALTH AND WELLNESS TO YOUR DOORSTEP IN JUST 10 MINUTES.
              </p>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="rotate-1">
                  <svg className="w-5 h-5 stroke-[3px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="-rotate-1">
                  <svg className="w-5 h-5 stroke-[3px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="rotate-2">
                  <svg className="w-5 h-5 stroke-[3px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* How to Order */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-neo-accent -rotate-1 h-full" hover={false}>
              <h3 className="text-2xl font-black  text-neo-ink mb-6 uppercase rotate-1">HOW TO ORDER</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="neo-badge bg-white text-neo-ink rotate-12 mr-3 mt-1">1</span>
                  <span className=" text-neo-ink font-bold text-sm uppercase">SEARCH FOR YOUR MEDICINES</span>
                </li>
                <li className="flex items-start">
                  <span className="neo-badge bg-white text-neo-ink -rotate-12 mr-3 mt-1">2</span>
                  <span className=" text-neo-ink font-bold text-sm uppercase">ADD TO CART AND CHECKOUT</span>
                </li>
                <li className="flex items-start">
                  <span className="neo-badge bg-white text-neo-ink rotate-12 mr-3 mt-1">3</span>
                  <span className=" text-neo-ink font-bold text-sm uppercase">GET DELIVERED IN 10 MINUTES</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-neo-muted rotate-1 h-full" hover={false}>
              <h3 className="text-2xl font-black text-neo-ink mb-6 uppercase -rotate-1">QUICK LINKS</h3>
              <ul className="space-y-3">
                <li><Link to="/products" className="text-neo-ink hover:text-white hover:bg-neo-ink hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">ALL PRODUCTS</Link></li>
                <li><Link to="/products?trending=true" className="text-neo-ink hover:text-white hover:bg-neo-ink hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">TRENDING</Link></li>
                <li><Link to="/generic-info" className="text-neo-ink hover:text-white hover:bg-neo-ink hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">GENERIC MEDICINES</Link></li>
                <li><Link to="/products?category=Vitamins" className="text-neo-ink hover:text-white hover:bg-neo-ink hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">VITAMINS & SUPPLEMENTS</Link></li>
                <li><Link to="/orders" className="text-neo-ink hover:text-white hover:bg-neo-ink hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">TRACK ORDER</Link></li>
                <li><Link to="/how-to-order" className="text-neo-ink hover:text-white hover:bg-neo-ink hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">HOW TO ORDER</Link></li>
                <li><Link to="/about" className="text-neo-ink hover:text-white hover:bg-neo-ink hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">ABOUT US</Link></li>
              </ul>
            </Card>
          </motion.div>

          {/* Support & Legal */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-white -rotate-2 h-full" hover={false}>
              <h3 className="text-2xl font-black text-neo-ink mb-6 uppercase rotate-1">SUPPORT & LEGAL</h3>
              <ul className="space-y-3">
                <li><a href="tel:+911234567890" className="text-neo-ink hover:text-white hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">📞 +91 123 456 7890</a></li>
                <li><a href="mailto:support@genx.com" className="text-neo-ink hover:text-white hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">✉️ SUPPORT@genx.COM</a></li>
                <li><Link to="/help" className="text-neo-ink hover:text-white hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">❓ HELP CENTER</Link></li>
                <li><Link to="/contact" className="text-neo-ink hover:text-white hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold text-sm uppercase">💬 CONTACT US</Link></li>
              </ul>
            </Card>
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 border-t-4 border-white pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Card className="p-4 bg-neo-secondary rotate-1 mb-4 md:mb-0" hover={false}>
              <p className="text-neo-ink font-black text-sm uppercase">
                &copy; 2025 genx. ALL RIGHTS RESERVED. | LICENSED ONLINE PHARMACY
              </p>
            </Card>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="neo-badge bg-green-600 text-white rotate-3">SSL SECURE</span>
                <span className="neo-badge bg-blue-600 text-white -rotate-2">FDA APPROVED</span>
                <span className="neo-badge bg-neo-accent text-white rotate-1">ISO CERTIFIED</span>
              </div>
            </div>
          </div>
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <Card className="p-6 bg-neo-ink border-white -rotate-1" hover={false}>
              <p className=" text-neo-ink font-bold text-sm leading-relaxed uppercase tracking-wide">
                DISCLAIMER: THIS WEBSITE IS FOR INFORMATIONAL PURPOSES ONLY. ALWAYS CONSULT WITH A HEALTHCARE PROFESSIONAL BEFORE TAKING ANY MEDICATION.
                genx IS COMMITTED TO PROVIDING SAFE, EFFECTIVE, AND AFFORDABLE HEALTHCARE SOLUTIONS.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}