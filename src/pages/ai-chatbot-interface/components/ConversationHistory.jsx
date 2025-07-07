import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationHistory = ({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation, 
  currentLanguage = 'en' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const content = {
    en: {
      title: 'Conversation History',
      search: 'Search conversations...',
      noHistory: 'No conversation history yet',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      older: 'Older',
      delete: 'Delete',
      expand: 'Show More',
      collapse: 'Show Less'
    },
    hi: {
      title: 'बातचीत का इतिहास',
      search: 'बातचीत खोजें...',
      noHistory: 'अभी तक कोई बातचीत का इतिहास नहीं',
      today: 'आज',
      yesterday: 'कल',
      thisWeek: 'इस सप्ताह',
      older: 'पुराना',
      delete: 'हटाएं',
      expand: 'और दिखाएं',
      collapse: 'कम दिखाएं'
    }
  };

  const currentContent = content[currentLanguage];

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupConversationsByDate = (conversations) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: []
    };

    conversations.forEach(conv => {
      const convDate = new Date(conv.lastMessage);
      if (convDate >= today) {
        groups.today.push(conv);
      } else if (convDate >= yesterday) {
        groups.yesterday.push(conv);
      } else if (convDate >= thisWeek) {
        groups.thisWeek.push(conv);
      } else {
        groups.older.push(conv);
      }
    });

    return groups;
  };

  const groupedConversations = groupConversationsByDate(filteredConversations);
  const displayedConversations = isExpanded ? filteredConversations : filteredConversations.slice(0, 5);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (conversations.length === 0) {
    return (
      <div className="p-6 text-center">
        <Icon name="MessageCircle" size={48} className="mx-auto text-text-tertiary mb-4" />
        <p className="text-text-secondary">{currentContent.noHistory}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-text-primary">
          {currentContent.title}
        </h3>
        <span className="text-xs text-text-secondary bg-surface-200 px-2 py-1 rounded">
          {conversations.length}
        </span>
      </div>

      {/* Search */}
      <div className="relative">
        <Input
          type="search"
          placeholder={currentContent.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {Object.entries(groupedConversations).map(([period, convs]) => {
          if (convs.length === 0) return null;
          
          return (
            <div key={period} className="space-y-1">
              <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wide px-2 py-1">
                {currentContent[period]}
              </h4>
              {convs.map((conversation) => (
                <div
                  key={conversation.id}
                  className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-50 cursor-pointer transition-colors"
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={14} className="text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-text-primary text-sm truncate">
                        {conversation.title}
                      </h4>
                      <div className="flex items-center space-x-1 ml-2">
                        <span className="text-xs text-text-secondary">
                          {formatTime(conversation.lastMessage)}
                        </span>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(conversation.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                          title={currentContent.delete}
                        >
                          <Icon name="Trash2" size={12} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-2 mt-1">
                      {conversation.preview}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {filteredConversations.length > 5 && (
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-sm text-text-secondary hover:text-primary"
        >
          {isExpanded ? currentContent.collapse : currentContent.expand}
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-2" 
          />
        </Button>
      )}
    </div>
  );
};

export default ConversationHistory;