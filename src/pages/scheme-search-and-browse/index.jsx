import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import FilterChips from './components/FilterChips';
import ResultsHeader from './components/ResultsHeader';
import SchemeCard from './components/SchemeCard';
import SkeletonCard from './components/SkeletonCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SchemeSearchAndBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    categories: [],
    ageRange: 'all',
    incomeRange: 'all',
    gender: 'all',
    state: '',
    areaType: '',
    sortBy: 'relevance'
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Sample data for demonstration
  const sampleSchemes = [
    {
      id: 1,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      department: 'Ministry of Agriculture & Farmers Welfare',
      description: 'Crop insurance scheme providing financial support to farmers suffering crop loss/damage arising out of unforeseen events. The scheme aims to stabilize the income of farmers and encourage them to adopt innovative practices.',
      eligibilityHighlights: ['Age 18-65', 'Indian Citizen', 'Farmer', 'Land Owner'],
      deadline: '2024-06-30',
      benefits: ['Crop loss coverage up to 90%', 'Premium subsidy provided', 'Quick claim settlement'],
      applicants: '2.3M',
      isBookmarked: false
    },
    {
      id: 2,
      name: 'National Scholarship Portal',
      department: 'Ministry of Education',
      description: 'Comprehensive scholarship scheme for students from various backgrounds including SC/ST, minorities, and economically weaker sections. Supports education from school to higher education levels.',
      eligibilityHighlights: ['Student', 'Merit Based', 'Income < ₹2.5L', 'Indian Citizen'],
      deadline: '2024-05-15',
      benefits: ['Up to ₹1 lakh annually', 'Direct bank transfer', 'Renewal based on performance'],
      applicants: '1.8M',
      isBookmarked: true
    },
    {
      id: 3,
      name: 'Ayushman Bharat Yojana',
      department: 'Ministry of Health & Family Welfare',
      description: 'World\'s largest health insurance scheme providing coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
      eligibilityHighlights: ['BPL Family', 'SECC Database', 'Rural/Urban Poor', 'No Age Limit'],
      deadline: null,
      benefits: ['₹5 lakh coverage per family', 'Cashless treatment', 'Pre-existing conditions covered'],
      applicants: '12.5M',
      isBookmarked: false
    },
    {
      id: 4,
      name: 'Skill India Mission',
      department: 'Ministry of Skill Development & Entrepreneurship',
      description: 'Comprehensive initiative to train over 40 crore people in India in different skills by 2025. Includes Recognition of Prior Learning (RPL) and fresh skilling programs.',
      eligibilityHighlights: ['Age 15-45', 'School Dropout OK', 'Unemployed', 'Skill Certification'],
      deadline: '2024-12-31',
      benefits: ['Free skill training', 'Certification', 'Job placement assistance', 'Stipend during training'],
      applicants: '5.2M',
      isBookmarked: false
    },
    {
      id: 5,
      name: 'Beti Bachao Beti Padhao',
      department: 'Ministry of Women & Child Development',
      description: 'Multi-sectoral scheme addressing the declining Child Sex Ratio and related issues of empowerment of women over a life-cycle continuum.',
      eligibilityHighlights: ['Girl Child', 'Any Age', 'Education Support', 'Women Empowerment'],
      deadline: '2024-03-31',
      benefits: ['Education scholarships', 'Skill development', 'Awareness programs', 'Health support'],
      applicants: '890K',
      isBookmarked: false
    },
    {
      id: 6,
      name: 'National Rural Employment Guarantee Act',
      department: 'Ministry of Rural Development',
      description: 'Provides at least 100 days of wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.',
      eligibilityHighlights: ['Rural Resident', 'Adult', 'Manual Work', 'Job Card Required'],
      deadline: null,
      benefits: ['100 days guaranteed work', 'Minimum wage', 'Local employment', 'Asset creation'],
      applicants: '8.7M',
      isBookmarked: true
    }
  ];

  // Initialize search query from URL
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query, filters);
    } else {
      // Load initial schemes
      setSchemes(sampleSchemes);
      setTotalResults(sampleSchemes.length);
    }
  }, []);

  // Simulated search function
  const performSearch = useCallback(async (query, appliedFilters) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredSchemes = [...sampleSchemes];
    
    // Apply search query filter
    if (query) {
      filteredSchemes = filteredSchemes.filter(scheme =>
        scheme.name.toLowerCase().includes(query.toLowerCase()) ||
        scheme.description.toLowerCase().includes(query.toLowerCase()) ||
        scheme.department.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply category filters
    if (appliedFilters.categories?.length > 0) {
      filteredSchemes = filteredSchemes.filter(scheme =>
        appliedFilters.categories.some(category =>
          scheme.name.toLowerCase().includes(category.replace('-', ' ')) ||
          scheme.description.toLowerCase().includes(category.replace('-', ' '))
        )
      );
    }
    
    // Apply sorting
    switch (appliedFilters.sortBy) {
      case 'deadline':
        filteredSchemes.sort((a, b) => {
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
        break;
      case 'popularity':
        filteredSchemes.sort((a, b) => {
          const aApplicants = parseInt(a.applicants.replace(/[^\d]/g, ''));
          const bApplicants = parseInt(b.applicants.replace(/[^\d]/g, ''));
          return bApplicants - aApplicants;
        });
        break;
      case 'name':
        filteredSchemes.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filteredSchemes.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    setSchemes(filteredSchemes);
    setTotalResults(filteredSchemes.length);
    setIsLoading(false);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
    performSearch(query, filters);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    performSearch(searchQuery, appliedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      ageRange: 'all',
      incomeRange: 'all',
      gender: 'all',
      state: '',
      areaType: '',
      sortBy: 'relevance'
    };
    setFilters(resetFilters);
    performSearch(searchQuery, resetFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    performSearch(searchQuery, updatedFilters);
  };

  const handleClearAllFilters = () => {
    handleResetFilters();
  };

  const handleSortChange = (sortBy) => {
    const updatedFilters = { ...filters, sortBy };
    setFilters(updatedFilters);
    performSearch(searchQuery, updatedFilters);
  };

  const handleSchemeBookmark = (schemeId, isBookmarked) => {
    setSchemes(prev => prev.map(scheme =>
      scheme.id === schemeId ? { ...scheme, isBookmarked } : scheme
    ));
  };

  const handleQuickCheck = (schemeId) => {
    // Simulate eligibility check
    alert(`Checking eligibility for scheme ID: ${schemeId}`);
  };

  const handleShare = (scheme) => {
    if (navigator.share) {
      navigator.share({
        title: scheme.name,
        text: scheme.description,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(
        `${scheme.name}\n\n${scheme.description}\n\nLearn more: ${window.location.href}`
      );
      alert('Scheme details copied to clipboard!');
    }
  };

  const getAppliedFiltersCount = () => {
    let count = 0;
    if (filters.categories?.length > 0) count += filters.categories.length;
    if (filters.ageRange && filters.ageRange !== 'all') count++;
    if (filters.incomeRange && filters.incomeRange !== 'all') count++;
    if (filters.gender && filters.gender !== 'all') count++;
    if (filters.state) count++;
    if (filters.areaType) count++;
    if (filters.sortBy && filters.sortBy !== 'relevance') count++;
    return count;
  };

  const loadMore = () => {
    // Simulate loading more results
    setCurrentPage(prev => prev + 1);
  };

  return (
    <>
      <Helmet>
        <title>Scheme Search and Browse | myScheme Portal</title>
        <meta name="description" content="Search and discover relevant government schemes through advanced filtering and intelligent search capabilities." />
        <meta name="keywords" content="government schemes, benefits, search, filter, browse, india" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 lg:pt-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Section */}
            <div className="py-8 border-b border-border">
              <div className="text-center mb-6">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-2">
                  Find Your Perfect Scheme
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Discover government schemes tailored to your needs with our intelligent search and filtering system
                </p>
              </div>
              
              <SearchBar
                onSearch={handleSearch}
                onFilterToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                appliedFiltersCount={getAppliedFiltersCount()}
                initialQuery={searchQuery}
              />
            </div>

            {/* Filter Chips */}
            <FilterChips
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            {/* Main Content */}
            <div className="flex gap-8 py-6">
              {/* Filter Panel - Desktop */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <FilterPanel
                  isOpen={true}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                />
              </div>

              {/* Results Section */}
              <div className="flex-1 min-w-0">
                <ResultsHeader
                  totalResults={totalResults}
                  currentQuery={searchQuery}
                  sortBy={filters.sortBy}
                  onSortChange={handleSortChange}
                  onFilterToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  appliedFiltersCount={getAppliedFiltersCount()}
                  isLoading={isLoading}
                />

                {/* Results Grid */}
                <div className="py-6">
                  {isLoading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, index) => (
                        <SkeletonCard key={index} />
                      ))}
                    </div>
                  ) : schemes.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {schemes.map((scheme) => (
                          <SchemeCard
                            key={scheme.id}
                            scheme={scheme}
                            onBookmark={handleSchemeBookmark}
                            onQuickCheck={handleQuickCheck}
                            onShare={handleShare}
                          />
                        ))}
                      </div>

                      {/* Load More Button */}
                      {hasMore && schemes.length >= 6 && (
                        <div className="flex justify-center mt-8">
                          <Button
                            variant="outline"
                            onClick={loadMore}
                            className="flex items-center space-x-2"
                          >
                            <Icon name="ChevronDown" size={18} />
                            <span>Load More Schemes</span>
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="SearchX" size={48} className="text-text-secondary mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                        No schemes found
                      </h3>
                      <p className="text-text-secondary mb-4">
                        Try adjusting your search query or filters to find relevant schemes
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setSearchQuery('');
                          handleResetFilters();
                        }}
                      >
                        Clear Search & Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </div>
    </>
  );
};

export default SchemeSearchAndBrowse;