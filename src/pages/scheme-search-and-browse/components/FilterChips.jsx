import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ filters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // Categories
    if (filters?.categories?.length > 0) {
      filters.categories.forEach(category => {
        chips.push({
          id: `category-${category}`,
          label: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
          type: 'categories',
          value: category,
          icon: 'Tag'
        });
      });
    }

    // Age Range
    if (filters?.ageRange && filters.ageRange !== 'all') {
      chips.push({
        id: 'age-range',
        label: `Age: ${filters.ageRange}`,
        type: 'ageRange',
        value: filters.ageRange,
        icon: 'User'
      });
    }

    // Income Range
    if (filters?.incomeRange && filters.incomeRange !== 'all') {
      const incomeLabels = {
        '0-100000': 'Below ₹1L',
        '100001-300000': '₹1-3L',
        '300001-500000': '₹3-5L',
        '500001-1000000': '₹5-10L',
        '1000001+': 'Above ₹10L'
      };
      chips.push({
        id: 'income-range',
        label: `Income: ${incomeLabels[filters.incomeRange]}`,
        type: 'incomeRange',
        value: filters.incomeRange,
        icon: 'DollarSign'
      });
    }

    // Gender
    if (filters?.gender && filters.gender !== 'all') {
      chips.push({
        id: 'gender',
        label: `Gender: ${filters.gender.charAt(0).toUpperCase() + filters.gender.slice(1)}`,
        type: 'gender',
        value: filters.gender,
        icon: 'Users'
      });
    }

    // State
    if (filters?.state) {
      const stateLabels = {
        'AP': 'Andhra Pradesh',
        'AR': 'Arunachal Pradesh',
        'AS': 'Assam',
        'BR': 'Bihar',
        'CG': 'Chhattisgarh',
        'DL': 'Delhi',
        'GA': 'Goa',
        'GJ': 'Gujarat',
        'HR': 'Haryana',
        'HP': 'Himachal Pradesh',
        'JK': 'Jammu and Kashmir',
        'JH': 'Jharkhand',
        'KA': 'Karnataka',
        'KL': 'Kerala',
        'MP': 'Madhya Pradesh',
        'MH': 'Maharashtra',
        'MN': 'Manipur',
        'ML': 'Meghalaya',
        'MZ': 'Mizoram',
        'NL': 'Nagaland',
        'OR': 'Odisha',
        'PB': 'Punjab',
        'RJ': 'Rajasthan',
        'SK': 'Sikkim',
        'TN': 'Tamil Nadu',
        'TS': 'Telangana',
        'TR': 'Tripura',
        'UP': 'Uttar Pradesh',
        'UK': 'Uttarakhand',
        'WB': 'West Bengal'
      };
      chips.push({
        id: 'state',
        label: `State: ${stateLabels[filters.state] || filters.state}`,
        type: 'state',
        value: filters.state,
        icon: 'MapPin'
      });
    }

    // Area Type
    if (filters?.areaType) {
      chips.push({
        id: 'area-type',
        label: `Area: ${filters.areaType.charAt(0).toUpperCase() + filters.areaType.slice(1)}`,
        type: 'areaType',
        value: filters.areaType,
        icon: 'Map'
      });
    }

    // Sort By
    if (filters?.sortBy && filters.sortBy !== 'relevance') {
      const sortLabels = {
        'deadline': 'Deadline',
        'popularity': 'Popular',
        'name': 'A-Z',
        'newest': 'Newest'
      };
      chips.push({
        id: 'sort-by',
        label: `Sort: ${sortLabels[filters.sortBy]}`,
        type: 'sortBy',
        value: filters.sortBy,
        icon: 'ArrowUpDown'
      });
    }

    return chips;
  };

  const handleRemoveFilter = (chip) => {
    if (chip.type === 'categories') {
      const updatedCategories = filters.categories.filter(cat => cat !== chip.value);
      onRemoveFilter?.('categories', updatedCategories);
    } else {
      onRemoveFilter?.(chip.type, chip.type === 'sortBy' ? 'relevance' : '');
    }
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3 py-4">
      <div className="flex items-center space-x-2">
        <Icon name="Filter" size={18} className="text-text-secondary" />
        <span className="text-sm font-medium text-text-primary">Active Filters:</span>
      </div>
      
      <div className="flex items-center space-x-2 flex-wrap">
        {chips.map((chip) => (
          <div
            key={chip.id}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20"
          >
            <Icon name={chip.icon} size={14} />
            <span>{chip.label}</span>
            <button
              onClick={() => handleRemoveFilter(chip)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${chip.label} filter`}
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
        
        {chips.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-text-secondary hover:text-error text-sm px-2 py-1"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;