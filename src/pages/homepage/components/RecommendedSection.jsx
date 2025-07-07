import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecommendedSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const authStatus = localStorage.getItem('isAuthenticated');
    const profile = localStorage.getItem('userProfile');
    
    setIsLoggedIn(authStatus === 'true');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const recommendedSchemes = [
    {
      id: 1,
      name: "PM-KISAN Samman Nidhi",
      category: "Agriculture",
      benefit: "₹6,000 per year",
      description: "Direct income support to farmer families owning cultivable land",
      eligibility: "Small & marginal farmers",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400",
      matchPercentage: 95,
      tags: ["Direct Benefit", "Annual Payment", "No Application Fee"],
      deadline: "Open throughout the year",
      beneficiaries: "12 Crore+"
    },
    {
      id: 2,
      name: "Ayushman Bharat - PMJAY",
      category: "Healthcare",
      benefit: "₹5 Lakh health cover",
      description: "Comprehensive health insurance scheme for economically vulnerable families",
      eligibility: "SECC 2011 beneficiaries",
      image: "https://images.pixabay.com/photo/2559/medical-563427_1280.jpg",
      matchPercentage: 88,
      tags: ["Health Insurance", "Cashless Treatment", "Secondary Care"],
      deadline: "Continuous enrollment",
      beneficiaries: "50 Crore+"
    },
    {
      id: 3,
      name: "National Scholarship Portal",
      category: "Education",
      benefit: "Up to ₹2 Lakh",
      description: "Scholarships for students from economically weaker sections",
      eligibility: "Students with family income < ₹8 Lakh",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
      matchPercentage: 92,
      tags: ["Merit Based", "Need Based", "Renewable"],
      deadline: "October 31, 2024",
      beneficiaries: "1.5 Crore+"
    }
  ];

  const handleSchemeClick = (scheme) => {
    window.location.href = `/scheme-detail-page?id=${scheme.id}`;
  };

  const handleViewAll = () => {
    window.location.href = '/user-dashboard';
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-base">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="UserPlus" size={32} className="text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
              Get Personalized Recommendations
            </h2>
            
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Sign in to receive AI-powered scheme recommendations based on your profile, location, and eligibility criteria
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                iconName="LogIn"
                iconPosition="left"
                onClick={() => localStorage.setItem('isAuthenticated', 'true')}
                className="px-8 py-3"
              >
                Sign In for Recommendations
              </Button>
              
              <Button
                variant="outline"
                iconName="Search"
                iconPosition="left"
                onClick={() => window.location.href = '/scheme-search-and-browse'}
                className="px-8 py-3"
              >
                Browse All Schemes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
              Recommended for You
            </h2>
            <p className="text-text-secondary">
              Based on your profile and preferences
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={handleViewAll}
            iconName="ArrowRight"
            iconPosition="right"
            className="hidden md:flex"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-background rounded-xl shadow-base hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer"
              onClick={() => handleSchemeClick(scheme)}
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={scheme.image}
                  alt={scheme.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {scheme.matchPercentage}% Match
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-background/90 text-text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {scheme.category}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-bold text-text-primary text-lg leading-tight">
                    {scheme.name}
                  </h3>
                  <Icon name="Bookmark" size={20} className="text-text-secondary hover:text-primary cursor-pointer" />
                </div>

                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {scheme.description}
                </p>

                {/* Benefit & Eligibility */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="DollarSign" size={16} className="text-success" />
                    <span className="text-success font-semibold">{scheme.benefit}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-text-secondary" />
                    <span className="text-text-secondary text-sm">{scheme.eligibility}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {scheme.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-surface text-text-secondary px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{scheme.beneficiaries}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{scheme.deadline}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSchemeClick(scheme);
                    }}
                    className="flex-1 text-sm py-2"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle eligibility check
                    }}
                    className="px-4 py-2"
                    aria-label="Check eligibility"
                  >
                    <Icon name="CheckCircle" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-8 md:hidden">
          <Button
            variant="outline"
            onClick={handleViewAll}
            iconName="ArrowRight"
            iconPosition="right"
            className="px-8 py-3"
          >
            View All Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;