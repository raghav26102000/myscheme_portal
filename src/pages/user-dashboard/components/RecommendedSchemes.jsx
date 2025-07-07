import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedSchemes = ({ schemes }) => {
  return (
    <div className="bg-background rounded-lg border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={18} className="text-accent-foreground" />
          </div>
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Recommended for You
          </h2>
        </div>
        <Link to="/scheme-search-and-browse">
          <Button variant="outline" className="text-sm">
            View All
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`
                px-2 py-1 rounded-md text-xs font-medium
                ${scheme.category === 'Agriculture' ? 'bg-success-100 text-success-700' :
                  scheme.category === 'Education' ? 'bg-primary-100 text-primary-700' :
                  scheme.category === 'Healthcare'? 'bg-error-100 text-error-700' : 'bg-secondary-100 text-secondary-700'}
              `}>
                {scheme.category}
              </div>
              <div className="flex items-center space-x-1 text-xs text-text-secondary">
                <Icon name="Zap" size={12} className="text-accent-500" />
                <span>{scheme.matchScore}% match</span>
              </div>
            </div>

            <h3 className="font-heading font-semibold text-text-primary mb-2 line-clamp-2">
              {scheme.name}
            </h3>
            
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {scheme.description}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="IndianRupee" size={14} />
                <span>Up to ₹{scheme.maxBenefit.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-success-600">
                <Icon name="CheckCircle" size={12} />
                <span>Eligible</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Link to={`/scheme-detail-page?id=${scheme.id}`} className="flex-1">
                <Button variant="primary" className="w-full text-sm">
                  View Details
                </Button>
              </Link>
              <Button
                variant="outline"
                className="px-3"
                onClick={() => {/* Handle bookmark */}}
                aria-label="Bookmark scheme"
              >
                <Icon name="Bookmark" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSchemes;