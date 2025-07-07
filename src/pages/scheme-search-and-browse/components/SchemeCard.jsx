import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AnimatedCard from '../../../components/animation/AnimatedCard';

const SchemeCard = ({ scheme, onBookmark, onQuickCheck, onShare, index = 0 }) => {
  const [isBookmarked, setIsBookmarked] = useState(scheme?.isBookmarked || false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(scheme?.id, !isBookmarked);
  };

  const handleQuickCheck = () => {
    onQuickCheck?.(scheme?.id);
  };

  const handleShare = () => {
    onShare?.(scheme);
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return 'No deadline';
    const date = new Date(deadline);
    const now = new Date();
    const timeDiff = date - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return 'Expired';
    if (daysDiff === 0) return 'Today';
    if (daysDiff === 1) return 'Tomorrow';
    if (daysDiff <= 7) return `${daysDiff} days left`;
    return date.toLocaleDateString();
  };

  const getDeadlineColor = (deadline) => {
    if (!deadline) return 'text-text-secondary';
    const date = new Date(deadline);
    const now = new Date();
    const timeDiff = date - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return 'text-error';
    if (daysDiff <= 7) return 'text-warning';
    return 'text-success';
  };

  return (
    <AnimatedCard 
      animationDelay={index * 0.1}
      className="relative overflow-hidden group"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: 'translateZ(-5px)' }}
      />
      
      <div className="bg-surface/90 backdrop-blur-sm border border-border/50 rounded-xl p-6 relative z-10 shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <motion.h3 
              className="text-lg font-heading font-semibold text-text-primary mb-1 line-clamp-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {scheme?.name || 'Scheme Name'}
            </motion.h3>
            <motion.p 
              className="text-sm text-text-secondary font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {scheme?.department || 'Department Name'}
            </motion.p>
          </div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className="ml-2 p-2 hover:bg-primary/10 rounded-full"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Icon 
                name={isBookmarked ? 'Bookmark' : 'BookmarkCheck'} 
                size={18}
                className={isBookmarked ? 'text-primary' : 'text-text-secondary'}
              />
            </Button>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p 
          className={`text-sm text-text-secondary mb-4 leading-relaxed ${
            isExpanded ? '' : 'line-clamp-3'
          }`}
          layout
          transition={{ duration: 0.3 }}
        >
          {scheme?.description || 'This scheme provides various benefits to eligible citizens. Apply now to avail the benefits and improve your quality of life.'}
        </motion.p>

        {scheme?.description && scheme.description.length > 150 && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="text"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 p-0 mb-4"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </Button>
          </motion.div>
        )}

        {/* Eligibility Highlights */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Eligibility Highlights:</h4>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {scheme?.eligibilityHighlights?.map((highlight, index) => (
              <motion.span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-medium border border-primary/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon name="Check" size={12} className="mr-1" />
                {highlight}
              </motion.span>
            )) || (
              <>
                <motion.span 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-medium border border-primary/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Icon name="Check" size={12} className="mr-1" />
                  Age 18-65
                </motion.span>
                <motion.span 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-medium border border-primary/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Icon name="Check" size={12} className="mr-1" />
                  Indian Citizen
                </motion.span>
                <motion.span 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-medium border border-primary/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Icon name="Check" size={12} className="mr-1" />
                  Income Below ₹5L
                </motion.span>
              </>
            )}
          </motion.div>
        </div>

        {/* Deadline */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Application Deadline:</span>
            <span className={`text-sm font-medium ${getDeadlineColor(scheme?.deadline)}`}>
              {formatDeadline(scheme?.deadline)}
            </span>
          </div>
        </motion.div>

        {/* Benefits Preview */}
        {scheme?.benefits && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-sm font-medium text-text-primary mb-2">Key Benefits:</h4>
            <ul className="space-y-1">
              {scheme.benefits.slice(0, 2).map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Icon name="ArrowRight" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div 
          className="flex items-center justify-between pt-4 border-t border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="sm"
                onClick={handleQuickCheck}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 transform transition-all duration-200"
              >
                <Icon name="UserCheck" size={16} />
                <span>Quick Check</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transform transition-all duration-200"
              >
                <Icon name="Share2" size={16} />
                <span>Share</span>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex items-center space-x-2 text-xs text-text-secondary"
            whileHover={{ scale: 1.05 }}
          >
            <Icon name="Users" size={14} />
            <span>{scheme?.applicants || '1.2K'} applied</span>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedCard>
  );
};

export default SchemeCard;