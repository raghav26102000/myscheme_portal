import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = ({ currentLanguage = 'en' }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-2 max-w-[85%]">
        {/* Bot Avatar */}
        <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} />
        </div>

        {/* Typing Bubble */}
        <div className="bg-background border border-border rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse"></div>
              <div 
                className="w-2 h-2 bg-text-secondary rounded-full animate-pulse" 
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div 
                className="w-2 h-2 bg-text-secondary rounded-full animate-pulse" 
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>
            <span className="text-xs text-text-secondary">
              {currentLanguage === 'hi' ? 'टाइप कर रहा है...' : 'Typing...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;