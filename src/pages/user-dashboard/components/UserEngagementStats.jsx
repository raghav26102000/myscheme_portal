import React from 'react';
import Icon from '../../../components/AppIcon';

const UserEngagementStats = ({ engagementData }) => {
  const { 
    totalSchemeViews, 
    searchesPerformed, 
    bookmarksAdded, 
    applicationsSubmitted,
    timeSpentMinutes,
    favoriteCategories 
  } = engagementData;

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const engagementStats = [
    {
      label: 'Schemes Viewed',
      value: totalSchemeViews,
      icon: 'Eye',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      label: 'Searches Made',
      value: searchesPerformed,
      icon: 'Search',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50'
    },
    {
      label: 'Bookmarks',
      value: bookmarksAdded,
      icon: 'Bookmark',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50'
    },
    {
      label: 'Applications',
      value: applicationsSubmitted,
      icon: 'FileText',
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    }
  ];

  return (
    <div className="bg-background rounded-lg border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
        Your Activity Overview
      </h2>

      {/* Engagement Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {engagementStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg p-4 text-center`}
          >
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2 border border-opacity-20`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-xs text-text-secondary font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Time Spent */}
      <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center border border-warning-200">
            <Icon name="Clock" size={20} className="text-warning-600" />
          </div>
          <div>
            <div className="text-lg font-bold text-warning-600">
              {formatTime(timeSpentMinutes)}
            </div>
            <div className="text-sm text-text-secondary">
              Time spent exploring
            </div>
          </div>
        </div>
        <div className="text-xs text-text-tertiary">
          This month
        </div>
      </div>

      {/* Favorite Categories */}
      <div>
        <h3 className="font-heading font-medium text-text-primary mb-3">
          Your Favorite Categories
        </h3>
        <div className="space-y-2">
          {favoriteCategories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-surface-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-200">
                  <Icon 
                    name={
                      category.name === 'Agriculture' ? 'Wheat' :
                      category.name === 'Education' ? 'GraduationCap' :
                      category.name === 'Healthcare' ? 'Heart' :
                      category.name === 'Employment' ? 'Briefcase' :
                      category.name === 'Women & Child'? 'Users' : 'Circle'
                    } 
                    size={16} 
                    className="text-primary-600" 
                  />
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {category.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-text-secondary">
                  {category.viewCount} views
                </div>
                <div className="w-16 bg-surface-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${(category.viewCount / Math.max(...favoriteCategories.map(c => c.viewCount))) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {favoriteCategories.length === 0 && (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="BarChart3" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary">No activity data yet</p>
          <p className="text-sm text-text-tertiary mt-1">
            Start exploring schemes to see your activity patterns
          </p>
        </div>
      )}
    </div>
  );
};

export default UserEngagementStats;