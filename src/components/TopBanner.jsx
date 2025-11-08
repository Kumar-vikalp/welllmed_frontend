import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBanner({
  title = "New Release 🎬",
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative isolate overflow-hidden bg-gradient-to-r from-primaryBtn/20 to-accentBlue/20 backdrop-blur-sm border border-primaryBtn/30 rounded-2xl mx-4 lg:mx-[120px] mt-4 lg:mt-0"
        >
          <div
            aria-hidden="true"
            className="absolute left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)"
              }}
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-primaryBtn to-accentBlue opacity-30"
            />
          </div>

          <div className="flex items-center justify-center gap-4 px-2 py-2 sm:px-4 sm:py-3 text-white text-sm relative  bg-gradient-to-l from-[#a21caf] via-[#be185d] to-[#b91c1c]">
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-center whitespace-nowrap overflow-hidden text-ellipsis">
              <p className="font-semibold text-xs sm:text-sm truncate">{title}</p>

              <span className="hidden sm:inline">•</span>

              <p className="text-xs sm:text-sm truncate">{message}</p>
            </div>

            <a
              href={ctaLink}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3.5 py-1 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition-all duration-200 border border-white/20 whitespace-nowrap"
            >
              {ctaText} <span aria-hidden="true">→</span>
            </a>

            <button
              type="button"
              onClick={handleDismiss}
              className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 ml-2"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
