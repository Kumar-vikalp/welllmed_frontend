import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { motion } from 'framer-motion';
import { Pill, Eye, EyeOff, Star, Zap } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

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
        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-neo-muted border-2 border-neo-ink"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neo-accent border-4 border-neo-ink shadow-neo flex items-center justify-center rotate-1">
                <Pill className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3px] text-neo-ink" />
              </div>
              <span className="neo-heading-section text-neo-ink">WELLMED</span>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="neo-heading-section mb-2 -rotate-1">WELCOME BACK!</h1>
              <p className="neo-text-body text-neo-ink/80 uppercase">SIGN IN TO YOUR ACCOUNT</p>
            </motion.div>
          </div>

          {/* Login Form */}
          <Card className="p-6 sm:p-8 rotate-1">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block neo-text-small text-neo-ink mb-2">
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
                  className="neo-input w-full placeholder:text-neo-ink/60 placeholder:uppercase"
                  placeholder="ENTER YOUR EMAIL"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="neo-text-small text-neo-ink">
                    PASSWORD *
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="neo-text-small text-neo-accent hover:text-red-500 transition-colors"
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
                    className="neo-input w-full pr-12 placeholder:text-neo-ink/60 placeholder:uppercase"
                    placeholder="ENTER YOUR PASSWORD"
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
              </div>
              
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neo-accent border-4 border-neo-ink p-3 sm:p-4 -rotate-1"
                >
                  <p className="neo-text-small text-neo-ink text-center">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                variant="primary"
                size="lg"
                className="w-full rotate-1 disabled:opacity-50"
              >
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </Button>
            </form>
          </Card>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6 sm:mt-8"
          >
            <Card className="p-4 sm:p-6 bg-neo-secondary -rotate-1">
              <p className="neo-text-body text-neo-ink">
                NOT A MEMBER?{' '}
                <Link 
                  to="/signup" 
                  className="neo-text-body text-neo-ink underline hover:text-red-600 transition-colors font-black"
                >
                  SIGN UP NOW
                </Link>
              </p>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-8"
          >
            <Card className="p-4 sm:p-6 bg-neo-muted rotate-1">
              <h3 className="neo-heading-sub text-center mb-3 sm:mb-4 -rotate-1">WHY CHOOSE WELLMED?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-neo-accent border-2 border-neo-ink mx-auto mb-2 flex items-center justify-center rotate-12">
                    <span className="neo-text-small">⚡</span>
                  </div>
                  <p className="neo-text-small">10 MIN DELIVERY</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-neo-secondary border-2 border-neo-ink mx-auto mb-2 flex items-center justify-center -rotate-12">
                    <span className="neo-text-small">✓</span>
                  </div>
                  <p className="neo-text-small">100% AUTHENTIC</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-neo-white border-2 border-neo-ink mx-auto mb-2 flex items-center justify-center rotate-6">
                    <span className="neo-text-small">💰</span>
                  </div>
                  <p className="neo-text-small">BEST PRICES</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}