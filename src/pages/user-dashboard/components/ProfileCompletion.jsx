import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileCompletion = ({ completionData }) => {
  const { percentage, completedSections, totalSections, missingSections } = completionData;

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success-600 bg-success-500';
    if (percentage >= 60) return 'text-warning-600 bg-warning-500';
    if (percentage >= 40) return 'text-accent-600 bg-accent-500';
    return 'text-error-600 bg-error-500';
  };

  const getSectionIcon = (section) => {
    switch (section.toLowerCase()) {
      case 'personal information':
        return 'User';
      case 'contact details':
        return 'Phone';
      case 'address':
        return 'MapPin';
      case 'income details':
        return 'IndianRupee';
      case 'family information':
        return 'Users';
      case 'education':
        return 'GraduationCap';
      case 'employment':
        return 'Briefcase';
      case 'documents':
        return 'FileText';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-background rounded-lg border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Profile Completion
        </h2>
        <Link to="/user-dashboard?tab=profile">
          <Button variant="outline" className="text-sm">
            Complete Profile
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>

      {/* Progress Circle */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-surface-300"
            />
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 32}`}
              strokeDashoffset={`${2 * Math.PI * 32 * (1 - percentage / 100)}`}
              className={getCompletionColor(percentage).split(' ')[1]}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${getCompletionColor(percentage).split(' ')[0]}`}>
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-heading font-semibold text-text-primary mb-1">
            {percentage >= 80 ? 'Excellent!' : 
             percentage >= 60 ? 'Good Progress' : 
             percentage >= 40 ? 'Getting Started' : 'Just Started'}
          </h3>
          <p className="text-sm text-text-secondary mb-2">
            {completedSections} of {totalSections} sections completed
          </p>
          <p className="text-xs text-text-tertiary">
            Complete your profile to get better scheme recommendations
          </p>
        </div>
      </div>

      {/* Missing Sections */}
      {missingSections.length > 0 && (
        <div>
          <h4 className="font-heading font-medium text-text-primary mb-3">
            Complete these sections:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {missingSections.map((section, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-surface-50 rounded-lg border border-border hover:bg-surface-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-200">
                  <Icon name={getSectionIcon(section)} size={16} className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-text-primary">
                    {section}
                  </span>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-secondary" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Benefits */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Lightbulb" size={16} className="text-primary-600" />
          </div>
          <div>
            <h4 className="font-heading font-medium text-primary-700 mb-1">
              Why complete your profile?
            </h4>
            <ul className="text-sm text-primary-600 space-y-1">
              <li>• Get personalized scheme recommendations</li>
              <li>• Faster eligibility checking</li>
              <li>• Pre-filled application forms</li>
              <li>• Priority notifications for relevant schemes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;