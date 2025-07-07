import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onApplyFilters, onResetFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const categories = [
    { id: 'agriculture', label: 'Agriculture', icon: 'Wheat' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'healthcare', label: 'Healthcare', icon: 'Heart' },
    { id: 'employment', label: 'Employment', icon: 'Briefcase' },
    { id: 'housing', label: 'Housing', icon: 'Home' },
    { id: 'social-welfare', label: 'Social Welfare', icon: 'Users' },
    { id: 'financial', label: 'Financial Aid', icon: 'DollarSign' },
    { id: 'women', label: 'Women Empowerment', icon: 'User' },
    { id: 'elderly', label: 'Elderly Care', icon: 'Users' },
    { id: 'disability', label: 'Disability Support', icon: 'Heart' },
  ];

  const ageRanges = [
    { id: 'all', label: 'All Ages' },
    { id: '18-25', label: '18-25 years' },
    { id: '26-35', label: '26-35 years' },
    { id: '36-45', label: '36-45 years' },
    { id: '46-60', label: '46-60 years' },
    { id: '60+', label: '60+ years' },
  ];

  const incomeRanges = [
    { id: 'all', label: 'All Income Levels' },
    { id: '0-100000', label: 'Below ₹1 Lakh' },
    { id: '100001-300000', label: '₹1-3 Lakhs' },
    { id: '300001-500000', label: '₹3-5 Lakhs' },
    { id: '500001-1000000', label: '₹5-10 Lakhs' },
    { id: '1000001+', label: 'Above ₹10 Lakhs' },
  ];

  const genderOptions = [
    { id: 'all', label: 'All Genders' },
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'other', label: 'Other' },
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'deadline', label: 'Deadline (Earliest First)' },
    { id: 'popularity', label: 'Most Popular' },
    { id: 'name', label: 'Alphabetical' },
    { id: 'newest', label: 'Newest First' },
  ];

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleApply = () => {
    onApplyFilters?.(localFilters);
    onClose?.();
  };

  const handleReset = () => {
    const resetFilters = {};
    setLocalFilters(resetFilters);
    onResetFilters?.();
  };

  const getActiveFiltersCount = () => {
    return Object.values(localFilters).filter(value => 
      value && value !== 'all' && value !== ''
    ).length;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div className={`
        fixed top-16 left-0 h-full w-80 bg-surface border-r border-border z-50 overflow-y-auto transform transition-transform duration-300 lg:relative lg:top-0 lg:transform-none lg:w-full lg:max-w-xs
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Filters
            </h2>
            <div className="flex items-center space-x-2">
              {getActiveFiltersCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="lg:hidden p-2"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
          </div>

          {/* Search within filters */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Search in categories
            </label>
            <Input
              type="search"
              placeholder="Search categories..."
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                  <Input
                    type="checkbox"
                    checked={localFilters.categories?.includes(category.id)}
                    onChange={(e) => {
                      const currentCategories = localFilters.categories || [];
                      const newCategories = e.target.checked
                        ? [...currentCategories, category.id]
                        : currentCategories.filter(id => id !== category.id);
                      handleFilterChange('categories', newCategories);
                    }}
                  />
                  <Icon name={category.icon} size={16} className="text-text-secondary group-hover:text-primary" />
                  <span className="text-sm text-text-primary group-hover:text-primary">
                    {category.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Age Range</h3>
            <div className="space-y-2">
              {ageRanges.map((range) => (
                <label key={range.id} className="flex items-center space-x-3 cursor-pointer">
                  <Input
                    type="radio"
                    name="ageRange"
                    value={range.id}
                    checked={localFilters.ageRange === range.id}
                    onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                  />
                  <span className="text-sm text-text-primary">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Income Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Annual Income</h3>
            <div className="space-y-2">
              {incomeRanges.map((range) => (
                <label key={range.id} className="flex items-center space-x-3 cursor-pointer">
                  <Input
                    type="radio"
                    name="incomeRange"
                    value={range.id}
                    checked={localFilters.incomeRange === range.id}
                    onChange={(e) => handleFilterChange('incomeRange', e.target.value)}
                  />
                  <span className="text-sm text-text-primary">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Gender</h3>
            <div className="space-y-2">
              {genderOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                  <Input
                    type="radio"
                    name="gender"
                    value={option.id}
                    checked={localFilters.gender === option.id}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Location</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">State</label>
                <select 
                  className="w-full p-2 border border-border rounded-md text-sm"
                  value={localFilters.state || ''}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                >
                  <option value="">All States</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CG">Chhattisgarh</option>
                  <option value="DL">Delhi</option>
                  <option value="GA">Goa</option>
                  <option value="GJ">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JK">Jammu and Kashmir</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TS">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="UK">Uttarakhand</option>
                  <option value="WB">West Bengal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-text-secondary mb-1">Area Type</label>
                <select 
                  className="w-full p-2 border border-border rounded-md text-sm"
                  value={localFilters.areaType || ''}
                  onChange={(e) => handleFilterChange('areaType', e.target.value)}
                >
                  <option value="">All Areas</option>
                  <option value="rural">Rural</option>
                  <option value="urban">Urban</option>
                  <option value="semi-urban">Semi-Urban</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                  <Input
                    type="radio"
                    name="sortBy"
                    value={option.id}
                    checked={localFilters.sortBy === option.id}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-4 border-t border-border">
            <Button
              variant="primary"
              fullWidth
              onClick={handleApply}
              className="flex items-center justify-center space-x-2"
            >
              <Icon name="Filter" size={16} />
              <span>Apply Filters</span>
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={handleReset}
              className="flex items-center justify-center space-x-2"
            >
              <Icon name="RefreshCw" size={16} />
              <span>Reset All</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;