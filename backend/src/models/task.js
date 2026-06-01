import { v4 as uuidv4 } from 'uuid';

export const tasks = new Map();

export function createTask(taskData) {
  const task = {
    id: uuidv4(),
    ...taskData,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    completion_date: null
  };
  tasks.set(task.id, task);
  return task;
}

export function getTasksByGoal(goalId) {
  return Array.from(tasks.values()).filter(t => t.goal_id === goalId);
}

export function getTasksByUser(userId) {
  return Array.from(tasks.values()).filter(t => t.user_id === userId);
}

export function getTaskById(id) {
  return tasks.get(id);
}

export function updateTask(id, updates) {
  const task = tasks.get(id);
  if (!task) return null;
  
  const updated = { 
    ...task, 
    ...updates, 
    updated_at: new Date().toISOString() 
  };
  
  // 如果标记为完成，设置完成时间
  if (updates.status === 'completed' && task.status !== 'completed') {
    updated.completion_date = new Date().toISOString();
  }
  
  // 如果重新打开，清除完成时间
  if (updates.status !== 'completed' && task.status === 'completed') {
    updated.completion_date = null;
  }
  
  tasks.set(id, updated);
  return updated;
}

export function deleteTask(id) {
  return tasks.delete(id);
}

export function getTasksByStatus(userId, status) {
  return Array.from(tasks.values()).filter(t => 
    t.user_id === userId && t.status === status
  );
}

export function getAllTasks() {
  return Array.from(tasks.values());
}
