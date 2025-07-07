import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, disabled, onVoiceInput, isListening }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      onVoiceInput();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload for document assistance
      onSendMessage(`I've uploaded a document: ${file.name}. Can you help me understand what schemes this relates to?`);
    }
  };

  const quickSuggestions = [
    "Find schemes for farmers",
    "Education scholarships",
    "Healthcare schemes",
    "Women empowerment programs"
  ];

  return (
    <div className="border-t border-border bg-background p-4 space-y-3">
      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2">
        {quickSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="ghost"
            size="xs"
            onClick={() => {
              setMessage(suggestion);
              onSendMessage(suggestion);
            }}
            className="text-xs text-text-secondary hover:text-primary"
            disabled={disabled}
          >
            {suggestion}
          </Button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Ask about government schemes..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="pr-12 resize-none"
          />
          
          {/* Voice Input Button */}
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={handleVoiceToggle}
            disabled={disabled}
            className={`
              absolute right-2 top-1/2 transform -translate-y-1/2 p-1
              ${isRecording ? 'text-error animate-pulse' : 'text-text-secondary'}
            `}
            aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
          >
            <Icon name={isRecording ? 'MicOff' : 'Mic'} size={16} />
          </Button>
        </div>

        {/* File Upload Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-2"
          aria-label="Upload document"
        >
          <Icon name="Paperclip" size={18} />
        </Button>

        {/* Send Button */}
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!message.trim() || disabled}
          className="px-4"
          aria-label="Send message"
        >
          <Icon name="Send" size={18} />
        </Button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileUpload}
          className="hidden"
        />
      </form>

      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center space-x-2 text-error text-sm animate-pulse">
          <Icon name="Mic" size={16} />
          <span>Listening... Speak now</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;