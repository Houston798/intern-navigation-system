import { Router } from 'express';
import { getOnboardingStatus, completeStep, resetOnboarding, getOnboardingGuide } from '../controllers/onboardingController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// 所有 Onboarding 路由都需要认证
router.use(authMiddleware);

// 获取 Onboarding 状态
router.get('/status', getOnboardingStatus);

// 获取 Onboarding 指南
router.get('/guide', getOnboardingGuide);

// 完成步骤
router.post('/step/:step', completeStep);

// 重置 Onboarding 进度
router.post('/reset', resetOnboarding);

export default router;
