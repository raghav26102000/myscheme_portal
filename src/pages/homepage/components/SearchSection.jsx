import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchRef = useRef(null);

  const mockSuggestions = [
    { id: 1, text: "PM-KISAN Scheme", category: "Agriculture", icon: "Wheat" },
    { id: 2, text: "Ayushman Bharat", category: "Healthcare", icon: "Heart" },
    { id: 3, text: "Pradhan Mantri Mudra Yojana", category: "Business", icon: "Briefcase" },
    { id: 4, text: "National Scholarship Portal", category: "Education", icon: "GraduationCap" },
    { id: 5, text: "Beti Bachao Beti Padhao", category: "Women Empowerment", icon: "Users" },
    { id: 6, text: "Pradhan Mantri Awas Yojana", category: "Housing", icon: "Home" },
    { id: 7, text: "Skill India Mission", category: "Employment", icon: "Briefcase" },
    { id: 8, text: "Jan Aushadhi Scheme", category: "Healthcare", icon: "Pill" }
  ];

  const popularSearches = [
    "Education scholarships",
    "Farmer schemes",
    "Women empowerment",
    "Healthcare benefits",
    "Business loans",
    "Housing schemes"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestion(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    // Navigate to search results
    window.location.href = `/scheme-search-and-browse?q=${encodeURIComponent(suggestion.text)}`;
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/scheme-search-and-browse?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handlePopularSearch = (query) => {
    setSearchQuery(query);
    window.location.href = `/scheme-search-and-browse?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="bg-background py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
            Find the Right Scheme for You
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Search from 3600+ government schemes using scheme names, categories, or keywords
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8" ref={searchRef}>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search schemes by name, category, or benefits..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              className="w-full pl-12 pr-20 py-4 text-lg border-2 border-border focus:border-primary rounded-xl shadow-base"
            />
            <Icon 
              name="Search" 
              size={24} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <Button
              variant="primary"
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2"
            >
              Search
            </Button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-3 text-left hover:bg-surface transition-colors duration-200 flex items-center space-x-3 ${
                    index === selectedSuggestion ? 'bg-surface' : ''
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                    <Icon name={suggestion.icon} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary font-medium truncate">
                      {suggestion.text}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {suggestion.category}
                    </p>
                  </div>
                  <Icon name="ArrowUpRight" size={16} className="text-text-secondary" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Popular Searches */}
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-4 font-caption">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handlePopularSearch(search)}
                className="text-sm px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/scheme-search-and-browse'}
            className="p-6 h-auto flex flex-col items-center space-y-3 hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
              <Icon name="Search" size={24} className="text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-text-primary">Browse All Schemes</h3>
              <p className="text-sm text-text-secondary">Explore by categories</p>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.href = '/user-dashboard'}
            className="p-6 h-auto flex flex-col items-center space-y-3 hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-12 h-12 bg-accent-50 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-accent" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-text-primary">Check Eligibility</h3>
              <p className="text-sm text-text-secondary">Find schemes you qualify for</p>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.href = '/ai-chatbot-interface'}
            className="p-6 h-auto flex flex-col items-center space-y-3 hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-12 h-12 bg-secondary-50 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={24} className="text-secondary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-text-primary">Ask AI Assistant</h3>
              <p className="text-sm text-text-secondary">Get personalized help</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;