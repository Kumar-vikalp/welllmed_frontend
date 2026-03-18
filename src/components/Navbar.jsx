import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '../store/slices/cartSlice';
import { selectUser } from '../store/slices/userSlice';
import { useUser } from '../contexts/UserContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationDetector from './LocationDetector';

export default function Navbar() {
  const user = useSelector(selectUser);
  const { logout } = useUser();
  const cartCount = useSelector(selectCartCount);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Desktop header scroll animation
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search after navigation
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden sm:block bg-neo-canvas border-b-4 border-neo-ink fixed top-0 left-0 right-0 z-50"
      >
        <div className="neo-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-neo-accent border-4 border-neo-ink flex items-center justify-center rotate-3">
                <span className="font-black text-2xl">G</span>
              </div>
              <span className="text-3xl font-black uppercase -rotate-1">genx</span>
            </Link>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for medicines, health products..."
                  className="neo-input w-full pl-12 pr-4 placeholder:font-bold placeholder:uppercase"
                />
                <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-neo-secondary transition-colors duration-100">
                  <svg className="h-5 w-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              <LocationDetector />
              
              {/* Cart */}
              <Link to="/cart" className="relative p-3 border-4 border-transparent hover:border-neo-ink hover:bg-neo-secondary transition-all duration-100">
                <svg className="h-6 w-6 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 neo-badge bg-neo-accent rotate-12">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-3 border-4 border-transparent hover:border-neo-ink hover:bg-neo-muted transition-all duration-100"
                  >
                    <div className="w-8 h-8 bg-neo-accent border-2 border-neo-ink flex items-center justify-center">
                      <span className="font-black text-sm">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <svg className="w-4 h-4 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white border-4 border-neo-ink shadow-neo py-2"
                      >
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-2 font-bold hover:bg-neo-secondary transition-colors duration-100"
                        >
                          <svg className="w-4 h-4 mr-3 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          PROFILE
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-2 font-bold hover:bg-neo-secondary transition-colors duration-100"
                        >
                          <svg className="w-4 h-4 mr-3 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          MY ORDERS
                        </Link>
                        <Link
                          to="/how-to-order"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-2 font-bold hover:bg-neo-secondary transition-colors duration-100"
                        >
                          <svg className="w-4 h-4 mr-3 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          HOW TO ORDER
                        </Link>
                        <hr className="my-2 border-t-2 border-neo-ink" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 font-bold text-neo-accent hover:bg-neo-accent hover:text-white transition-colors duration-100"
                        >
                          <svg className="w-4 h-4 mr-3 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          LOGOUT
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="neo-btn-primary"
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <div className="sm:hidden">
        {isHomePage ? (
          /* Home page header with search and location */
          <nav className="bg-neo-canvas border-b-4 border-neo-ink sticky top-0 z-50">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-neo-accent border-4 border-neo-ink flex items-center justify-center rotate-3">
                    <span className="font-black text-xl">W</span>
                  </div>
                  <span className="text-2xl font-black uppercase -rotate-1">genx</span>
                </Link>

                <div className="flex items-center space-x-4">
                  <Link to="/cart" className="relative p-2 border-2 border-transparent hover:border-neo-ink hover:bg-neo-secondary transition-all duration-100">
                    <svg className="h-6 w-6 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 neo-badge bg-neo-accent rotate-12">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {user ? (
                    <Link to="/profile" className="p-2 border-2 border-transparent hover:border-neo-ink hover:bg-neo-muted transition-all duration-100">
                      <div className="w-8 h-8 bg-neo-accent border-2 border-neo-ink flex items-center justify-center">
                        <span className="font-black text-sm">
                          {user.email?.charAt(0).toUpperCase()}
                          console.log('====================================');
                          console.log({user.email?.charAt(0).toUpperCase()});
                          console.log('====================================');
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <Link to="/login" className="neo-btn-primary text-sm px-3 py-2">
                      LOGIN
                    </Link>
                  )}
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-3">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medicines..."
                    className="neo-input w-full pl-10 pr-4 placeholder:font-bold placeholder:uppercase"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-neo-secondary transition-colors duration-100">
                    <svg className="h-5 w-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Location */}
              <div className="mt-3">
                <LocationDetector />
              </div>
            </div>
          </nav>
        ) : !isAuthPage && (
          /* Other pages - just a simple header, breadcrumbs will be shown below */
          <nav className="bg-neo-canvas border-b-4 border-neo-ink sticky top-0 z-50">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-neo-accent border-4 border-neo-ink flex items-center justify-center rotate-3">
                    <span className="font-black text-xl">W</span>
                  </div>
                  <span className="text-2xl font-black uppercase -rotate-1">genx</span>
                </Link>

                <div className="flex items-center space-x-4">
                  <Link to="/cart" className="relative p-2 border-2 border-transparent hover:border-neo-ink hover:bg-neo-secondary transition-all duration-100">
                    <svg className="h-6 w-6 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 neo-badge bg-neo-accent rotate-12">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {user ? (
                    <Link to="/profile" className="p-2 border-2 border-transparent hover:border-neo-ink hover:bg-neo-muted transition-all duration-100">
                      <div className="w-8 h-8 bg-neo-accent border-2 border-neo-ink flex items-center justify-center">
                        <span className="font-black text-sm">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <Link to="/login" className="neo-btn-primary text-sm px-3 py-2">
                      LOGIN
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-neo-canvas border-t-4 border-neo-ink z-50">
        <div className="grid grid-cols-5 h-16">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 font-bold ${
                isActive ? 'text-neo-accent bg-neo-secondary' : ''
              }`
            }
          >
            <svg className="h-5 w-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-black uppercase">HOME</span>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 font-bold ${
                isActive ? 'text-neo-accent bg-neo-secondary' : ''
              }`
            }
          >
            <svg className="h-5 w-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs font-black uppercase">PRODUCTS</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 relative font-bold ${
                isActive ? 'text-neo-accent bg-neo-secondary' : ''
              }`
            }
          >
            <svg className="h-5 w-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 right-6 neo-badge bg-neo-accent text-xs rotate-12">
                {cartCount}
              </span>
            )}
            <span className="text-xs font-black uppercase">CART</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 font-bold ${
                isActive ? 'text-neo-accent bg-neo-secondary' : ''
              }`
            }
          >
            <svg className="h-5 w-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs font-black uppercase">ORDERS</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 font-bold ${
                isActive ? 'text-neo-accent bg-neo-secondary' : ''
              }`
            }
          >
            <svg className="h-5 w-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-black uppercase">PROFILE</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}