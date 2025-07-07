import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      id: 'applications',
      label: 'Applications in Progress',
      value: stats.applicationsInProgress,
      icon: 'FileText',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200'
    },
    {
      id: 'approved',
      label: 'Approved Schemes',
      value: stats.approvedSchemes,
      icon: 'CheckCircle',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200'
    },
    {
      id: 'bookmarks',
      label: 'Saved Bookmarks',
      value: stats.savedBookmarks,
      icon: 'Bookmark',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200'
    },
    {
      id: 'matches',
      label: 'Eligibility Matches',
      value: stats.eligibilityMatches,
      icon: 'Target',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => (
        <div
          key={item.id}
          className={`
            ${item.bgColor} ${item.borderColor} border rounded-lg p-4 
            hover:shadow-md transition-shadow duration-200
          `}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`
              w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center
              border ${item.borderColor}
            `}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
            <span className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </span>
          </div>
          <p className="text-sm text-text-secondary font-medium">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;