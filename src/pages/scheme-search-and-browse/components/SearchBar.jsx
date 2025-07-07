import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, appliedFiltersCount, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [isHindiEnabled, setIsHindiEnabled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Sample suggestions data
  const sampleSuggestions = [
    'Agriculture subsidies',
    'Education scholarships',
    'Healthcare benefits',
    'Employment schemes',
    'Housing assistance',
    'Women empowerment',
    'Elderly care',
    'Disability support',
    'Financial aid',
    'Rural development',
  ];

  const hindiSuggestions = [
    'कृषि सब्सिडी',
    'शिक्षा छात्रवृत्ति',
    'स्वास्थ्य लाभ',
    'रोजगार योजना',
    'आवास सहायता',
    'महिला सशक्तिकरण',
    'बुजुर्गों की देखभाल',
    'विकलांगता सहायता',
    'वित्तीय सहायता',
    'ग्रामीण विकास',
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    // Generate suggestions based on search query
    if (searchQuery.length > 0) {
      const currentSuggestions = isHindiEnabled ? hindiSuggestions : sampleSuggestions;
      const filtered = currentSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, isHindiEnabled]);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Save to recent searches
      const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      onSearch?.(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = isHindiEnabled ? 'hi-IN' : 'en-US';

    setIsVoiceSearch(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleSearch(transcript);
      setIsVoiceSearch(false);
    };

    recognition.onerror = () => {
      setIsVoiceSearch(false);
    };

    recognition.onend = () => {
      setIsVoiceSearch(false);
    };
  };

  const toggleLanguage = () => {
    setIsHindiEnabled(!isHindiEnabled);
    setSearchQuery('');
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch?.('');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-surface border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex-1 relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder={isHindiEnabled ? 'योजनाओं की खोज करें...' : 'Search for schemes, benefits, or keywords...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              className="pl-12 pr-4 py-4 text-base border-none bg-transparent focus:ring-0 placeholder:text-text-secondary"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface"
              >
                <Icon name="X" size={16} className="text-text-secondary" />
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2 px-4">
            {/* Voice Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceSearch}
              disabled={isVoiceSearch}
              className="p-2 hover:bg-primary/10"
              title="Voice search"
            >
              <Icon 
                name={isVoiceSearch ? "MicOff" : "Mic"} 
                size={18} 
                className={isVoiceSearch ? "text-error animate-pulse" : "text-text-secondary"}
              />
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="p-2 hover:bg-primary/10"
              title={isHindiEnabled ? "Switch to English" : "Switch to Hindi"}
            >
              <span className="text-sm font-medium text-text-secondary">
                {isHindiEnabled ? 'अ' : 'A'}
              </span>
            </Button>

            {/* Search Button */}
            <Button
              variant="primary"
              onClick={() => handleSearch()}
              className="px-6 py-2"
            >
              <Icon name="Search" size={18} className="mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <Button
          variant="outline"
          onClick={onFilterToggle}
          className="lg:hidden absolute right-0 top-full mt-2 flex items-center space-x-2"
        >
          <Icon name="Filter" size={18} />
          <span>Filters</span>
          {appliedFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {appliedFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (searchQuery || recentSearches.length > 0) && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {/* Recent Searches */}
          {!searchQuery && recentSearches.length > 0 && (
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                <Icon name="Clock" size={16} className="mr-2" />
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="flex items-center space-x-2 w-full text-left p-2 hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <Icon name="RotateCcw" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                <Icon name="Lightbulb" size={16} className="mr-2" />
                Suggestions
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center space-x-2 w-full text-left p-2 hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <Icon name="Search" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!searchQuery && suggestions.length === 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Popular Searches
              </h3>
              <div className="space-y-2">
                {(isHindiEnabled ? hindiSuggestions : sampleSuggestions).slice(0, 5).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="flex items-center space-x-2 w-full text-left p-2 hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <Icon name="TrendingUp" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;