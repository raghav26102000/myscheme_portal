import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import AIChatbotLauncher from '../../components/ui/AIChatbotLauncher';
import HeroSlideshow from './components/HeroSlideshow';
import SearchSection from './components/SearchSection';
import CategoryGrid from './components/CategoryGrid';
import RecommendedSection from './components/RecommendedSection';
import StatsSection from './components/StatsSection';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'myScheme Portal - Government of India | Discover Government Schemes';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover and access 3600+ government schemes through myScheme Portal. Get AI-powered recommendations, check eligibility, and apply for benefits easily.');
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-18">
        {/* Hero Section with Slideshow */}
        <section aria-label="Hero slideshow">
          <HeroSlideshow />
        </section>

        {/* Search Section */}
        <section aria-label="Scheme search">
          <SearchSection />
        </section>

        {/* Category Grid */}
        <section aria-label="Scheme categories">
          <CategoryGrid />
        </section>

        {/* Recommended Section */}
        <section aria-label="Recommended schemes">
          <RecommendedSection />
        </section>

        {/* Statistics Section */}
        <section aria-label="Platform statistics">
          <StatsSection />
        </section>

        {/* Video Section */}
        <section aria-label="How it works video">
          <VideoSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Chatbot Launcher */}
      <AIChatbotLauncher />
    </div>
  );
};

export default Homepage;