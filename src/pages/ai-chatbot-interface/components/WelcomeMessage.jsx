import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeMessage = ({ onQuickAction, currentLanguage = 'en' }) => {
  const content = {
    en: {
      welcome: "Welcome to myScheme Portal AI Assistant! 🇮🇳",
      subtitle: "I\'m here to help you discover government schemes tailored for you.",
      features: [
        "Find schemes based on your profile",
        "Check eligibility requirements",
        "Get application guidance",
        "Document assistance"
      ],
      quickActions: [
        {
          icon: "Wheat",
          title: "Agricultural Schemes",
          description: "Schemes for farmers and agriculture",
          query: "Show me agricultural schemes for farmers"
        },
        {
          icon: "GraduationCap",
          title: "Education & Scholarships",
          description: "Educational support and scholarships",
          query: "What education scholarships are available?"
        },
        {
          icon: "Heart",
          title: "Healthcare Schemes",
          description: "Health insurance and medical support",
          query: "Tell me about healthcare schemes"
        },
        {
          icon: "Users",
          title: "Women Empowerment",
          description: "Schemes supporting women",
          query: "What schemes are available for women?"
        },
        {
          icon: "Briefcase",
          title: "Business & Employment",
          description: "Loans and employment schemes",
          query: "Show me business loan schemes"
        },
        {
          icon: "Home",
          title: "Housing Schemes",
          description: "Housing and shelter programs",
          query: "What housing schemes are available?"
        }
      ],
      getStarted: "Choose a category above or ask me anything about government schemes!"
    },
    hi: {
      welcome: "myScheme पोर्टल AI सहायक में आपका स्वागत है! 🇮🇳",
      subtitle: "मैं आपके लिए उपयुक्त सरकारी योजनाएं खोजने में आपकी सहायता करूंगा।",
      features: [
        "आपकी प्रोफाइल के आधार पर योजनाएं खोजें",
        "पात्रता आवश्यकताओं की जांच करें",
        "आवेदन मार्गदर्शन प्राप्त करें",
        "दस्तावेज़ सहायता"
      ],
      quickActions: [
        {
          icon: "Wheat",
          title: "कृषि योजनाएं",
          description: "किसानों और कृषि के लिए योजनाएं",
          query: "मुझे किसानों के लिए कृषि योजनाएं दिखाएं"
        },
        {
          icon: "GraduationCap",
          title: "शिक्षा और छात्रवृत्ति",
          description: "शैक्षिक सहायता और छात्रवृत्ति",
          query: "कौन सी शिक्षा छात्रवृत्ति उपलब्ध हैं?"
        },
        {
          icon: "Heart",
          title: "स्वास्थ्य योजनाएं",
          description: "स्वास्थ्य बीमा और चिकित्सा सहायता",
          query: "मुझे स्वास्थ्य योजनाओं के बारे में बताएं"
        },
        {
          icon: "Users",
          title: "महिला सशक्तिकरण",
          description: "महिलाओं का समर्थन करने वाली योजनाएं",
          query: "महिलाओं के लिए कौन सी योजनाएं उपलब्ध हैं?"
        },
        {
          icon: "Briefcase",
          title: "व्यापार और रोजगार",
          description: "ऋण और रोजगार योजनाएं",
          query: "मुझे व्यापारिक ऋण योजनाएं दिखाएं"
        },
        {
          icon: "Home",
          title: "आवास योजनाएं",
          description: "आवास और आश्रय कार्यक्रम",
          query: "कौन सी आवास योजनाएं उपलब्ध हैं?"
        }
      ],
      getStarted: "ऊपर से कोई श्रेणी चुनें या सरकारी योजनाओं के बारे में मुझसे कुछ भी पूछें!"
    }
  };

  const currentContent = content[currentLanguage];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          {currentContent.welcome}
        </h2>
        <p className="text-text-secondary">
          {currentContent.subtitle}
        </p>
      </div>

      {/* Features List */}
      <div className="bg-surface-50 rounded-lg p-4 space-y-3">
        <h3 className="font-heading font-semibold text-text-primary flex items-center">
          <Icon name="Sparkles" size={18} className="mr-2 text-accent" />
          {currentLanguage === 'hi' ? 'मैं आपकी कैसे सहायता कर सकता हूं:' : 'How I can help you:'}
        </h3>
        <ul className="space-y-2">
          {currentContent.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
              <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-text-primary">
          {currentLanguage === 'hi' ? 'लोकप्रिय श्रेणियां:' : 'Popular Categories:'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentContent.quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onQuickAction(action.query)}
              className="p-4 h-auto text-left justify-start hover:bg-surface-50 transition-colors"
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={action.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary text-sm mb-1">
                    {action.title}
                  </h4>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Get Started Message */}
      <div className="text-center p-4 bg-tint-primary rounded-lg">
        <p className="text-sm text-text-secondary">
          {currentContent.getStarted}
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;