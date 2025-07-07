import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedCard from '../../../components/animation/AnimatedCard';

const CategoryGrid = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'education',
      title: 'Education',
      icon: '🎓',
      count: '450+',
      color: 'from-blue-500 to-blue-600',
      description: 'Scholarships, skill development, and educational support'
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      icon: '🏥',
      count: '320+',
      color: 'from-green-500 to-green-600',
      description: 'Medical insurance, health programs, and wellness initiatives'
    },
    {
      id: 'employment',
      title: 'Employment',
      icon: '💼',
      count: '280+',
      color: 'from-purple-500 to-purple-600',
      description: 'Job creation, skill training, and employment opportunities'
    },
    {
      id: 'agriculture',
      title: 'Agriculture',
      icon: '🌾',
      count: '380+',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Farming support, crop insurance, and agricultural loans'
    },
    {
      id: 'housing',
      title: 'Housing',
      icon: '🏠',
      count: '200+',
      color: 'from-red-500 to-red-600',
      description: 'Affordable housing, home loans, and urban development'
    },
    {
      id: 'social-welfare',
      title: 'Social Welfare',
      icon: '🤝',
      count: '500+',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Social security, disability support, and welfare programs'
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/scheme-search-and-browse?category=${category.id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
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
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Explore Scheme Categories
          </motion.h2>
          <motion.p 
            className="text-xl text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Find the perfect government scheme for your needs across various sectors
          </motion.p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <AnimatedCard
              key={category.id}
              animationDelay={index * 0.1}
              hoverScale={1.08}
              hoverRotate={3}
              className="cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="relative p-8 bg-surface rounded-2xl border border-border/50 shadow-lg overflow-hidden group">
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  style={{ transform: 'translateZ(-5px)' }}
                />
                
                {/* Icon */}
                <motion.div
                  className="text-6xl mb-4 text-center"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {category.icon}
                </motion.div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <motion.h3 
                    className="text-2xl font-heading font-bold text-text-primary mb-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {category.title}
                  </motion.h3>
                  
                  <motion.div 
                    className="text-sm font-semibold text-primary mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {category.count} schemes available
                  </motion.div>
                  
                  <motion.p 
                    className="text-text-secondary text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {category.description}
                  </motion.p>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ transform: 'translateZ(5px)' }}
                />

                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        x: [0, 5, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;