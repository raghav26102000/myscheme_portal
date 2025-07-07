import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Discover Government Schemes Made for You",
      subtitle: "Find the right schemes from 3600+ government programs",
      description: "Access personalized recommendations based on your profile and needs. Get step-by-step guidance for applications.",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Explore Schemes",
      ctaLink: "/scheme-search-and-browse",
      stats: "3600+ Active Schemes"
    },
    {
      id: 2,
      title: "AI-Powered Scheme Recommendations",
      subtitle: "Smart suggestions tailored to your eligibility",
      description: "Our AI assistant analyzes your profile to suggest the most relevant schemes. Get instant answers to your queries.",
      image: "https://images.pixabay.com/photo/2020/04/08/08/08/spring-5016266_1280.jpg",
      cta: "Try AI Assistant",
      ctaLink: "/ai-chatbot-interface",
      stats: "95% Accuracy Rate"
    },
    {
      id: 3,
      title: "Track Your Applications Seamlessly",
      subtitle: "Monitor progress from application to approval",
      description: "Stay updated with real-time status tracking, document requirements, and next steps for all your applications.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80",
      cta: "View Dashboard",
      ctaLink: "/user-dashboard",
      stats: "2M+ Applications Processed"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="grid lg:grid-cols-2 h-full">
              {/* Content Section */}
              <div className="flex items-center justify-center p-6 md:p-8 lg:p-12 bg-gradient-to-br from-primary-50/90 to-accent-50/90 lg:bg-none">
                <div className="max-w-xl text-center lg:text-left">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
                    <Icon name="Shield" size={16} className="mr-2" />
                    {slide.stats}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  
                  <h2 className="text-lg md:text-xl text-primary font-medium mb-4">
                    {slide.subtitle}
                  </h2>
                  
                  <p className="text-text-secondary text-base md:text-lg mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                      variant="primary"
                      size="lg"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={() => window.location.href = slide.ctaLink}
                      className="px-8 py-3"
                    >
                      {slide.cta}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="Play"
                      iconPosition="left"
                      className="px-8 py-3"
                    >
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="hidden lg:flex items-center justify-center p-8">
                <div className="relative w-full h-full max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-3"></div>
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <Button
            variant="ghost"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-background/80 hover:bg-background shadow-lg"
            aria-label="Previous slide"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center">
          <Button
            variant="ghost"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-background/80 hover:bg-background shadow-lg"
            aria-label="Next slide"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary scale-125' :'bg-background/60 hover:bg-background/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-10 h-10 rounded-full bg-background/80 hover:bg-background"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;