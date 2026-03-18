import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, type = 'info', duration = 4000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const typeStyles = {
    success: 'bg-[#C4B5FD] border-black',
    error: 'bg-[#FF6B6B] border-black text-white',
    info: 'bg-[#FFD93D] border-black',
    warning: 'bg-[#FFD93D] border-black'
  };

  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`fixed top-4 left-1/2 z-50 px-4 sm:px-6 py-3 sm:py-4 border-4 shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] max-w-sm sm:max-w-md ${typeStyles[type]}`}
        >
          <p className="font-black text-xs sm:text-sm uppercase tracking-wide text-center">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}