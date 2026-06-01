import { createTask, getTasksByGoal, getTasksByUser, getTaskById, updateTask, deleteTask } from '../models/task.js';
import { updateGoal } from '../models/goal.js';

export function getTasks(req, res) {
  try {
    const { goal_id, user_id } = req.query;
    
    let tasks;
    if (goal_id) {
      tasks = getTasksByGoal(goal_id);
    } else if (user_id) {
      tasks = getTasksByUser(user_id);
    } else {
      tasks = getTasksByUser(req.user.id);
    }
    
    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: '获取任务列表失败' });
  }
}

export function getTask(req, res) {
  try {
    const task = getTaskById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: '任务不存在' });
    }
    
    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: '获取任务详情失败' });
  }
}

export function create(req, res) {
  try {
    const user = req.user;
    const { title, description, goal_id, deadline, status } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: '任务标题不能为空' });
    }
    
    const taskData = {
      title,
      description: description || '',
      goal_id: goal_id || null,
      user_id: user.id,
      deadline: deadline || null,
      status: status || 'pending'
    };
    
    const task = createTask(taskData);
    
    // 如果有关联目标，更新目标进度
    if (goal_id) {
      updateGoalProgress(goal_id);
    }
    
    res.status(201).json({ 
      message: '任务创建成功',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: '创建任务失败' });
  }
}

export function update(req, res) {
  try {
    const taskId = req.params.id;
    const updates = req.body;
    
    // 移除不允许更新的字段
    delete updates.id;
    delete updates.created_at;
    
    const oldTask = getTaskById(taskId);
    if (!oldTask) {
      return res.status(404).json({ error: '任务不存在' });
    }
    
    const updatedTask = updateTask(taskId, updates);
    
    // 如果状态改变，更新目标进度
    if (oldTask.goal_id && updates.status) {
      updateGoalProgress(oldTask.goal_id);
    }
    
    res.json({ 
      message: '任务更新成功',
      task: updatedTask
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: '更新任务失败' });
  }
}

export function remove(req, res) {
  try {
    const taskId = req.params.id;
    const task = getTaskById(taskId);
    
    if (!task) {
      return res.status(404).json({ error: '任务不存在' });
    }
    
    const goalId = task.goal_id;
    const deleted = deleteTask(taskId);
    
    // 如果有关联目标，更新目标进度
    if (goalId) {
      updateGoalProgress(goalId);
    }
    
    res.json({ message: '任务删除成功' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: '删除任务失败' });
  }
}

function updateGoalProgress(goalId) {
  const goalTasks = getTasksByGoal(goalId);
  const completedCount = goalTasks.filter(t => t.status === 'completed').length;
  
  updateGoal(goalId, {
    task_count: goalTasks.length,
    completed_count: completedCount
  });
}
