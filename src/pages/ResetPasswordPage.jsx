import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import Toast from '../components/Toast';
import { Pill, Eye, EyeOff, Star, Zap, Shield } from 'lucide-react';

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({ email: '', otp: '', new_password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const { resetPassword } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 25, label: 'WEAK' };
    if (password.length < 8) return { strength: 50, label: 'FAIR' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 100, label: 'STRONG' };
    }
    return { strength: 75, label: 'GOOD' };
  };

  const passwordStrength = getPasswordStrength(formData.new_password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password.length < 6) {
      setToast({ message: 'PASSWORD MUST BE AT LEAST 6 CHARACTERS LONG.', type: 'error' });
      return;
    }
    
    setLoading(true);
    setToast({ message: '', type: 'info' });

    try {
      const response = await resetPassword(formData.email, formData.otp, formData.new_password);
      setToast({ message: (response.message || 'PASSWORD HAS BEEN RESET SUCCESSFULLY! REDIRECTING TO LOGIN...').toUpperCase(), type: 'success' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errorMessage = (err.response?.data?.detail || 'FAILED TO RESET PASSWORD. PLEASE CHECK YOUR DETAILS AND TRY AGAIN.').toUpperCase();
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] relative overflow-hidden">
      <Toast message={toast.message} type={toast.type} duration={5000} />
      
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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <div className="bg-[#FF6B6B] border-4 border-black p-4 shadow-[6px_6px_0px_0px_#000] rotate-1 flex items-center gap-3">
                <Pill className="w-8 h-8 stroke-[3px] text-white" />
                <span className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  WELLMED
                </span>
              </div>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 -rotate-1">
              RESET PASSWORD
            </h2>
            <div className="bg-[#FFD93D] border-4 border-black shadow-[4px_4px_0px_0px_#000] p-4 rotate-1 inline-block">
              <p className="font-bold uppercase tracking-wide text-sm">
                ENTER YOUR EMAIL, OTP, AND NEW PASSWORD
              </p>
            </div>
          </div>

          {/* Reset Form */}
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] p-6 sm:p-8 -rotate-1 overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-black uppercase tracking-widest text-xs mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-4 border-black bg-white font-bold text-base h-14 px-4
                    placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                    focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                    focus-visible:outline-none focus-visible:ring-0
                    transition-all duration-100"
                  placeholder="YOUR EMAIL ADDRESS"
                />
              </div>

              {/* OTP Field */}
              <div>
                <label htmlFor="otp" className="block font-black uppercase tracking-widest text-xs mb-2">
                  OTP CODE *
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full border-4 border-black bg-white font-bold text-base h-14 px-4
                    placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                    focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                    focus-visible:outline-none focus-visible:ring-0
                    transition-all duration-100"
                  placeholder="OTP FROM EMAIL"
                />
              </div>

              {/* New Password Field */}
              <div>
                <label htmlFor="new_password" className="block font-black uppercase tracking-widest text-xs mb-2">
                  NEW PASSWORD *
                </label>
                <div className="relative">
                  <input
                    id="new_password"
                    name="new_password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.new_password}
                    onChange={handleChange}
                    className="w-full border-4 border-black bg-white font-bold text-base h-14 px-4 pr-16
                      placeholder:text-black/40 placeholder:font-bold placeholder:uppercase
                      focus-visible:bg-[#FFD93D] focus-visible:shadow-[4px_4px_0px_0px_#000]
                      focus-visible:outline-none focus-visible:ring-0
                      transition-all duration-100"
                    placeholder="NEW PASSWORD"
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

                {/* Password Strength Indicator */}
                {formData.new_password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black uppercase tracking-widest text-xs">PASSWORD STRENGTH</span>
                      <span className={`font-black uppercase tracking-widest text-xs px-2 py-1 border-2 border-black ${
                        passwordStrength.strength === 100 ? 'bg-[#FFD93D]' :
                        passwordStrength.strength >= 75 ? 'bg-[#C4B5FD]' :
                        passwordStrength.strength >= 50 ? 'bg-[#FFD93D]' : 'bg-[#FF6B6B] text-white'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-white border-4 border-black h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.strength === 100 ? 'bg-[#FFD93D]' :
                          passwordStrength.strength >= 75 ? 'bg-[#C4B5FD]' :
                          passwordStrength.strength >= 50 ? 'bg-[#FFD93D]' : 'bg-[#FF6B6B]'
                        }`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
                  text-sm py-4 h-14 disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-[6px_6px_0px_0px_#000]
                  hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                  active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                  transition-all duration-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white mr-2 animate-spin"></div>
                    RESETTING PASSWORD...
                  </div>
                ) : (
                  'RESET PASSWORD'
                )}
              </button>
            </form>
          </div>

          {/* Back to Login Link */}
          <div className="text-center mt-8">
            <div className="bg-[#C4B5FD] border-4 border-black p-4 shadow-[6px_6px_0px_0px_#000] rotate-1">
              <p className="font-bold uppercase tracking-wide text-sm">
                REMEMBERED YOUR PASSWORD?{' '}
                <Link 
                  to="/login" 
                  className="font-black underline decoration-4 underline-offset-4 hover:text-[#FF6B6B] transition-colors"
                >
                  BACK TO LOGIN
                </Link>
              </p>
            </div>
          </div>

          {/* Security Tips */}
          <div className="mt-8">
            <div className="bg-black border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 -rotate-1">
              <h3 className="font-black uppercase tracking-widest text-sm text-white mb-4 border-b-2 border-white pb-2">
                PASSWORD SECURITY TIPS
              </h3>
              <div className="space-y-2 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD93D]"></div>
                  <span className="font-bold text-sm uppercase">USE AT LEAST 8 CHARACTERS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD93D]"></div>
                  <span className="font-bold text-sm uppercase">INCLUDE UPPERCASE & LOWERCASE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD93D]"></div>
                  <span className="font-bold text-sm uppercase">ADD NUMBERS & SYMBOLS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD93D]"></div>
                  <span className="font-bold text-sm uppercase">AVOID COMMON WORDS</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}