import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const videoData = {
    title: "How myScheme Portal Works",
    description: "Learn how to discover, apply, and track government schemes in just a few simple steps",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    duration: "3:45",
    views: "2.1M views"
  };

  const features = [
    {
      icon: "Search",
      title: "Discover Schemes",
      description: "Search and browse through 3600+ government schemes using our intelligent search system"
    },
    {
      icon: "CheckCircle",
      title: "Check Eligibility",
      description: "Use our AI-powered eligibility checker to find schemes you qualify for"
    },
    {
      icon: "FileText",
      title: "Apply Online",
      description: "Submit applications directly through our platform with guided assistance"
    },
    {
      icon: "BarChart3",
      title: "Track Progress",
      description: "Monitor your application status and receive updates in real-time"
    }
  ];

  const transcript = `Welcome to myScheme Portal, your gateway to government schemes and benefits.

In this video, we'll show you how easy it is to discover and apply for government schemes that you're eligible for.

Step 1: Search and Discover
Use our intelligent search system to find schemes by name, category, or benefits. Our AI-powered recommendations will suggest schemes based on your profile.

Step 2: Check Eligibility
Our eligibility checker analyzes your information against scheme criteria to determine your qualification status.

Step 3: Apply with Confidence
Submit applications directly through our platform with step-by-step guidance and document assistance.

Step 4: Track Your Progress
Monitor your application status, receive notifications, and stay updated throughout the process.

Join millions of citizens who have successfully accessed government schemes through myScheme Portal.`;

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // In a real implementation, this would trigger video playback
  };

  return (
    <div className="bg-surface py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
            See How It Works
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Watch our step-by-step guide to understand how myScheme Portal can help you access government benefits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Player */}
          <div className="relative">
            <div className="relative bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
              {!isPlaying ? (
                <>
                  <Image
                    src={videoData.thumbnail}
                    alt={videoData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Button
                      variant="primary"
                      onClick={handlePlayVideo}
                      className="w-20 h-20 rounded-full flex items-center justify-center bg-primary hover:bg-primary-600 shadow-lg transform hover:scale-105 transition-all duration-200"
                      aria-label="Play video"
                    >
                      <Icon name="Play" size={32} className="ml-1" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black bg-opacity-70 rounded-lg p-3">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {videoData.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-white text-sm opacity-90">
                        <span>{videoData.duration}</span>
                        <span>{videoData.views}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <div className="text-center text-white">
                    <Icon name="Play" size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video would play here</p>
                    <p className="text-sm opacity-75 mt-2">
                      In a real implementation, this would show the actual video player
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowTranscript(!showTranscript)}
                  iconName="FileText"
                  iconPosition="left"
                  className="text-sm"
                >
                  {showTranscript ? 'Hide' : 'Show'} Transcript
                </Button>
                <Button
                  variant="ghost"
                  iconName="Volume2"
                  className="text-sm"
                  aria-label="Audio controls"
                >
                  Audio
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  iconName="Share"
                  className="text-sm"
                  aria-label="Share video"
                >
                  Share
                </Button>
                <Button
                  variant="ghost"
                  iconName="Download"
                  className="text-sm"
                  aria-label="Download video"
                >
                  Download
                </Button>
              </div>
            </div>

            {/* Transcript */}
            {showTranscript && (
              <div className="mt-4 bg-background border border-border rounded-lg p-4 max-h-64 overflow-y-auto">
                <h4 className="font-semibold text-text-primary mb-3">Video Transcript</h4>
                <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                  {transcript}
                </div>
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-4">
                Simple Steps to Access Benefits
              </h3>
              <p className="text-text-secondary text-base leading-relaxed">
                Our platform simplifies the entire process of discovering and applying for government schemes. Follow these easy steps to get started.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-text-primary mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                onClick={() => window.location.href = '/scheme-search-and-browse'}
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full sm:w-auto px-8 py-3"
              >
                Start Exploring Schemes
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 md:p-8">
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-heading font-bold text-text-primary mb-4">
              Need More Help?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Explore our comprehensive help resources or get personalized assistance from our AI chatbot
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                iconName="BookOpen"
                iconPosition="left"
                className="px-6 py-3"
              >
                User Guide
              </Button>
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => window.location.href = '/ai-chatbot-interface'}
                className="px-6 py-3"
              >
                Ask AI Assistant
              </Button>
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
                className="px-6 py-3"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;