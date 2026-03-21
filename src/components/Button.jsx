import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-black uppercase tracking-wide transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-neo-ink focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'neo-btn-primary',
    secondary: 'neo-btn-secondary', 
    outline: 'neo-btn-outline',
    ghost: 'border-2 border-transparent hover:border-neo-ink hover:bg-neo-canvas hover:shadow-neo-sm text-neo-ink font-black uppercase tracking-wide px-4 py-2 focus:ring-2 focus:ring-neo-ink focus:ring-offset-2'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm h-10',
    default: 'px-6 py-3 text-sm h-12',
    lg: 'px-8 py-4 text-base h-14',
    xl: 'px-10 py-5 text-lg h-16'
  };

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.default;

  return (
    <motion.button
      ref={ref}
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} focus:ring-2 focus:ring-neo-ink focus:ring-offset-2 ${className}`}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;