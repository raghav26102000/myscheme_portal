import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'bookmark':
        return 'Bookmark';
      case 'view':
        return 'Eye';
      case 'search':
        return 'Search';
      case 'application':
        return 'FileText';
      case 'notification':
        return 'Bell';
      case 'profile':
        return 'User';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'bookmark':
        return 'text-primary-600 bg-primary-50';
      case 'view':
        return 'text-secondary-600 bg-secondary-50';
      case 'search':
        return 'text-accent-600 bg-accent-50';
      case 'application':
        return 'text-success-600 bg-success-50';
      case 'notification':
        return 'text-warning-600 bg-warning-50';
      case 'profile':
        return 'text-text-primary bg-surface-200';
      default:
        return 'text-text-secondary bg-surface-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-background rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Recent Activity
        </h2>
        <Button variant="outline" className="text-sm">
          View All
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-50 transition-colors duration-200"
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${getActivityColor(activity.type)}
            `}>
              <Icon name={getActivityIcon(activity.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-text-primary font-medium">
                    {activity.title}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {activity.description}
                  </p>
                  {activity.schemeName && (
                    <Link
                      to={`/scheme-detail-page?id=${activity.schemeId}`}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-1 inline-block"
                    >
                      {activity.schemeName}
                    </Link>
                  )}
                </div>
                <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary">No recent activity</p>
          <p className="text-sm text-text-tertiary mt-1">
            Start exploring schemes to see your activity here
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;