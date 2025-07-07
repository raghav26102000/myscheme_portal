import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AIChatbotLauncher from '../../components/ui/AIChatbotLauncher';
import DashboardStats from './components/DashboardStats';
import RecommendedSchemes from './components/RecommendedSchemes';
import ApplicationStatus from './components/ApplicationStatus';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';
import ProfileCompletion from './components/ProfileCompletion';
import UserEngagementStats from './components/UserEngagementStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  // Mock user data
  const userData = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    memberSince: "January 2024"
  };

  // Mock dashboard statistics
  const dashboardStats = {
    applicationsInProgress: 3,
    approvedSchemes: 2,
    savedBookmarks: 12,
    eligibilityMatches: 8
  };

  // Mock recommended schemes
  const recommendedSchemes = [
    {
      id: "pm-kisan-2024",
      name: "PM-KISAN Samman Nidhi Yojana",
      description: "Direct income support to farmers with landholding up to 2 hectares",
      category: "Agriculture",
      maxBenefit: 6000,
      matchScore: 95
    },
    {
      id: "ayushman-bharat-2024",
      name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
      description: "Health insurance coverage for economically vulnerable families",
      category: "Healthcare",
      maxBenefit: 500000,
      matchScore: 88
    },
    {
      id: "mudra-yojana-2024",
      name: "Pradhan Mantri Mudra Yojana",
      description: "Micro-finance scheme for small business entrepreneurs",
      category: "Business",
      maxBenefit: 1000000,
      matchScore: 82
    }
  ];

  // Mock application status
  const applicationStatus = [
    {
      id: "app-001",
      schemeName: "PM Scholarship Scheme",
      applicationId: "PSS2024001234",
      status: "Under Review",
      appliedDate: "15 Nov 2024",
      deadline: "30 Nov 2024",
      nextAction: "Submit Documents",
      message: "Additional income certificate required for verification"
    },
    {
      id: "app-002",
      schemeName: "Pradhan Mantri Awas Yojana",
      applicationId: "PMAY2024005678",
      status: "Documents Required",
      appliedDate: "10 Nov 2024",
      deadline: "25 Nov 2024",
      nextAction: "Upload Documents",
      message: "Please upload property documents and income proof"
    },
    {
      id: "app-003",
      schemeName: "National Scholarship Portal",
      applicationId: "NSP2024009876",
      status: "Approved",
      appliedDate: "05 Nov 2024",
      deadline: null,
      nextAction: null,
      message: "Scholarship amount will be credited to your account within 7 working days"
    }
  ];

  // Mock recent activity
  const recentActivity = [
    {
      id: "act-001",
      type: "bookmark",
      title: "Bookmarked scheme",
      description: "Added to your saved schemes",
      schemeName: "Kisan Credit Card Scheme",
      schemeId: "kcc-2024",
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: "act-002",
      type: "view",
      title: "Viewed scheme details",
      description: "Checked eligibility and benefits",
      schemeName: "Stand Up India Scheme",
      schemeId: "sui-2024",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: "act-003",
      type: "search",
      title: "Searched for schemes",
      description: "Used keywords: \'education scholarship'",
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: "act-004",
      type: "application",
      title: "Application submitted",
      description: "Successfully submitted application",
      schemeName: "PM Scholarship Scheme",
      schemeId: "pms-2024",
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: "act-005",
      type: "notification",
      title: "New scheme notification",
      description: "Received alert for matching scheme",
      schemeName: "Digital India Land Records",
      schemeId: "dilr-2024",
      timestamp: new Date(Date.now() - 172800000) // 2 days ago
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: "notif-001",
      type: "deadline",
      priority: "high",
      title: "Application Deadline Approaching",
      message: "Your PM Scholarship Scheme application deadline is in 3 days. Please submit required documents.",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      actionText: "Submit Documents"
    },
    {
      id: "notif-002",
      type: "new_scheme",
      priority: "medium",
      title: "New Scheme Available",
      message: "Pradhan Mantri Fasal Bima Yojana is now accepting applications. You may be eligible.",
      timestamp: new Date(Date.now() - 7200000),
      read: false,
      actionText: "Check Eligibility"
    },
    {
      id: "notif-003",
      type: "approval",
      priority: "high",
      title: "Application Approved",
      message: "Your National Scholarship Portal application has been approved. Amount will be credited soon.",
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      actionText: "View Details"
    },
    {
      id: "notif-004",
      type: "document",
      priority: "medium",
      title: "Document Verification",
      message: "Additional documents required for Pradhan Mantri Awas Yojana application.",
      timestamp: new Date(Date.now() - 172800000),
      read: true,
      actionText: "Upload Documents"
    }
  ];

  // Mock profile completion data
  const profileCompletionData = {
    percentage: 75,
    completedSections: 6,
    totalSections: 8,
    missingSections: ["Income Details", "Employment"]
  };

  // Mock engagement data
  const engagementData = {
    totalSchemeViews: 45,
    searchesPerformed: 12,
    bookmarksAdded: 8,
    applicationsSubmitted: 3,
    timeSpentMinutes: 180,
    favoriteCategories: [
      { name: "Agriculture", viewCount: 15 },
      { name: "Education", viewCount: 12 },
      { name: "Healthcare", viewCount: 8 },
      { name: "Employment", viewCount: 6 },
      { name: "Women & Child", viewCount: 4 }
    ]
  };

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      navigate('/homepage');
      return;
    }
    setIsAuthenticated(true);

    // Check language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-background rounded-lg border border-border p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-text-primary">
                    Welcome back, {userData.name}!
                  </h1>
                  <p className="text-text-secondary">
                    Member since {userData.memberSince} • {userData.location}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Language Toggle */}
                <div className="flex items-center space-x-2 bg-surface-50 rounded-lg p-1">
                  <Button
                    variant={currentLanguage === 'en' ? 'primary' : 'ghost'}
                    onClick={() => handleLanguageChange('en')}
                    className="text-sm px-3 py-1"
                  >
                    English
                  </Button>
                  <Button
                    variant={currentLanguage === 'hi' ? 'primary' : 'ghost'}
                    onClick={() => handleLanguageChange('hi')}
                    className="text-sm px-3 py-1"
                  >
                    हिंदी
                  </Button>
                </div>
                
                <Button variant="outline" className="text-sm">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats stats={dashboardStats} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommended Schemes */}
              <RecommendedSchemes schemes={recommendedSchemes} />
              
              {/* Application Status */}
              <ApplicationStatus applications={applicationStatus} />
              
              {/* Quick Actions */}
              <QuickActions />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Profile Completion */}
              <ProfileCompletion completionData={profileCompletionData} />
              
              {/* Notifications */}
              <NotificationCenter notifications={notifications} />
              
              {/* Recent Activity */}
              <RecentActivity activities={recentActivity} />
              
              {/* Engagement Stats */}
              <UserEngagementStats engagementData={engagementData} />
            </div>
          </div>
        </div>
      </main>

      {/* AI Chatbot Launcher */}
      <AIChatbotLauncher />
    </div>
  );
};

export default UserDashboard;