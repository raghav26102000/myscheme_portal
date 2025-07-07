import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const navigationItems = [
    {
      label: 'Home',
      path: '/homepage',
      icon: 'Home',
      tooltip: 'Go to homepage'
    },
    {
      label: 'Browse Schemes',
      path: '/scheme-search-and-browse',
      icon: 'Search',
      tooltip: 'Search and browse government schemes'
    },
    {
      label: 'My Dashboard',
      path: '/user-dashboard',
      icon: 'User',
      tooltip: 'Access your personal dashboard',
      authRequired: true
    },
    {
      label: 'Support',
      path: '/ai-chatbot-interface',
      icon: 'MessageCircle',
      tooltip: 'Get AI-powered assistance'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/scheme-search-and-browse?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
    } else {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-background border-b border-border-light shadow-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/homepage" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              aria-label="myScheme Portal - Government of India"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-heading font-semibold text-text-primary">
                  myScheme Portal
                </h1>
                <p className="text-xs text-text-secondary font-caption">
                  Government of India
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation">
            {navigationItems.map((item) => {
              if (item.authRequired && !isAuthenticated) return null;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 touch-target
                    ${isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-text-primary hover:bg-surface hover:text-primary'
                    }
                  `}
                  title={item.tooltip}
                  aria-current={isActivePath(item.path) ? 'page' : undefined}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className={`
              hidden md:flex items-center transition-all duration-300
              ${isSearchExpanded ? 'w-80' : 'w-64'}
            `}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={() => setIsSearchExpanded(false)}
                />
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
              </form>
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              aria-label="Toggle search"
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Authentication Button */}
            <Button
              variant={isAuthenticated ? "outline" : "primary"}
              onClick={handleAuthAction}
              className="hidden sm:flex items-center space-x-2"
            >
              <Icon name={isAuthenticated ? "LogOut" : "LogIn"} size={18} />
              <span>{isAuthenticated ? "Logout" : "Login"}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="lg:hidden p-2"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="md:hidden pb-4 animate-slide-down">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                autoFocus
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-1100 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-lg z-1100 lg:hidden animate-slide-down">
            <nav className="px-4 py-4 space-y-2" role="navigation">
              {navigationItems.map((item) => {
                if (item.authRequired && !isAuthenticated) return null;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-200 touch-target
                      ${isActivePath(item.path)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-text-primary hover:bg-surface hover:text-primary'
                      }
                    `}
                    title={item.tooltip}
                    aria-current={isActivePath(item.path) ? 'page' : undefined}
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Auth Button */}
              <Button
                variant={isAuthenticated ? "outline" : "primary"}
                onClick={() => {
                  handleAuthAction();
                  closeMenu();
                }}
                className="w-full flex items-center justify-center space-x-2 mt-4"
              >
                <Icon name={isAuthenticated ? "LogOut" : "LogIn"} size={18} />
                <span>{isAuthenticated ? "Logout" : "Login"}</span>
              </Button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;