import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// 注册
router.post('/register', register);

// 登录
router.post('/login', login);

// 获取个人信息
router.get('/profile', authMiddleware, getProfile);

// 更新个人信息
router.put('/profile', authMiddleware, updateProfile);

export default router;
