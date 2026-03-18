import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import Toast from '../components/Toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const { forgotPassword } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ message: '', type: 'info' });

    try {
      const response = await forgotPassword(email);
      setToast({ message: response.message || 'OTP sent successfully! Redirecting...', type: 'success' });
      
      setTimeout(() => {
        navigate('/reset-password');
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'An error occurred. Please try again.';
      setToast({ message: errorMessage, type: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-4 relative overflow-hidden">
      <Toast message={toast.message} type={toast.type} duration={5000} />
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-4 sm:top-20 sm:left-10 rotate-12">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#FF6B6B] border-2 border-black animate-spin-slow"></div>
      </div>
      <div className="absolute top-32 right-4 sm:top-40 sm:right-20 -rotate-12">
        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#FFD93D] border-2 border-black animate-bounce"></div>
      </div>
      <div className="absolute bottom-20 left-8 sm:bottom-32 sm:left-32 rotate-45">
        <div className="w-6 h-6 sm:w-10 sm:h-10 bg-[#C4B5FD] border-2 border-black"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <div className="bg-[#FFD93D] border-4 border-black p-4 shadow-[6px_6px_0px_0px_#000] -rotate-1">
              <span className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                genx
              </span>
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 rotate-1">
            FORGOT PASSWORD?
          </h2>
          <p className="font-bold uppercase tracking-wide text-sm sm:text-base">
            NO PROBLEM. ENTER YOUR EMAIL AND WE'LL SEND YOU AN OTP TO RESET IT.
          </p>
        </div>

        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] p-6 sm:p-8 -rotate-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest mb-2">
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
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD93D] border-4 border-black font-black uppercase tracking-widest 
                text-sm py-4 h-14 disabled:opacity-50 disabled:cursor-not-allowed
                shadow-[6px_6px_0px_0px_#000]
                hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
                active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                transition-all duration-100"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black mr-2 animate-spin"></div>
                  SENDING OTP...
                </div>
              ) : (
                'SEND RESET OTP'
              )}
            </button>
          </form>
        </div>

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
      </motion.div>
    </div>
  );
}