import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { Pill, Eye, EyeOff, Star, Zap, Shield } from 'lucide-react';
import api from '../api/axiosConfig';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Send the correct format to the API
      await api.post('/signup/', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      // Then login
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        setErrors(errorData);
      } else {
        setErrors({ submit: error.message || 'Failed to create account' });
      }
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
      <div className="absolute top-10 right-4 sm:top-20 sm:right-10 rotate-12">
        <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-[#FF6B6B] text-[#FF6B6B] animate-spin-slow" />
      </div>
      <div className="absolute top-32 left-4 sm:top-40 sm:left-20 -rotate-12">
        <Zap className="w-8 h-8 sm:w-12 sm:h-12 fill-[#FFD93D] text-[#FFD93D] animate-bounce" />
      </div>
      <div className="absolute bottom-20 right-8 sm:bottom-32 sm:right-32 rotate-45">
        <Shield className="w-6 h-6 sm:w-10 sm:h-10 fill-[#C4B5FD] text-[#C4B5FD]" />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="bg-[#FFD93D] border-4 border-black p-3 shadow-[6px_6px_0px_0px_#000] -rotate-1">
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
                className="text-3xl sm:text-4xl font-black mb-4 uppercase tracking-tight text-black rotate-1"
              >
                JOIN WELLMED!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-bold text-black/80 uppercase tracking-wide"
              >
                CREATE YOUR ACCOUNT
              </motion.p>
            </div>

            {/* Signup Form */}
            <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] -rotate-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block font-black uppercase tracking-widest text-xs text-black mb-2">
                    FULL NAME *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border-4 border-black bg-white font-bold text-base h-14 px-4
                      placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                      focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                      focus-visible:outline-none focus-visible:ring-0
                      transition-all duration-100 ${
                        errors.name ? 'border-[#FF6B6B] bg-[#FF6B6B]/10' : ''
                      }`}
                    placeholder="ENTER YOUR FULL NAME"
                  />
                  {errors.name && (
                    <p className="font-bold text-xs text-[#FF6B6B] mt-1 uppercase">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block font-black uppercase tracking-widest text-xs text-black mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border-4 border-black bg-white font-bold text-base h-14 px-4
                      placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                      focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                      focus-visible:outline-none focus-visible:ring-0
                      transition-all duration-100 ${
                        errors.email ? 'border-[#FF6B6B] bg-[#FF6B6B]/10' : ''
                      }`}
                    placeholder="ENTER YOUR EMAIL"
                  />
                  {errors.email && (
                    <p className="font-bold text-xs text-[#FF6B6B] mt-1 uppercase">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block font-black uppercase tracking-widest text-xs text-black mb-2">
                    PASSWORD *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full border-4 border-black bg-white font-bold text-base h-14 px-4 pr-16
                        placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                        focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                        focus-visible:outline-none focus-visible:ring-0
                        transition-all duration-100 ${
                          errors.password ? 'border-[#FF6B6B] bg-[#FF6B6B]/10' : ''
                        }`}
                      placeholder="CREATE PASSWORD"
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
                  {errors.password && (
                    <p className="font-bold text-xs text-[#FF6B6B] mt-1 uppercase">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block font-black uppercase tracking-widest text-xs text-black mb-2">
                    CONFIRM PASSWORD *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full border-4 border-black bg-white font-bold text-base h-14 px-4 pr-16
                        placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                        focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                        focus-visible:outline-none focus-visible:ring-0
                        transition-all duration-100 ${
                          errors.confirmPassword ? 'border-[#FF6B6B] bg-[#FF6B6B]/10' : ''
                        }`}
                      placeholder="CONFIRM PASSWORD"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black p-2
                        hover:bg-[#C4B5FD] transition-colors duration-100"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 stroke-[3px] text-black" />
                      ) : (
                        <Eye className="w-4 h-4 stroke-[3px] text-black" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="font-bold text-xs text-[#FF6B6B] mt-1 uppercase">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FF6B6B] border-4 border-black p-4 rotate-1"
                  >
                    <p className="font-bold text-sm text-white text-center uppercase">{errors.submit}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FFD93D] border-4 border-black font-black uppercase tracking-widest text-sm py-4 h-14
                    shadow-[6px_6px_0px_0px_#000]
                    hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                    active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-100 -rotate-1"
                >
                  {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                </button>
              </form>
            </div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-8"
            >
              <div className="bg-[#FF6B6B] border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] rotate-1">
                <p className="font-bold text-white uppercase tracking-wide">
                  ALREADY HAVE AN ACCOUNT?{' '}
                  <Link 
                    to="/login" 
                    className="font-black text-white underline decoration-4 underline-offset-4 hover:text-[#FFD93D] transition-colors duration-100"
                  >
                    SIGN IN HERE
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Benefits (Mobile Only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="lg:hidden mt-8"
            >
              <div className="bg-[#C4B5FD] border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] -rotate-1">
                <h3 className="font-black uppercase tracking-widest text-sm text-center mb-4 rotate-1">
                  JOIN 50,000+ HAPPY CUSTOMERS!
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#FF6B6B] border-2 border-black w-6 h-6 flex items-center justify-center rotate-12">
                      <span className="font-black text-xs text-white">✓</span>
                    </div>
                    <p className="font-black uppercase tracking-widest text-xs">FREE DELIVERY</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#FFD93D] border-2 border-black w-6 h-6 flex items-center justify-center -rotate-12">
                      <span className="font-black text-xs text-black">✓</span>
                    </div>
                    <p className="font-black uppercase tracking-widest text-xs">24/7 SUPPORT</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-white border-2 border-black w-6 h-6 flex items-center justify-center rotate-6">
                      <span className="font-black text-xs text-black">✓</span>
                    </div>
                    <p className="font-black uppercase tracking-widest text-xs">SECURE PAYMENTS</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#FF6B6B] border-2 border-black w-6 h-6 flex items-center justify-center -rotate-6">
                      <span className="font-black text-xs text-white">✓</span>
                    </div>
                    <p className="font-black uppercase tracking-widest text-xs">EXPERT ADVICE</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Branding (Desktop) / Hidden on Mobile */}
        <div className="hidden lg:flex lg:w-1/2 bg-black border-l-4 border-black items-center justify-center p-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-[#FF6B6B] border-4 border-white p-8 shadow-[12px_12px_0px_0px_#fff] -rotate-3">
                <Pill className="w-20 h-20 stroke-[4px] text-white mx-auto" />
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
              JOIN THE HEALTHCARE REVOLUTION
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 space-y-4"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-[#FFD93D] border-2 border-white p-2">
                  <span className="text-black font-black text-sm">🚀</span>
                </div>
                <span className="text-white font-bold uppercase text-sm">FASTEST DELIVERY</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-[#C4B5FD] border-2 border-white p-2">
                  <span className="text-black font-black text-sm">🏆</span>
                </div>
                <span className="text-white font-bold uppercase text-sm">PREMIUM QUALITY</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-[#FF6B6B] border-2 border-white p-2">
                  <span className="text-white font-black text-sm">💝</span>
                </div>
                <span className="text-white font-bold uppercase text-sm">TRUSTED BY 50K+</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}