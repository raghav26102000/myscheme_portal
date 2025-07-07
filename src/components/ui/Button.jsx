import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  animated = true,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-600 focus:ring-secondary-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary-500',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary-500',
    text: 'text-primary hover:text-primary-600 focus:ring-primary-500',
    danger: 'bg-error text-error-foreground hover:bg-error-600 focus:ring-error-500 shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (animated) {
    return (
      <motion.button
        className={classes}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
        whileTap={disabled ? {} : { scale: 0.98, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;