import { useState } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

interface ChatInputProps {
  onSend: (message: string) => void;
  onClear?: () => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, onClear, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-3 text-text-secondary hover:text-error transition"
          title="清除对话历史"
        >
          <FaTimes className="text-lg" />
        </button>
      )}
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        placeholder="输入您的问题..."
        className="flex-1 px-4 py-3 bg-surface border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none disabled:opacity-50 min-h-[48px] max-h-[120px]"
        rows={1}
      />
      
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
      >
        <span>发送</span>
        <FaPaperPlane />
      </button>
    </form>
  );
}
