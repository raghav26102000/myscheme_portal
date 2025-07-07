import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsHeader = ({ 
  totalResults, 
  currentQuery, 
  sortBy, 
  onSortChange, 
  onFilterToggle, 
  appliedFiltersCount,
  isLoading 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'deadline', label: 'Deadline', icon: 'Clock' },
    { value: 'popularity', label: 'Popular', icon: 'TrendingUp' },
    { value: 'name', label: 'A-Z', icon: 'ArrowUpDown' },
    { value: 'newest', label: 'Newest', icon: 'Calendar' },
  ];

  const formatResultsCount = (count) => {
    if (count === 0) return 'No results found';
    if (count === 1) return '1 result found';
    if (count < 1000) return `${count} results found`;
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K results found`;
    return `${(count / 1000000).toFixed(1)}M results found`;
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 py-4 border-b border-border">
      {/* Results Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin">
                <Icon name="Loader2" size={16} className="text-primary" />
              </div>
              <span className="text-sm text-text-secondary">Searching...</span>
            </div>
          ) : (
            <>
              <Icon name="Search" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">
                {formatResultsCount(totalResults)}
              </span>
            </>
          )}
        </div>
        
        {currentQuery && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">for</span>
            <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
              "{currentQuery}"
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterToggle}
          className="lg:hidden flex items-center space-x-2"
        >
          <Icon name="Filter" size={16} />
          <span>Filters</span>
          {appliedFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {appliedFiltersCount}
            </span>
          )}
        </Button>

        {/* Sort Dropdown */}
        <div className="relative">
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-text-primary focus:outline-none focus:ring-0 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Options */}
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm text-text-secondary">View:</span>
          <div className="flex items-center border border-border rounded-md">
            <button
              className="p-2 hover:bg-primary/10 rounded-l-md transition-colors"
              title="Grid view"
            >
              <Icon name="Grid3X3" size={16} className="text-text-secondary" />
            </button>
            <button
              className="p-2 hover:bg-primary/10 rounded-r-md transition-colors border-l border-border"
              title="List view"
            >
              <Icon name="List" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Export Results */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden lg:flex items-center space-x-2"
          title="Export results"
        >
          <Icon name="Download" size={16} />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
};

export default ResultsHeader;