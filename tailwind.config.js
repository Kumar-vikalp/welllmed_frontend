/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'neo': ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'], // Make Space Grotesk the default
      },
      colors: {
        // Neo-brutalism core palette
        'neo': {
          'canvas': '#FFFDF5',    // Cream background
          'ink': '#000000',       // Pure black
          'accent': '#FF6B6B',    // Hot red
          'secondary': '#FFD93D', // Vivid yellow
          'muted': '#C4B5FD',     // Soft violet
        },
        // Keep existing colors for gradual migration
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        yellow: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      boxShadow: {
        // Neo-brutalist hard shadows
        'neo-sm': '4px 4px 0px 0px #000',
        'neo': '8px 8px 0px 0px #000',
        'neo-lg': '12px 12px 0px 0px #000',
        'neo-xl': '16px 16px 0px 0px #000',
        'neo-2xl': '20px 20px 0px 0px #000',
        // White shadows for dark backgrounds
        'neo-white': '8px 8px 0px 0px #fff',
        'neo-white-lg': '12px 12px 0px 0px #fff',
      },
      textShadow: {
        'neo': '4px 4px 0px #000',
        'neo-lg': '6px 6px 0px #000',
      },
      backgroundImage: {
        // Neo-brutalist patterns
        'neo-dots': 'radial-gradient(#000 1.5px, transparent 1.5px)',
        'neo-grid': 'linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        'neo-noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'%2F%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'neo-dots': '20px 20px',
        'neo-grid': '40px 40px',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        // Text stroke utilities for neo-brutalist display text
        '.text-stroke': {
          '-webkit-text-stroke': '2px black',
          'color': 'transparent',
        },
        '.text-stroke-white': {
          '-webkit-text-stroke': '2px white',
          'color': 'transparent',
        },
        // Button push effect
        '.btn-push': {
          'transition': 'transform 100ms ease-linear',
        },
        '.btn-push:active': {
          'transform': 'translate(4px, 4px)',
          'box-shadow': 'none',
        },
        // Card lift effect
        '.card-lift': {
          'transition': 'transform 200ms ease-out, box-shadow 200ms ease-out',
        },
        '.card-lift:hover': {
          'transform': 'translateY(-8px)',
          'box-shadow': '12px 20px 0px 0px #000',
        },
        // Text shadow utilities
        '.text-shadow-neo': {
          'text-shadow': '4px 4px 0px #000',
        },
        '.text-shadow-neo-lg': {
          'text-shadow': '6px 6px 0px #000',
        },
      }
      addUtilities(newUtilities)
    })
  ],
}