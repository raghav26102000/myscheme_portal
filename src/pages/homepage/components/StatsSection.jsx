import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    schemes: 0,
    beneficiaries: 0,
    applications: 0,
    satisfaction: 0
  });

  const finalStats = {
    schemes: 3600,
    beneficiaries: 85,
    applications: 2.4,
    satisfaction: 94
  };

  const statsData = [
    {
      id: 1,
      icon: "FileText",
      value: counters.schemes,
      suffix: "+",
      label: "Active Schemes",
      description: "Government schemes available across all categories",
      color: "text-primary"
    },
    {
      id: 2,
      icon: "Users",
      value: counters.beneficiaries,
      suffix: "M+",
      label: "Beneficiaries Helped",
      description: "Citizens who have successfully accessed schemes",
      color: "text-success"
    },
    {
      id: 3,
      icon: "Send",
      value: counters.applications,
      suffix: "M+",
      label: "Applications Processed",
      description: "Total applications submitted through the platform",
      color: "text-accent"
    },
    {
      id: 4,
      icon: "Star",
      value: counters.satisfaction,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "User satisfaction with our platform services",
      color: "text-warning"
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        schemes: Math.min(prev.schemes + Math.ceil(finalStats.schemes / steps), finalStats.schemes),
        beneficiaries: Math.min(prev.beneficiaries + Math.ceil(finalStats.beneficiaries / steps), finalStats.beneficiaries),
        applications: Math.min(prev.applications + (finalStats.applications / steps), finalStats.applications),
        satisfaction: Math.min(prev.satisfaction + Math.ceil(finalStats.satisfaction / steps), finalStats.satisfaction)
      }));
    }, interval);

    // Clear interval when all counters reach their targets
    const checkComplete = setInterval(() => {
      if (
        counters.schemes >= finalStats.schemes &&
        counters.beneficiaries >= finalStats.beneficiaries &&
        counters.applications >= finalStats.applications &&
        counters.satisfaction >= finalStats.satisfaction
      ) {
        clearInterval(timer);
        clearInterval(checkComplete);
      }
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(checkComplete);
    };
  }, [counters, finalStats]);

  const formatValue = (value, suffix) => {
    if (suffix === "M+") {
      return value.toFixed(1);
    }
    return Math.floor(value);
  };

  return (
    <div className="bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
            Platform Impact & Statistics
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Empowering millions of citizens to access government schemes and benefits across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-surface rounded-xl p-6 md:p-8 text-center hover:shadow-md transition-shadow duration-200 border border-border"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-surface-100 flex items-center justify-center ${stat.color}`}>
                <Icon name={stat.icon} size={32} />
              </div>
              
              <div className="mb-3">
                <div className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-1">
                  {formatValue(stat.value, stat.suffix)}
                  <span className={`${stat.color} ml-1`}>{stat.suffix}</span>
                </div>
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  {stat.label}
                </h3>
              </div>
              
              <p className="text-text-secondary text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-4">
                Making Government Schemes Accessible
              </h3>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
                Our platform bridges the gap between citizens and government schemes, ensuring that eligible beneficiaries can easily discover, understand, and apply for the support they need.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="text-text-primary">AI-powered scheme recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="text-text-primary">Simplified application processes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="text-text-primary">Real-time application tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="text-text-primary">Multi-language support</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 text-center">
                <Icon name="Globe" size={24} className="text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">28</div>
                <div className="text-sm text-text-secondary">States & UTs</div>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <Icon name="Languages" size={24} className="text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">2</div>
                <div className="text-sm text-text-secondary">Languages</div>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <Icon name="Building" size={24} className="text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">15</div>
                <div className="text-sm text-text-secondary">Categories</div>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <Icon name="Clock" size={24} className="text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">24/7</div>
                <div className="text-sm text-text-secondary">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;