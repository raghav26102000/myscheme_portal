import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = ({ count = 5, className = '' }) => {
  const elements = Array.from({ length: count }, (_, i) => i);

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2
      }
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {elements.map((_, index) => (
        <motion.div
          key={index}
          variants={floatingVariants}
          animate="animate"
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `translateZ(${Math.random() * 100}px)`
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-sm" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;