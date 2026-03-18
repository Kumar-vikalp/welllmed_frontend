import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  // If someone lands here directly without an order, redirect them home.
  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Floating Decorative Elements - Stars and Shapes */}
      <div className="absolute top-10 left-10 rotate-12">
        <div className="w-8 h-8 bg-[#FFD93D] border-4 border-black animate-spin-slow"></div>
      </div>
      <div className="absolute top-20 right-20 -rotate-12">
        <div className="w-6 h-6 bg-[#FF6B6B] border-2 border-black animate-bounce"></div>
      </div>
      <div className="absolute bottom-20 left-20 rotate-45">
        <div className="w-10 h-10 bg-[#C4B5FD] border-4 border-black"></div>
      </div>
      <div className="absolute bottom-32 right-32 -rotate-12">
        <div className="text-4xl font-black">★</div>
      </div>
      <div className="absolute top-32 left-1/4 rotate-45">
        <div className="text-2xl font-black">★</div>
      </div>
      <div className="absolute bottom-40 right-1/4 -rotate-45">
        <div className="text-3xl font-black">★</div>
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        {/* Success Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-32 h-32 sm:w-40 sm:h-40 bg-black border-8 border-black shadow-[12px_12px_0px_0px_#000] mx-auto mb-8 flex items-center justify-center -rotate-3"
        >
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-white stroke-[6px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* Success Message */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 rotate-1"
        >
          ORDER CONFIRMED!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="bg-[#FFD93D] border-4 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_#000] -rotate-1 inline-block mb-4">
            <p className="font-bold uppercase tracking-wide text-base sm:text-lg">THANK YOU FOR YOUR PURCHASE!</p>
          </div>
          
          {/* Order ID */}
          <div className="bg-white border-4 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_#000] rotate-1 inline-block">
            <p className="font-bold uppercase tracking-wide text-sm mb-2">YOUR ORDER ID IS:</p>
            <p className="font-black text-xl sm:text-2xl uppercase tracking-tight text-[#FF6B6B]">{orderId}</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/orders"
            className="bg-[#FF6B6B] border-4 border-black font-black uppercase tracking-widest 
              text-sm px-6 py-4 h-14 w-full sm:w-auto inline-block text-center
              shadow-[6px_6px_0px_0px_#000]
              hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
              active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
              transition-all duration-100 rotate-1"
          >
            VIEW MY ORDERS
          </Link>
          <Link
            to="/"
            className="bg-white border-4 border-black font-black uppercase tracking-widest 
              text-sm px-6 py-4 h-14 w-full sm:w-auto inline-block text-center
              shadow-[6px_6px_0px_0px_#000]
              hover:bg-[#C4B5FD] hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px]
              active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
              transition-all duration-100 -rotate-1"
          >
            CONTINUE SHOPPING
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8"
        >
          <div className="bg-[#C4B5FD] border-4 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_#000] rotate-1">
            <h3 className="font-black uppercase tracking-widest text-sm mb-3">WHAT HAPPENS NEXT?</h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-black border-2 border-black flex items-center justify-center text-white font-black text-xs">1</div>
                <span className="font-bold uppercase tracking-wide text-sm">WE PREPARE YOUR ORDER</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-black border-2 border-black flex items-center justify-center text-white font-black text-xs">2</div>
                <span className="font-bold uppercase tracking-wide text-sm">QUALITY CHECK & PACKAGING</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-black border-2 border-black flex items-center justify-center text-white font-black text-xs">3</div>
                <span className="font-bold uppercase tracking-wide text-sm">FAST DELIVERY TO YOUR DOOR</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}