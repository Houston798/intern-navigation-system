import { getProgress, updateProgress, resetProgress } from '../models/onboarding.js';
import { updateUser } from '../models/user.js';

export function getOnboardingStatus(req, res) {
  try {
    const progress = getProgress(req.user.id);
    
    res.json({
      progress,
      isCompleted: progress.completedSteps.length === 6,
      totalSteps: 6,
      currentStep: progress.currentStep,
      completedSteps: progress.completedSteps
    });
  } catch (error) {
    console.error('Get onboarding status error:', error);
    res.status(500).json({ error: '获取Onboarding状态失败' });
  }
}

export function completeStep(req, res) {
  try {
    const { step } = req.params;
    const stepNum = parseInt(step);
    
    // 验证步骤有效性
    if (isNaN(stepNum) || stepNum < 1 || stepNum > 6) {
      return res.status(400).json({ 
        error: '无效的步骤',
        message: '步骤必须是1-6之间的数字'
      });
    }
    
    const progress = updateProgress(req.user.id, stepNum);
    
    // 如果步骤6完成，更新用户的onboarding状态
    if (stepNum === 6 && progress.completedSteps.includes(6)) {
      updateUser(req.user.id, { onboarding_completed: true });
    }
    
    res.json({
      message: `步骤 ${stepNum} 完成`,
      progress,
      isCompleted: progress.completedSteps.length === 6
    });
  } catch (error) {
    console.error('Complete onboarding step error:', error);
    res.status(500).json({ error: '完成Onboarding步骤失败' });
  }
}

export function resetOnboarding(req, res) {
  try {
    const progress = resetProgress(req.user.id);
    updateUser(req.user.id, { onboarding_completed: false });
    
    res.json({
      message: 'Onboarding进度已重置',
      progress
    });
  } catch (error) {
    console.error('Reset onboarding error:', error);
    res.status(500).json({ error: '重置Onboarding失败' });
  }
}

export function getOnboardingGuide(req, res) {
  try {
    const { role } = req.user;
    
    const guide = {
      intern: {
        title: '实习生 On Boarding 指南',
        steps: [
          {
            step: 1,
            title: '欢迎确认',
            description: '确认您的基本信息和实习岗位',
            icon: '👋',
            estimatedTime: '2分钟'
          },
          {
            step: 2,
            title: '工作台导览',
            description: '了解平台6个核心模块功能',
            icon: '🚀',
            estimatedTime: '3分钟'
          },
          {
            step: 3,
            title: '工作目标展示',
            description: '查看导师设定的初始工作目标',
            icon: '🎯',
            estimatedTime: '2分钟'
          },
          {
            step: 4,
            title: 'AI助手体验',
            description: '体验AI助手的神奇功能',
            icon: '🤖',
            estimatedTime: '3分钟'
          },
          {
            step: 5,
            title: '实习计划激活',
            description: '激活您的实习倒计时',
            icon: '⏱️',
            estimatedTime: '1分钟'
          },
          {
            step: 6,
            title: '完成准备',
            description: '一切准备就绪，开始实习之旅',
            icon: '✨',
            estimatedTime: '1分钟'
          }
        ]
      },
      mentor: {
        title: '导师 On Boarding 指南',
        steps: [
          {
            step: 1,
            title: '账号设置',
            description: '完善导师信息和带教偏好',
            icon: '👤',
            estimatedTime: '3分钟'
          },
          {
            step: 2,
            title: '实习生管理',
            description: '了解如何管理您的实习生',
            icon: '👥',
            estimatedTime: '5分钟'
          },
          {
            step: 3,
            title: 'AI助手功能',
            description: '学习使用AI辅助带教',
            icon: '🤖',
            estimatedTime: '5分钟'
          }
        ]
      },
      hr: {
        title: 'HR On Boarding 指南',
        steps: [
          {
            step: 1,
            title: '数据分析概览',
            description: '了解数据分析功能',
            icon: '📊',
            estimatedTime: '5分钟'
          },
          {
            step: 2,
            title: '密钥管理',
            description: '学习管理各端密钥',
            icon: '🔑',
            estimatedTime: '3分钟'
          },
          {
            step: 3,
            title: '招聘标准',
            description: '设置和优化招聘标准',
            icon: '📋',
            estimatedTime: '5分钟'
          }
        ]
      }
    };
    
    res.json({
      guide: guide[role] || guide.intern
    });
  } catch (error) {
    console.error('Get onboarding guide error:', error);
    res.status(500).json({ error: '获取Onboarding指南失败' });
  }
}
