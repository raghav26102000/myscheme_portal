import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationStatus = ({ applications }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'text-primary-600 bg-primary-50 border-primary-200';
      case 'under review':
        return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'approved':
        return 'text-success-600 bg-success-50 border-success-200';
      case 'rejected':
        return 'text-error-600 bg-error-50 border-error-200';
      case 'documents required':
        return 'text-accent-600 bg-accent-50 border-accent-200';
      default:
        return 'text-text-secondary bg-surface border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'Send';
      case 'under review':
        return 'Clock';
      case 'approved':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      case 'documents required':
        return 'FileText';
      default:
        return 'Circle';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 25;
      case 'under review':
        return 50;
      case 'documents required':
        return 75;
      case 'approved':
        return 100;
      case 'rejected':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-background rounded-lg border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Application Status
        </h2>
        <Button variant="outline" className="text-sm">
          View All Applications
          <Icon name="ExternalLink" size={16} className="ml-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-surface border border-border rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-text-primary mb-1">
                  {application.schemeName}
                </h3>
                <p className="text-sm text-text-secondary">
                  Application ID: {application.applicationId}
                </p>
              </div>
              <div className={`
                px-3 py-1 rounded-full text-xs font-medium border
                ${getStatusColor(application.status)}
              `}>
                <div className="flex items-center space-x-1">
                  <Icon name={getStatusIcon(application.status)} size={12} />
                  <span>{application.status}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">Progress</span>
                <span className="text-xs text-text-secondary">
                  {getProgressPercentage(application.status)}%
                </span>
              </div>
              <div className="w-full bg-surface-300 rounded-full h-2">
                <div
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${application.status.toLowerCase() === 'approved' ? 'bg-success-500' :
                      application.status.toLowerCase() === 'rejected'? 'bg-error-500' : 'bg-primary-500'}
                  `}
                  style={{ width: `${getProgressPercentage(application.status)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>Applied: {application.appliedDate}</span>
                </div>
                {application.deadline && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>Deadline: {application.deadline}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                {application.nextAction && (
                  <Button variant="primary" className="text-sm">
                    {application.nextAction}
                  </Button>
                )}
                <Button variant="outline" className="text-sm">
                  View Details
                </Button>
              </div>
            </div>

            {application.message && (
              <div className="mt-3 p-3 bg-surface-100 rounded-md">
                <p className="text-sm text-text-secondary">
                  <Icon name="Info" size={14} className="inline mr-2" />
                  {application.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationStatus;