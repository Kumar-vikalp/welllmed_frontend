import React, { useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBanner({
  title = "New Release",
  message = "Stream the latest blockbusters now available in 4K HDR quality!",
  ctaText = "Explore Now",
  ctaLink = "#",
  onDismiss
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  // Animation variants for staggered entry
  const containerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        when: "beforeChildren", 
        staggerChildren: 0.1 
      }
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-[100] px-4 pt-4"
        >
          <div className="mx-auto max-w-7xl relative overflow-hidden bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
            
            {/* Top accent glow line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              
              <div className="flex items-center gap-3 min-w-0">
                {/* 1. Animated Icon */}
                <motion.div variants={itemVariants} className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Sparkles size={16} />
                </motion.div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 overflow-hidden">
                  {/* 2. Animated Tag */}
                  <motion.span 
                    variants={itemVariants}
                    className="text-[10px] uppercase tracking-[0.15em] font-black text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded w-fit whitespace-nowrap"
                  >
                    {title}
                  </motion.span>
                  
                  {/* 3. Animated Message */}
                  <motion.p 
                    variants={itemVariants}
                    className="text-sm text-gray-300 font-medium truncate sm:whitespace-normal"
                  >
                    {message}
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* 4. Animated CTA (Hidden on Mobile) */}
                <motion.div variants={itemVariants} className="hidden sm:block">
                  <a
                    href={ctaLink}
                    className="group flex items-center gap-2 text-sm font-bold text-white hover:text-purple-300 transition-colors whitespace-nowrap"
                  >
                    {ctaText}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

                <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

                {/* 5. Dismiss Button (Always Visible) */}
                <button
                  onClick={handleDismiss}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all active:scale-90"
                  aria-label="Dismiss"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}