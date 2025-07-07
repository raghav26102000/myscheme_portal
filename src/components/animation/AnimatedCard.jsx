import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  className = '', 
  hoverScale = 1.05, 
  hoverRotate = 5,
  animationDelay = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 50,
        rotateX: 15,
        scale: 0.9
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        scale: 1
      }}
      transition={{ 
        duration: 0.8,
        delay: animationDelay,
        ease: [0.175, 0.885, 0.32, 1.275]
      }}
      whileHover={{
        scale: hoverScale,
        rotateY: hoverRotate,
        z: 50,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{
        scale: 0.95,
        rotateY: -hoverRotate,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }}
      className={`
        transform-gpu perspective-1000 
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;