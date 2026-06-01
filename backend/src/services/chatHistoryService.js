import { v4 as uuidv4 } from 'uuid';

const chatHistories = new Map();

export function addMessage(userId, role, content) {
  if (!chatHistories.has(userId)) {
    chatHistories.set(userId, []);
  }
  
  const history = chatHistories.get(userId);
  
  history.push({
    id: uuidv4(),
    role,
    content,
    timestamp: new Date().toISOString()
  });
  
  // 保留最近20条消息（避免上下文过长）
  if (history.length > 20) {
    chatHistories.set(userId, history.slice(-20));
  }
}

export function getHistory(userId) {
  return chatHistories.get(userId) || [];
}

export function clearHistory(userId) {
  chatHistories.delete(userId);
}

export function getHistoryCount(userId) {
  const history = chatHistories.get(userId) || [];
  return history.length;
}
