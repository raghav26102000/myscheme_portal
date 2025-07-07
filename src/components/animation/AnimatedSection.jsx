import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  className = '', 
  animationType = 'fadeUp',
  delay = 0,
  ...props 
}) => {
  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay, ease: [0.175, 0.885, 0.32, 1.275] }
    },
    slideIn: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay, ease: "easeOut" }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, delay, ease: "easeOut" }
    },
    flip: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
      transition: { duration: 0.8, delay, ease: "easeOut" }
    }
  };

  const selectedAnimation = animations[animationType] || animations.fadeUp;

  return (
    <motion.div
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={selectedAnimation.transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;