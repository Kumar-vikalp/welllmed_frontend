import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Card = forwardRef(({ 
  children, 
  className = '',
  variant = 'default',
  hover = true,
  rotation = 0,
  ...props 
}, ref) => {
  const baseClasses = 'neo-card';
  
  const variants = {
    default: 'bg-white',
    accent: 'bg-neo-accent',
    secondary: 'bg-neo-secondary',
    muted: 'bg-neo-muted',
    black: 'bg-neo-ink text-white border-white'
  };
  
  const variantClasses = variants[variant] || variants.default;
  const hoverClasses = hover ? 'card-lift' : '';
  const rotationClass = rotation !== 0 ? (rotation > 0 ? `rotate-${Math.abs(rotation)}` : `-rotate-${Math.abs(rotation)}`) : '';

  return (
    <motion.div
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${hoverClasses} ${rotationClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;