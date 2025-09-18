import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationDetector from './LocationDetector';

export default function Navbar() {
  const { user, logout } = useUser();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MediCare</span>
            </Link>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for medicines, health products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LocationDetector />
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="text-gray-600 hover:text-primary-600 font-medium">Profile</Link>
                  <button onClick={handleLogout} className="text-gray-600 hover:text-primary-600 font-medium">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-lg font-bold text-gray-900">MediCare</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/cart" className="relative p-2 text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <svg className="absolute left-3 top-3 h-4 w-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-t border-gray-100"
            >
              <div className="px-4 py-3 space-y-3">
                <LocationDetector />
                <div className="space-y-2">
                  <Link to="/" className="block py-2 text-gray-700 font-medium">Home</Link>
                  <Link to="/products" className="block py-2 text-gray-700 font-medium">All Products</Link>
                  {user && <Link to="/profile" className="block py-2 text-gray-700 font-medium">Profile</Link>}
                  {user && <Link to="/orders" className="block py-2 text-gray-700 font-medium">My Orders</Link>}
                  {user ? (
                    <button onClick={handleLogout} className="block py-2 text-gray-700 font-medium w-full text-left">Logout</button>
                  ) : (
                    <Link to="/login" className="block py-2 text-primary-600 font-medium">Login</Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          <Link to="/" className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-primary-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-primary-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs font-medium">Products</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-primary-600 relative">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 right-6 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                {cartCount}
              </span>
            )}
            <span className="text-xs font-medium">Cart</span>
          </Link>
          <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-primary-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">{user ? "Profile" : "Login"}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
