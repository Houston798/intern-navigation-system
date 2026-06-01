import { v4 as uuidv4 } from 'uuid';

const onboardingProgress = new Map();

export function getProgress(userId) {
  return onboardingProgress.get(userId) || {
    userId,
    currentStep: 1,
    completedSteps: [],
    startedAt: null,
    completedAt: null
  };
}

export function updateProgress(userId, step) {
  const progress = getProgress(userId);
  
  // 如果步骤已完成，不重复添加
  if (progress.completedSteps.includes(step)) {
    return progress;
  }
  
  // 记录开始时间
  if (!progress.startedAt) {
    progress.startedAt = new Date().toISOString();
  }
  
  // 添加完成的步骤
  progress.completedSteps.push(step);
  
  // 更新当前步骤（前进到下一步）
  progress.currentStep = Math.max(progress.currentStep, step + 1);
  
  // 如果所有步骤都完成，记录完成时间
  if (progress.completedSteps.length === 6) {
    progress.completedAt = new Date().toISOString();
  }
  
  onboardingProgress.set(userId, progress);
  return progress;
}

export function resetProgress(userId) {
  onboardingProgress.delete(userId);
  return getProgress(userId);
}

export function getOnboardingStats() {
  const allProgress = Array.from(onboardingProgress.values());
  return {
    totalStarted: allProgress.length,
    totalCompleted: allProgress.filter(p => p.completedAt).length,
    averageStep: allProgress.length > 0 
      ? allProgress.reduce((sum, p) => sum + p.completedSteps.length, 0) / allProgress.length 
      : 0
  };
}
