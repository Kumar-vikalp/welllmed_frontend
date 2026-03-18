import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { motion } from 'framer-motion';
import { Pill, Eye, EyeOff, Star, Zap, Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-4 sm:top-20 sm:left-10 rotate-12">
        <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-[#FF6B6B] text-[#FF6B6B] animate-spin-slow" />
      </div>
      <div className="absolute top-32 right-4 sm:top-40 sm:right-20 -rotate-12">
        <Zap className="w-8 h-8 sm:w-12 sm:h-12 fill-[#FFD93D] text-[#FFD93D] animate-bounce" />
      </div>
      <div className="absolute bottom-20 left-8 sm:bottom-32 sm:left-32 rotate-45">
        <Shield className="w-6 h-6 sm:w-10 sm:h-10 fill-[#C4B5FD] text-[#C4B5FD]" />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding (Desktop) / Hidden on Mobile */}
        <div className="hidden lg:flex lg:w-1/2 bg-black border-r-4 border-black items-center justify-center p-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-[#FFD93D] border-4 border-white p-8 shadow-[12px_12px_0px_0px_#fff] rotate-3">
                <Pill className="w-20 h-20 stroke-[4px] text-black mx-auto" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-black uppercase tracking-tight text-white mb-4"
              style={{ WebkitTextStroke: '2px white', color: 'transparent' }}
            >
              WELLMED
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-bold text-white uppercase tracking-wide"
            >
              YOUR HEALTH, OUR PRIORITY
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 space-y-4"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-[#FF6B6B] border-2 border-white p-2">
                  <span className="text-white font-black text-sm">⚡</span>
                </div>
                <span className="text-white font-bold uppercase text-sm">10 MIN DELIVERY</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-[#C4B5FD] border-2 border-white p-2">
                  <span className="text-black font-black text-sm">✓</span>
                </div>
                <span className="text-white font-bold uppercase text-sm">100% AUTHENTIC</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-[#FFD93D] border-2 border-white p-2">
                  <span className="text-black font-black text-sm">💰</span>
                </div>
                <span className="text-white font-bold uppercase text-sm">BEST PRICES</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="bg-[#FF6B6B] border-4 border-black p-3 shadow-[6px_6px_0px_0px_#000] rotate-1">
                  <Pill className="w-8 h-8 stroke-[3px] text-black" />
                </div>
                <span className="text-3xl font-black uppercase tracking-tight text-black">WELLMED</span>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl font-black mb-4 uppercase tracking-tight text-black -rotate-1"
              >
                WELCOME BACK!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-bold text-black/80 uppercase tracking-wide"
              >
                SIGN IN TO YOUR ACCOUNT
              </motion.p>
            </div>

            {/* Login Form */}
            <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] rotate-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block font-black uppercase tracking-widest text-xs text-black mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-4 border-black bg-white font-bold text-base h-14 px-4
                      placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                      focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                      focus-visible:outline-none focus-visible:ring-0
                      transition-all duration-100"
                    placeholder="ENTER YOUR EMAIL"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="font-black uppercase tracking-widest text-xs text-black">
                      PASSWORD *
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="font-bold uppercase tracking-wide text-xs text-[#FF6B6B] hover:underline hover:decoration-4 hover:underline-offset-4 transition-all duration-100"
                    >
                      FORGOT PASSWORD?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-4 border-black bg-white font-bold text-base h-14 px-4 pr-16
                        placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                        focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                        focus-visible:outline-none focus-visible:ring-0
                        transition-all duration-100"
                      placeholder="ENTER YOUR PASSWORD"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black p-2
                        hover:bg-[#C4B5FD] transition-colors duration-100"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 stroke-[3px] text-black" />
                      ) : (
                        <Eye className="w-4 h-4 stroke-[3px] text-black" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FF6B6B] border-4 border-black p-4 -rotate-1"
                  >
                    <p className="font-bold text-sm text-white text-center uppercase">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest text-sm py-4 h-14
                    shadow-[6px_6px_0px_0px_#000]
                    hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                    active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-100 rotate-1"
                >
                  {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
              </form>
            </div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-8"
            >
              <div className="bg-[#FFD93D] border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] -rotate-1">
                <p className="font-bold text-black uppercase tracking-wide">
                  NOT A MEMBER?{' '}
                  <Link 
                    to="/signup" 
                    className="font-black text-black underline decoration-4 underline-offset-4 hover:text-[#FF6B6B] transition-colors duration-100"
                  >
                    SIGN UP NOW
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Features (Mobile Only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="lg:hidden mt-8"
            >
              <div className="bg-[#C4B5FD] border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] rotate-1">
                <h3 className="font-black uppercase tracking-widest text-sm text-center mb-4 -rotate-1">
                  WHY CHOOSE WELLMED?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-[#FF6B6B] border-2 border-black w-12 h-12 mx-auto mb-2 flex items-center justify-center rotate-12">
                      <span className="font-black text-sm text-white">⚡</span>
                    </div>
                    <p className="font-black uppercase tracking-widest text-xs">10 MIN DELIVERY</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#FFD93D] border-2 border-black w-12 h-12 mx-auto mb-2 flex items-center justify-center -rotate-12">
                      <span className="font-black text-sm text-black">✓</span>
                    </div>
                    <p className="font-black uppercase tracking-widest text-xs">100% AUTHENTIC</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white border-2 border-black w-12 h-12 mx-auto mb-2 flex items-center justify-center rotate-6">
                      <span className="font-black text-sm text-black">💰</span>
                    </div>
                    <p className="font-black uppercase tracking-widest text-xs">BEST PRICES</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}