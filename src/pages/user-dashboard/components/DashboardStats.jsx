import React from 'react';
import { motion } from 'framer-motion';

import AnimatedStats from '../../../components/animation/AnimatedStats';

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      id: 'applications',
      label: 'Applications in Progress',
      value: stats?.applicationsInProgress || 0,
      icon: '📄',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200'
    },
    {
      id: 'approved',
      label: 'Approved Schemes',
      value: stats?.approvedSchemes || 0,
      icon: '✅',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200'
    },
    {
      id: 'bookmarks',
      label: 'Saved Bookmarks',
      value: stats?.savedBookmarks || 0,
      icon: '🔖',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200'
    },
    {
      id: 'matches',
      label: 'Eligibility Matches',
      value: stats?.eligibilityMatches || 0,
      icon: '🎯',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-200'
    }
  ];

  return (
    <div className="mb-8">
      <motion.h2 
        className="text-xl font-heading font-semibold text-text-primary mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Dashboard Overview
      </motion.h2>
      
      <AnimatedStats 
        stats={statItems}
        className="grid-cols-2 lg:grid-cols-4"
      />
    </div>
  );
};

export default DashboardStats;