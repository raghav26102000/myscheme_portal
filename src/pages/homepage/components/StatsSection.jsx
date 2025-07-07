import React from 'react';
import { motion } from 'framer-motion';
import AnimatedStats from '../../../components/animation/AnimatedStats';
import InteractiveOrb from '../../../components/animation/InteractiveOrb';

const StatsSection = () => {
  const stats = [
    {
      icon: '📊',
      value: '3600+',
      label: 'Government Schemes'
    },
    {
      icon: '👥',
      value: '50L+',
      label: 'Citizens Served'
    },
    {
      icon: '🎯',
      value: '95%',
      label: 'Success Rate'
    },
    {
      icon: '⚡',
      value: '24/7',
      label: 'AI Support'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-surface-200 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10">
          <InteractiveOrb size={80} colors={['#2D5A27', '#22C55E']} />
        </div>
        <div className="absolute bottom-20 right-20">
          <InteractiveOrb size={120} colors={['#FF8C42', '#F59E0B']} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <InteractiveOrb size={60} colors={['#8B4513', '#E7A367']} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-heading font-bold text-text-primary mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Empowering Citizens Across India
          </motion.h2>
          <motion.p 
            className="text-xl text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover the impact we're making together in transforming access to government services
          </motion.p>
        </motion.div>

        {/* Animated Stats Grid */}
        <AnimatedStats stats={stats} />

        {/* Additional Interactive Elements */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="inline-block bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 10px 30px rgba(45,90,39,0.3)' 
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join millions of satisfied citizens today!
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;