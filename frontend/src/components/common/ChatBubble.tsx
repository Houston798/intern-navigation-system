import React from 'react';

interface ChatBubbleProps {
  message: {
    role: string;
    content: string;
    timestamp?: string;
  };
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-r from-primary to-primary/80 text-white rounded-br-md shadow-lg'
            : 'bg-surface border border-border text-text-primary rounded-bl-md shadow-md'
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        {message.timestamp && (
          <span className="text-xs opacity-60 mt-2 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}
