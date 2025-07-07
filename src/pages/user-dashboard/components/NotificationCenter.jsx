import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);
  const displayNotifications = showAll ? notifications : notifications.slice(0, 3);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_scheme':
        return 'Plus';
      case 'deadline':
        return 'Clock';
      case 'document':
        return 'FileText';
      case 'approval':
        return 'CheckCircle';
      case 'rejection':
        return 'XCircle';
      case 'update':
        return 'RefreshCw';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') {
      return 'text-error-600 bg-error-50 border-error-200';
    }
    
    switch (type) {
      case 'new_scheme':
        return 'text-success-600 bg-success-50 border-success-200';
      case 'deadline':
        return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'document':
        return 'text-accent-600 bg-accent-50 border-accent-200';
      case 'approval':
        return 'text-success-600 bg-success-50 border-success-200';
      case 'rejection':
        return 'text-error-600 bg-error-50 border-error-200';
      case 'update':
        return 'text-primary-600 bg-primary-50 border-primary-200';
      default:
        return 'text-text-secondary bg-surface-100 border-border';
    }
  };

  const formatNotificationTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return notificationTime.toLocaleDateString('en-IN');
  };

  const handleMarkAsRead = (notificationId) => {
    // Handle marking notification as read
    console.log('Mark as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    // Handle marking all notifications as read
    console.log('Mark all as read');
  };

  return (
    <div className="bg-background rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Notifications
          </h2>
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="bg-error-500 text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            className="text-sm"
          >
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {displayNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              p-4 rounded-lg border transition-all duration-200
              ${notification.read 
                ? 'bg-surface-50 border-border opacity-75' :'bg-background border-border hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border
                ${getNotificationColor(notification.type, notification.priority)}
              `}>
                <Icon name={getNotificationIcon(notification.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`
                      text-sm font-medium mb-1
                      ${notification.read ? 'text-text-secondary' : 'text-text-primary'}
                    `}>
                      {notification.title}
                    </h3>
                    <p className={`
                      text-sm mb-2
                      ${notification.read ? 'text-text-tertiary' : 'text-text-secondary'}
                    `}>
                      {notification.message}
                    </p>
                    
                    {notification.actionText && (
                      <Button
                        variant="outline"
                        className="text-xs mt-2"
                        onClick={() => {/* Handle action */}}
                      >
                        {notification.actionText}
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-xs text-text-tertiary">
                      {formatNotificationTime(notification.timestamp)}
                    </span>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1"
                        aria-label="Mark as read"
                      >
                        <Icon name="Check" size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length > 3 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="text-sm"
          >
            {showAll ? 'Show Less' : `Show All (${notifications.length})`}
            <Icon 
              name={showAll ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="ml-2" 
            />
          </Button>
        </div>
      )}

      {notifications.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bell" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary">No notifications</p>
          <p className="text-sm text-text-tertiary mt-1">
            You're all caught up!
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;