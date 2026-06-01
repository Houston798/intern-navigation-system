import deepseekService from '../ai/deepseekService.js';
import { getInternBasePrompt, getSummerIntern追加Prompt, getDailyIntern追加Prompt } from '../ai/prompts/internPrompts.js';
import { getMentorPrompt } from '../ai/prompts/mentorPrompts.js';
import { getHRPrompt } from '../ai/prompts/hrPrompts.js';
import { addMessage, getHistory, clearHistory } from '../services/chatHistoryService.js';

function calculateRemainingDays(endDate) {
  if (!endDate) return 90;
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function buildSystemPrompt(user) {
  // 实习生角色
  if (user.role === 'intern') {
    const basePrompt = getInternBasePrompt(user);
    const remainingDays = calculateRemainingDays(user.end_date);
    
    // 根据实习类型追加不同提示
    if (user.intern_type === 'summer') {
      return basePrompt + getSummerIntern追加Prompt(remainingDays);
    } else {
      return basePrompt + getDailyIntern追加Prompt();
    }
  }
  
  // 导师角色
  if (user.role === 'mentor') {
    return getMentorPrompt();
  }
  
  // HR 角色
  if (user.role === 'hr') {
    return getHRPrompt();
  }
  
  // 默认提示词
  return '你是一个有帮助的AI助手。';
}

export async function chat(req, res) {
  try {
    const { message, temperature, maxTokens } = req.body;
    const user = req.user;
    
    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }
    
    if (message.length > 2000) {
      return res.status(400).json({ error: '消息过长，请控制在2000字以内' });
    }
    
    // 添加用户消息到历史
    addMessage(user.id, 'user', message);
    
    // 构建系统提示词
    const systemPrompt = buildSystemPrompt(user);
    
    // 获取对话历史
    const history = getHistory(user.id);
    
    // 构建消息列表
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map(m => ({ role: m.role, content: m.content }))
    ];
    
    // 调用 DeepSeek
    const response = await deepseekService.chat(messages, {
      temperature: temperature || 0.7,
      maxTokens: maxTokens || 1500
    });
    
    // 添加 AI 响应到历史
    addMessage(user.id, 'assistant', response);
    
    res.json({ 
      response,
      history: getHistory(user.id)
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: error.message || 'AI 服务暂时不可用，请稍后重试' 
    });
  }
}

export async function clearChat(req, res) {
  try {
    clearHistory(req.user.id);
    res.json({ 
      message: '对话历史已清除',
      success: true
    });
  } catch (error) {
    console.error('Clear chat error:', error);
    res.status(500).json({ error: '清除对话历史失败' });
  }
}

export async function getChatHistory(req, res) {
  try {
    const history = getHistory(req.user.id);
    res.json({ 
      history,
      count: history.length
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: '获取对话历史失败' });
  }
}
