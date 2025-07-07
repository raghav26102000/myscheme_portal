import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AIChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m here to help you find the right government schemes. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    {
      label: 'Find schemes for farmers',
      icon: 'Wheat',
      query: 'Show me agricultural schemes for farmers'
    },
    {
      label: 'Education scholarships',
      icon: 'GraduationCap',
      query: 'What education scholarships are available?'
    },
    {
      label: 'Healthcare schemes',
      icon: 'Heart',
      query: 'Tell me about healthcare schemes'
    },
    {
      label: 'Women empowerment',
      icon: 'Users',
      query: 'What schemes are available for women?'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(messageText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('farmer') || lowerMessage.includes('agriculture')) {
      return 'I found several agricultural schemes for you! The PM-KISAN scheme provides ₹6,000 annually to farmers. There\'s also the Pradhan Mantri Fasal Bima Yojana for crop insurance. Would you like detailed information about any specific scheme?';
    } else if (lowerMessage.includes('education') || lowerMessage.includes('scholarship')) {
      return 'Great! There are many education schemes available. The National Scholarship Portal offers various scholarships for different categories. The PM Scholarship Scheme supports children of armed forces personnel. Which level of education are you interested in?';
    } else if (lowerMessage.includes('health') || lowerMessage.includes('medical')) {
      return 'For healthcare, the Ayushman Bharat scheme provides health insurance up to ₹5 lakh per family. There\'s also the Pradhan Mantri Jan Aushadhi Yojana for affordable medicines. Do you need information about eligibility criteria?';
    } else if (lowerMessage.includes('women') || lowerMessage.includes('woman')) {
      return 'Several schemes support women empowerment! The Pradhan Mantri Mudra Yojana offers loans for women entrepreneurs. Beti Bachao Beti Padhao focuses on girl child welfare. What specific area interests you most?';
    } else {
      return 'I understand you\'re looking for information about government schemes. Could you please specify what type of scheme you\'re interested in? For example, education, healthcare, agriculture, or business loans? This will help me provide more relevant suggestions.';
    }
  };

  const handleQuickAction = (query) => {
    handleSendMessage(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-1200 lg:inset-auto lg:bottom-20 lg:right-6 lg:w-96 lg:h-[600px]">
          {/* Mobile Overlay */}
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50" onClick={handleToggleChat} />
          
          {/* Chat Container */}
          <div className="relative bg-background border border-border rounded-none lg:rounded-lg shadow-xl flex flex-col h-full lg:h-[600px] animate-slide-down">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-none lg:rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={18} className="text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs opacity-90">Here to help with schemes</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={handleToggleChat}
                className="p-2 text-primary-foreground hover:bg-primary-600"
                aria-label="Close chat"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[80%] p-3 rounded-lg text-sm
                      ${message.type === 'user' ?'bg-primary text-primary-foreground ml-4' :'bg-background border border-border mr-4'
                      }
                    `}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`
                      text-xs mt-1 opacity-70
                      ${message.type === 'user' ? 'text-primary-foreground' : 'text-text-secondary'}
                    `}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border p-3 rounded-lg mr-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-text-secondary font-caption px-1">Quick actions:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleQuickAction(action.query)}
                        className="justify-start text-left p-3 h-auto"
                      >
                        <Icon name={action.icon} size={16} className="mr-2 flex-shrink-0" />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background rounded-b-none lg:rounded-b-lg">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about government schemes..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  variant="primary"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4"
                  aria-label="Send message"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <Button
          variant="primary"
          onClick={handleToggleChat}
          className="fixed bottom-6 right-6 z-1200 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-scale-up"
          aria-label="Open AI chat assistant"
        >
          <Icon name="MessageCircle" size={24} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></span>
        </Button>
      )}
    </>
  );
};

export default AIChatbotLauncher;