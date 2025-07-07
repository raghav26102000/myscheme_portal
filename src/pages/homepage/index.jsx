import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import AIChatbotLauncher from '../../components/ui/AIChatbotLauncher';
import HeroSlideshow from './components/HeroSlideshow';
import SearchSection from './components/SearchSection';
import CategoryGrid from './components/CategoryGrid';
import RecommendedSection from './components/RecommendedSection';
import StatsSection from './components/StatsSection';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import ParticleBackground from '../../components/animation/ParticleBackground';
import FloatingElements from '../../components/animation/FloatingElements';
import AnimatedSection from '../../components/animation/AnimatedSection';

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <ParticleBackground particleCount={30} />
      <FloatingElements count={8} />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <motion.main 
        className="pt-16 lg:pt-18 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Section with Slideshow */}
        <AnimatedSection animationType="fadeUp" delay={0.2}>
          <section aria-label="Hero slideshow" className="relative">
            <HeroSlideshow />
          </section>
        </AnimatedSection>

        {/* Search Section */}
        <AnimatedSection animationType="slideIn" delay={0.4}>
          <section aria-label="Scheme search" className="relative">
            <SearchSection />
          </section>
        </AnimatedSection>

        {/* Category Grid */}
        <AnimatedSection animationType="scale" delay={0.6}>
          <section aria-label="Scheme categories" className="relative">
            <CategoryGrid />
          </section>
        </AnimatedSection>

        {/* Recommended Section */}
        <AnimatedSection animationType="flip" delay={0.8}>
          <section aria-label="Recommended schemes" className="relative">
            <RecommendedSection />
          </section>
        </AnimatedSection>

        {/* Statistics Section */}
        <AnimatedSection animationType="fadeUp" delay={1.0}>
          <section aria-label="Platform statistics" className="relative">
            <StatsSection />
          </section>
        </AnimatedSection>

        {/* Video Section */}
        <AnimatedSection animationType="slideIn" delay={1.2}>
          <section aria-label="How it works video" className="relative">
            <VideoSection />
          </section>
        </AnimatedSection>
      </motion.main>

      {/* Footer */}
      <AnimatedSection animationType="fadeUp" delay={1.4}>
        <Footer />
      </AnimatedSection>

      {/* AI Chatbot Launcher */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20, 
          delay: 2 
        }}
      >
        <AIChatbotLauncher />
      </motion.div>
    </div>
  );
};

export default Homepage;