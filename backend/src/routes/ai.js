import { Router } from 'express';
import { chat, clearChat, getChatHistory } from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// 所有 AI 路由都需要认证
router.use(authMiddleware);

// AI 对话
router.post('/chat', chat);

// 获取对话历史
router.get('/history', getChatHistory);

// 清除对话历史
router.delete('/chat', clearChat);

export default router;
