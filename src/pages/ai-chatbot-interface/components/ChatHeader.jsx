import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  onClose, 
  onLanguageToggle, 
  currentLanguage, 
  onClearChat, 
  onToggleVoice, 
  isVoiceEnabled,
  isMinimized,
  onToggleMinimize 
}) => {
  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    hi: { name: 'हिंदी', flag: '🇮🇳' }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
      {/* Bot Info */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
          <Icon name="Bot" size={20} className="text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-base">
            {currentLanguage === 'hi' ? 'एआई सहायक' : 'AI Assistant'}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs opacity-90">
              {currentLanguage === 'hi' ? 'ऑनलाइन' : 'Online'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="xs"
          onClick={onLanguageToggle}
          className="text-primary-foreground hover:bg-primary-600 px-2"
          title={currentLanguage === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
        >
          <span className="text-sm">
            {languages[currentLanguage].flag} {languages[currentLanguage].name}
          </span>
        </Button>

        {/* Voice Toggle */}
        <Button
          variant="ghost"
          size="xs"
          onClick={onToggleVoice}
          className={`
            text-primary-foreground hover:bg-primary-600 p-2
            ${isVoiceEnabled ? 'bg-primary-600' : ''}
          `}
          title={currentLanguage === 'hi' ? 'आवाज़ चालू/बंद करें' : 'Toggle voice'}
        >
          <Icon name={isVoiceEnabled ? 'Volume2' : 'VolumeX'} size={16} />
        </Button>

        {/* Clear Chat */}
        <Button
          variant="ghost"
          size="xs"
          onClick={onClearChat}
          className="text-primary-foreground hover:bg-primary-600 p-2"
          title={currentLanguage === 'hi' ? 'चैट साफ़ करें' : 'Clear chat'}
        >
          <Icon name="Trash2" size={16} />
        </Button>

        {/* Minimize/Maximize (Desktop only) */}
        <Button
          variant="ghost"
          size="xs"
          onClick={onToggleMinimize}
          className="hidden lg:flex text-primary-foreground hover:bg-primary-600 p-2"
          title={isMinimized ? 'Maximize' : 'Minimize'}
        >
          <Icon name={isMinimized ? 'Maximize2' : 'Minimize2'} size={16} />
        </Button>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="xs"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-600 p-2"
          title={currentLanguage === 'hi' ? 'बंद करें' : 'Close'}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;