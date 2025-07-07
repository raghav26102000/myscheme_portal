import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const quickActions = [
    {
      id: 'eligibility-checker',
      title: 'Check Eligibility',
      description: 'Find schemes you qualify for',
      icon: 'CheckCircle',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      link: '/scheme-search-and-browse?tab=eligibility'
    },
    {
      id: 'search-schemes',
      title: 'Search Schemes',
      description: 'Browse all available schemes',
      icon: 'Search',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      link: '/scheme-search-and-browse'
    },
    {
      id: 'update-profile',
      title: 'Update Profile',
      description: 'Keep your information current',
      icon: 'User',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
      link: '/user-dashboard?tab=profile'
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      description: 'Get personalized help',
      icon: 'Bot',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-200',
      link: '/ai-chatbot-interface'
    }
  ];

  return (
    <div className="bg-background rounded-lg border border-border p-6 mb-8">
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            to={action.link}
            className="block group"
          >
            <div className={`
              ${action.bgColor} ${action.borderColor} border rounded-lg p-4
              hover:shadow-md transition-all duration-200 group-hover:scale-105
            `}>
              <div className={`
                w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-3
                border ${action.borderColor}
              `}>
                <Icon name={action.icon} size={24} className={action.color} />
              </div>
              
              <h3 className="font-heading font-semibold text-text-primary mb-1">
                {action.title}
              </h3>
              
              <p className="text-sm text-text-secondary">
                {action.description}
              </p>
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  Get Started
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-primary-600 group-hover:text-primary-700 group-hover:translate-x-1 transition-transform duration-200" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;