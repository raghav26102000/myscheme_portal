import React from 'react';
import { motion } from 'framer-motion';

const AnimatedStats = ({ stats, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: 45,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`grid grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {stats?.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            z: 20,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          className="relative group"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <div className="bg-gradient-to-br from-surface to-surface-200 rounded-2xl p-6 border border-border/50 shadow-lg backdrop-blur-sm">
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(45,90,39,0.1), rgba(255,140,66,0.1))',
                transform: 'translateZ(-10px)'
              }}
            />
            
            {/* Icon */}
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4"
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white font-bold text-lg">
                {stat.icon}
              </span>
            </motion.div>
            
            {/* Counter Animation */}
            <motion.div
              className="text-3xl font-bold text-text-primary mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: index * 0.1
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.span>
            </motion.div>
            
            {/* Label */}
            <motion.p
              className="text-text-secondary text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {stat.label}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedStats;