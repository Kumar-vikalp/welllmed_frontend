import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { Pill, Eye, EyeOff, Star, Zap, Shield } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

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
    <div className="min-h-screen bg-neo-canvas relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-neo-grid opacity-20"></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-4 sm:top-20 sm:left-10 rotate-12">
        <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-neo-accent text-neo-accent animate-spin-slow" />
      </div>
      <div className="absolute top-32 right-4 sm:top-40 sm:right-20 -rotate-12">
        <Zap className="w-8 h-8 sm:w-12 sm:h-12 fill-neo-secondary text-neo-secondary animate-bounce-slow" />
      </div>
      <div className="absolute bottom-20 left-8 sm:bottom-32 sm:left-32 rotate-45">
        <Shield className="w-4 h-4 sm:w-6 sm:h-6 fill-neo-muted text-neo-muted" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neo-secondary border-4 border-neo-ink shadow-neo flex items-center justify-center -rotate-1">
                <Pill className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3px] text-neo-ink" />
              </div>
              <span className="neo-heading-section text-neo-ink">WELLMED</span>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="neo-heading-section mb-2 rotate-1">JOIN WELLMED!</h1>
              <p className="neo-text-body text-neo-ink/80 uppercase">CREATE YOUR ACCOUNT</p>
            </motion.div>
          </div>

          {/* Signup Form */}
          <Card className="p-6 sm:p-8 -rotate-1">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block neo-text-small text-neo-ink mb-2">
                  FULL NAME *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`neo-input w-full placeholder:text-neo-ink/60 placeholder:uppercase ${
                    errors.name ? 'border-neo-accent bg-neo-accent/10' : ''
                  }`}
                  placeholder="ENTER YOUR FULL NAME"
                />
                {errors.name && (
                  <p className="neo-text-small text-neo-accent mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block neo-text-small text-neo-ink mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`neo-input w-full placeholder:text-neo-ink/60 placeholder:uppercase ${
                    errors.email ? 'border-neo-accent bg-neo-accent/10' : ''
                  }`}
                  placeholder="ENTER YOUR EMAIL"
                />
                {errors.email && (
                  <p className="neo-text-small text-neo-accent mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block neo-text-small text-neo-ink mb-2">
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
                    className={`neo-input w-full pr-12 placeholder:text-neo-ink/60 placeholder:uppercase ${
                      errors.password ? 'border-neo-accent bg-neo-accent/10' : ''
                    }`}
                    placeholder="CREATE PASSWORD"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-neo-accent/20 border-2 border-neo-ink"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[3px]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[3px]" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="neo-text-small text-neo-accent mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block neo-text-small text-neo-ink mb-2">
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
                    className={`neo-input w-full pr-12 placeholder:text-neo-ink/60 placeholder:uppercase ${
                      errors.confirmPassword ? 'border-neo-accent bg-neo-accent/10' : ''
                    }`}
                    placeholder="CONFIRM PASSWORD"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-neo-accent/20 border-2 border-neo-ink"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[3px]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[3px]" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="neo-text-small text-neo-accent mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neo-accent border-4 border-neo-ink p-3 sm:p-4 rotate-1"
                >
                  <p className="neo-text-small text-neo-ink text-center">{errors.submit}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full -rotate-1 disabled:opacity-50"
              >
                {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </Button>
            </form>
          </Card>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6 sm:mt-8"
          >
            <Card className="p-4 sm:p-6 bg-neo-accent rotate-1">
              <p className="neo-text-body text-neo-ink">
                ALREADY HAVE AN ACCOUNT?{' '}
                <Link 
                  to="/login" 
                  className="neo-text-body text-neo-ink underline hover:text-red-600 transition-colors font-black"
                >
                  SIGN IN HERE
                </Link>
              </p>
            </Card>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-8"
          >
            <Card className="p-4 sm:p-6 bg-neo-muted -rotate-1">
              <h3 className="neo-heading-sub text-center mb-3 sm:mb-4 rotate-1">JOIN 50,000+ HAPPY CUSTOMERS!</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-neo-accent border-2 border-neo-ink flex items-center justify-center rotate-12">
                    <span className="neo-text-small">✓</span>
                  </div>
                  <p className="neo-text-small">FREE DELIVERY</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-neo-secondary border-2 border-neo-ink flex items-center justify-center -rotate-12">
                    <span className="neo-text-small">✓</span>
                  </div>
                  <p className="neo-text-small">24/7 SUPPORT</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-neo-white border-2 border-neo-ink flex items-center justify-center rotate-6">
                    <span className="neo-text-small">✓</span>
                  </div>
                  <p className="neo-text-small">SECURE PAYMENTS</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-neo-accent border-2 border-neo-ink flex items-center justify-center -rotate-6">
                    <span className="neo-text-small">✓</span>
                  </div>
                  <p className="neo-text-small">EXPERT ADVICE</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}