import React, { useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from './Button';

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
          <div className="mx-auto max-w-7xl relative overflow-hidden bg-neo-ink border-4 border-neo-ink shadow-[8px_8px_0px_0px_#000]">
            
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-neo-accent" />

            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              
              <div className="flex items-center gap-3 min-w-0">
                {/* 1. Animated Icon */}
                <motion.div variants={itemVariants} className="hidden md:flex h-10 w-10 items-center justify-center bg-neo-accent border-4 border-white text-white">
                  <Sparkles size={20} className="stroke-[3px]" />
                </motion.div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 overflow-hidden">
                  {/* 2. Animated Tag */}
                  <motion.span 
                    variants={itemVariants}
                    className="neo-badge bg-neo-secondary text-neo-ink rotate-1 whitespace-nowrap"
                  >
                    {title}
                  </motion.span>
                  
                  {/* 3. Animated Message */}
                  <motion.p 
                    variants={itemVariants}
                    className="text-sm text-white font-bold uppercase tracking-wide truncate sm:whitespace-normal"
                  >
                    {message}
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* 4. Animated CTA (Hidden on Mobile) */}
                <motion.div variants={itemVariants} className="hidden sm:block">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rotate-1"
                    onClick={() => window.open(ctaLink, '_blank')}
                  >
                    {ctaText}
                    <ArrowRight size={16} className="ml-2 stroke-[3px]" />
                  </Button>
                </motion.div>

                <div className="h-6 w-1 bg-white mx-1 hidden sm:block" />

                {/* 5. Dismiss Button (Always Visible) */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="border-2 border-white text-white hover:bg-white hover:text-neo-ink -rotate-1"
                  onClick={handleDismiss}
                  aria-label="Dismiss"
                >
                  <X size={18} className="stroke-[3px]" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}