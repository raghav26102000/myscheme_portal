import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const InteractiveOrb = ({ 
  size = 150, 
  colors = ['#2D5A27', '#FF8C42', '#22C55E'],
  className = '',
  ...props 
}) => {
  const orbRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-300, 300], [30, -30]);
  const rotateY = useTransform(xSpring, [-300, 300], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbRef.current) return;
      
      const rect = orbRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      setMousePosition({ x: mouseX, y: mouseY });
      
      if (isHovered) {
        x.set(mouseX);
        y.set(mouseY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, x, y]);

  return (
    <motion.div
      ref={orbRef}
      className={`relative cursor-pointer ${className}`}
      style={{
        width: size,
        height: size,
        perspective: '1000px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      <motion.div
        className="w-full h-full rounded-full relative overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: `linear-gradient(135deg, ${colors.join(', ')})`
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Glossy effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
            transform: 'translateZ(10px)'
          }}
        />
        
        {/* Inner glow */}
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%)',
            transform: 'translateZ(5px)'
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles inside */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/50 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              transform: 'translateZ(15px)'
            }}
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default InteractiveOrb;