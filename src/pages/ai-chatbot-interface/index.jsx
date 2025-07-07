import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import WelcomeMessage from './components/WelcomeMessage';
import ConversationHistory from './components/ConversationHistory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIChatbotInterface = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  // Mock conversation history data
  const mockConversations = [
    {
      id: 1,
      title: "Agricultural Schemes Query",
      preview: "I asked about PM-KISAN scheme eligibility and got detailed information about farmer benefits...",
      lastMessage: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      unreadCount: 0
    },
    {
      id: 2,
      title: "Education Scholarships",
      preview: "Discussed various scholarship options for undergraduate students and application processes...",
      lastMessage: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      unreadCount: 2
    },
    {
      id: 3,
      title: "Healthcare Schemes",
      preview: "Got information about Ayushman Bharat scheme coverage and how to apply for health card...",
      lastMessage: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      unreadCount: 0
    },
    {
      id: 4,
      title: "Women Empowerment Programs",
      preview: "Learned about Mudra Yojana for women entrepreneurs and loan application procedures...",
      lastMessage: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      unreadCount: 0
    }
  ];

  useEffect(() => {
    setConversations(mockConversations);
    
    // Load language preference
    const savedLanguage = localStorage.getItem('chatLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        sender: 'bot',
        type: 'text',
        content: savedLanguage === 'hi' ?'नमस्ते! मैं myScheme पोर्टल का AI सहायक हूं। मैं आपको सरकारी योजनाओं के बारे में जानकारी देने में मदद कर सकता हूं।' :'Hello! I\'m the myScheme Portal AI Assistant. I can help you discover and learn about government schemes.',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('chatLanguage', newLanguage);
    
    // Add language switch message
    const switchMessage = {
      id: Date.now(),
      sender: 'bot',
      type: 'text',
      content: newLanguage === 'hi' ?'भाषा हिंदी में बदल दी गई है। अब आप हिंदी में सवाल पूछ सकते हैं।' :'Language switched to English. You can now ask questions in English.',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, switchMessage]);
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    const timestamp = new Date();

    // Check for scheme-specific queries
    if (lowerMessage.includes('farmer') || lowerMessage.includes('agriculture') || lowerMessage.includes('कृषि') || lowerMessage.includes('किसान')) {
      return {
        id: Date.now(),
        sender: 'bot',
        type: 'scheme_card',
        scheme: {
          id: 'pm-kisan',
          name: currentLanguage === 'hi' ? 'प्रधानमंत्री किसान सम्मान निधि योजना' : 'PM-KISAN Scheme',
          category: currentLanguage === 'hi' ? 'कृषि' : 'Agriculture',
          description: currentLanguage === 'hi' ?'यह योजना छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की आर्थिक सहायता प्रदान करती है।' :'This scheme provides ₹6,000 per year financial assistance to small and marginal farmers.',
          beneficiaries: currentLanguage === 'hi' ? '12 करोड़+ किसान' : '12 Crore+ Farmers'
        },
        timestamp
      };
    }

    if (lowerMessage.includes('education') || lowerMessage.includes('scholarship') || lowerMessage.includes('शिक्षा') || lowerMessage.includes('छात्रवृत्ति')) {
      return {
        id: Date.now(),
        sender: 'bot',
        type: 'quick_replies',
        content: currentLanguage === 'hi' ?'शिक्षा के लिए कई योजनाएं उपलब्ध हैं। आप किस स्तर की शिक्षा के लिए जानकारी चाहते हैं?' :'There are several education schemes available. Which level of education are you interested in?',
        replies: currentLanguage === 'hi' 
          ? [
              { text: 'स्कूली शिक्षा' },
              { text: 'उच्च शिक्षा' },
              { text: 'तकनीकी शिक्षा' },
              { text: 'व्यावसायिक प्रशिक्षण' }
            ]
          : [
              { text: 'School Education' },
              { text: 'Higher Education' },
              { text: 'Technical Education' },
              { text: 'Vocational Training' }
            ],
        timestamp
      };
    }

    if (lowerMessage.includes('health') || lowerMessage.includes('medical') || lowerMessage.includes('स्वास्थ्य') || lowerMessage.includes('चिकित्सा')) {
      return {
        id: Date.now(),
        sender: 'bot',
        type: 'eligibility_checklist',
        checklist: currentLanguage === 'hi' 
          ? [
              { criteria: 'परिवारिक आय ₹5 लाख से कम', met: true },
              { criteria: 'आधार कार्ड उपलब्ध', met: true },
              { criteria: 'राशन कार्ड उपलब्ध', met: false },
              { criteria: 'बैंक खाता लिंक', met: true }
            ]
          : [
              { criteria: 'Family income below ₹5 lakh', met: true },
              { criteria: 'Aadhaar card available', met: true },
              { criteria: 'Ration card available', met: false },
              { criteria: 'Bank account linked', met: true }
            ],
        timestamp
      };
    }

    // Default response
    return {
      id: Date.now(),
      sender: 'bot',
      type: 'text',
      content: currentLanguage === 'hi' ?'मैं आपकी मदद करने के लिए यहां हूं। कृपया बताएं कि आप किस प्रकार की सरकारी योजना के बारे में जानना चाहते हैं? जैसे कि कृषि, शिक्षा, स्वास्थ्य, या व्यापार।' :'I\'m here to help you! Please let me know what type of government scheme you\'re interested in, such as agriculture, education, healthcare, or business.',
      timestamp
    };
  };

  const handleSchemeClick = (schemeId) => {
    navigate(`/scheme-detail-page?id=${schemeId}`);
  };

  const handleQuickReply = (replyText) => {
    handleSendMessage(replyText);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
      handleSendMessage("I want to know about education schemes");
    }, 3000);
  };

  const handleClearChat = () => {
    const confirmMessage = currentLanguage === 'hi' ?'क्या आप वाकई चैट साफ़ करना चाहते हैं?' :'Are you sure you want to clear the chat?';
    
    if (window.confirm(confirmMessage)) {
      setMessages([]);
    }
  };

  const handleSelectConversation = (conversationId) => {
    // Load conversation history
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      // Simulate loading conversation messages
      const loadedMessages = [
        {
          id: 1,
          sender: 'user',
          type: 'text',
          content: 'Tell me about agricultural schemes',
          timestamp: new Date(conversation.lastMessage.getTime() - 60000)
        },
        {
          id: 2,
          sender: 'bot',
          type: 'text',
          content: 'I found several agricultural schemes for you...',
          timestamp: conversation.lastMessage
        }
      ];
      setMessages(loadedMessages);
      setShowHistory(false);
    }
  };

  const handleDeleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 lg:pt-18 h-screen flex flex-col lg:flex-row">
        {/* Desktop Sidebar - Conversation History */}
        <div className={`
          hidden lg:block w-80 border-r border-border bg-surface-50 overflow-y-auto
          ${showHistory ? 'block' : 'hidden lg:block'}
        `}>
          <ConversationHistory
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <ChatHeader
            onClose={() => navigate('/homepage')}
            onLanguageToggle={handleLanguageToggle}
            currentLanguage={currentLanguage}
            onClearChat={handleClearChat}
            onToggleVoice={() => setIsVoiceEnabled(!isVoiceEnabled)}
            isVoiceEnabled={isVoiceEnabled}
            isMinimized={isMinimized}
            onToggleMinimize={() => setIsMinimized(!isMinimized)}
          />

          {/* Mobile History Toggle */}
          <div className="lg:hidden border-b border-border p-2">
            <Button
              variant="ghost"
              onClick={() => setShowHistory(!showHistory)}
              className="w-full justify-start"
            >
              <Icon name="History" size={16} className="mr-2" />
              {currentLanguage === 'hi' ? 'बातचीत का इतिहास' : 'Conversation History'}
              <Icon 
                name={showHistory ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="ml-auto" 
              />
            </Button>
          </div>

          {/* Mobile History Panel */}
          {showHistory && (
            <div className="lg:hidden border-b border-border bg-surface-50 max-h-64 overflow-y-auto">
              <ConversationHistory
                conversations={conversations}
                onSelectConversation={handleSelectConversation}
                onDeleteConversation={handleDeleteConversation}
                currentLanguage={currentLanguage}
              />
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-50">
            {messages.length === 0 ? (
              <WelcomeMessage
                onQuickAction={handleSendMessage}
                currentLanguage={currentLanguage}
              />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onSchemeClick={handleSchemeClick}
                    onQuickReply={handleQuickReply}
                  />
                ))}
                
                {isTyping && (
                  <TypingIndicator currentLanguage={currentLanguage} />
                )}
              </>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            onVoiceInput={handleVoiceInput}
            isListening={isListening}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChatbotInterface;