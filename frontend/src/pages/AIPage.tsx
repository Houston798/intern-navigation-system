import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import ChatBubble from '../../components/common/ChatBubble';
import ChatInput from '../../components/common/ChatInput';
import { aiService } from '../../services/aiService';

interface Message {
  role: string;
  content: string;
  timestamp?: string;
}

export default function AIPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    if (loading) return;
    
    setLoading(true);
    setError('');
    
    // 添加用户消息
    setMessages(prev => [...prev, {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }]);

    try {
      const data = await aiService.chat(message);
      
      // 添加 AI 响应
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      }]);
    } catch (err: any) {
      console.error('AI chat error:', err);
      setError(err.response?.data?.error || '服务暂时不可用，请稍后重试');
      
      // 添加错误消息
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，AI 服务暂时不可用。请稍后重试，或者尝试刷新页面。',
        timestamp: new Date().toISOString()
      }]);
    }

    setLoading(false);
  };

  const handleClear = async () => {
    if (window.confirm('确定要清除所有对话历史吗？')) {
      try {
        await aiService.clearHistory();
        setMessages([]);
      } catch (err) {
        console.error('Clear history error:', err);
      }
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <FaRobot className="text-primary" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI 成长助手
          </span>
        </h1>
        <p className="text-text-secondary">
          {getGreeting()}，{user?.name}！我是您的专属{user?.department}部成长助手，有任何问题都可以问我 💪
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-background rounded-2xl mb-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-xl font-semibold mb-2">开始与 AI 助手对话</h2>
            <p className="text-text-secondary max-w-md mx-auto">
              我可以帮助您：
              <br />• 解答工作相关问题
              <br />• 提供学习建议和资源
              <br />• 职业规划指导
              <br />• 情绪支持和压力疏导
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleSend('如何高效完成工作任务？')}
                className="px-4 py-2 bg-surface border border-border rounded-lg hover:border-primary transition text-sm"
              >
                如何高效完成工作任务？
              </button>
              <button
                onClick={() => handleSend('推荐一些学习资源')}
                className="px-4 py-2 bg-surface border border-border rounded-lg hover:border-primary transition text-sm"
              >
                推荐一些学习资源
              </button>
              <button
                onClick={() => handleSend('如何与导师有效沟通？')}
                className="px-4 py-2 bg-surface border border-border rounded-lg hover:border-primary transition text-sm"
              >
                如何与导师有效沟通？
              </button>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{animationDelay: '200ms'}} />
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{animationDelay: '400ms'}} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-error text-sm mb-4">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-4 bg-surface rounded-2xl border border-border">
        <ChatInput onSend={handleSend} onClear={handleClear} disabled={loading} />
      </div>
    </div>
  );
}
