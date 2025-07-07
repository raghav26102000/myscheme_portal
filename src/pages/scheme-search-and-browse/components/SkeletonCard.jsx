import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 bg-border rounded-md mb-2 w-3/4"></div>
          <div className="h-4 bg-border rounded-md w-1/2"></div>
        </div>
        <div className="ml-2 w-8 h-8 bg-border rounded-md"></div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-border rounded-md w-full"></div>
        <div className="h-4 bg-border rounded-md w-full"></div>
        <div className="h-4 bg-border rounded-md w-2/3"></div>
      </div>

      {/* Eligibility Tags */}
      <div className="mb-4">
        <div className="h-4 bg-border rounded-md w-32 mb-2"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-border rounded-full w-20"></div>
          <div className="h-6 bg-border rounded-full w-24"></div>
          <div className="h-6 bg-border rounded-full w-28"></div>
        </div>
      </div>

      {/* Deadline */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-border rounded-full"></div>
          <div className="h-4 bg-border rounded-md w-32"></div>
          <div className="h-4 bg-border rounded-md w-20"></div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-4">
        <div className="h-4 bg-border rounded-md w-24 mb-2"></div>
        <div className="space-y-1">
          <div className="flex items-start space-x-2">
            <div className="w-3 h-3 bg-border rounded-full mt-0.5"></div>
            <div className="h-4 bg-border rounded-md w-full"></div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-3 h-3 bg-border rounded-full mt-0.5"></div>
            <div className="h-4 bg-border rounded-md w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 bg-border rounded-md w-24"></div>
          <div className="h-8 bg-border rounded-md w-20"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-border rounded-full"></div>
          <div className="h-4 bg-border rounded-md w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;