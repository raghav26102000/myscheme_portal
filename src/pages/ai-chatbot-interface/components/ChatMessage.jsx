import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onSchemeClick, onQuickReply }) => {
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessageContent = () => {
    if (message.type === 'scheme_card') {
      return (
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-heading font-semibold text-text-primary text-sm">
              {message.scheme.name}
            </h4>
            <span className="text-xs text-text-secondary bg-primary-50 px-2 py-1 rounded">
              {message.scheme.category}
            </span>
          </div>
          <p className="text-sm text-text-secondary line-clamp-2">
            {message.scheme.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Users" size={14} />
              <span>{message.scheme.beneficiaries}</span>
            </div>
            <Button
              variant="primary"
              size="xs"
              onClick={() => onSchemeClick(message.scheme.id)}
            >
              View Details
            </Button>
          </div>
        </div>
      );
    }

    if (message.type === 'eligibility_checklist') {
      return (
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <h4 className="font-heading font-semibold text-text-primary text-sm flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
            Eligibility Checklist
          </h4>
          <ul className="space-y-2">
            {message.checklist.map((item, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon 
                  name={item.met ? "Check" : "X"} 
                  size={14} 
                  className={item.met ? "text-success mt-0.5" : "text-error mt-0.5"} 
                />
                <span className={item.met ? "text-text-primary" : "text-text-secondary"}>
                  {item.criteria}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (message.type === 'quick_replies') {
      return (
        <div className="space-y-3">
          <p className="text-sm text-text-primary">{message.content}</p>
          <div className="flex flex-wrap gap-2">
            {message.replies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="xs"
                onClick={() => onQuickReply(reply.text)}
                className="text-xs"
              >
                {reply.text}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
    );
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
          ${message.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-accent text-accent-foreground'
          }
        `}>
          <Icon 
            name={message.sender === 'user' ? 'User' : 'Bot'} 
            size={16} 
          />
        </div>

        {/* Message Bubble */}
        <div className={`
          rounded-lg p-3 shadow-sm
          ${message.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-background border border-border'
          }
        `}>
          {renderMessageContent()}
          
          {/* Timestamp */}
          <div className={`
            text-xs mt-2 opacity-70
            ${message.sender === 'user' ? 'text-primary-foreground' : 'text-text-secondary'}
          `}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;