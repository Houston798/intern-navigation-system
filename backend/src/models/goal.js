import { v4 as uuidv4 } from 'uuid';

export const goals = new Map();

export function createGoal(goalData) {
  const goal = {
    id: uuidv4(),
    ...goalData,
    status: 'pending',
    progress: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  goals.set(goal.id, goal);
  return goal;
}

export function getGoalsByUser(userId) {
  return Array.from(goals.values()).filter(g => g.user_id === userId);
}

export function getGoalsByMentor(mentorId) {
  return Array.from(goals.values()).filter(g => g.mentor_id === mentorId);
}

export function getGoalById(id) {
  return goals.get(id);
}

export function updateGoal(id, updates) {
  const goal = goals.get(id);
  if (!goal) return null;
  
  const updated = { 
    ...goal, 
    ...updates, 
    updated_at: new Date().toISOString() 
  };
  
  // 自动计算进度
  if (updates.task_count !== undefined && updates.completed_count !== undefined) {
    updated.progress = updates.task_count > 0 
      ? Math.round((updates.completed_count / updates.task_count) * 100) 
      : 0;
  }
  
  // 自动更新状态
  if (updated.progress === 100) {
    updated.status = 'completed';
  } else if (updated.progress > 0) {
    updated.status = 'in_progress';
  }
  
  goals.set(id, updated);
  return updated;
}

export function deleteGoal(id) {
  return goals.delete(id);
}

export function getAllGoals() {
  return Array.from(goals.values());
}
