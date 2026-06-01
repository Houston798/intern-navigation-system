import { createGoal, getGoalsByUser, getGoalsByMentor, getGoalById, updateGoal, deleteGoal, getAllGoals } from '../models/goal.js';
import { getTasksByGoal } from '../models/task.js';

export function getGoals(req, res) {
  try {
    const user = req.user;
    let goals;
    
    if (user.role === 'intern') {
      goals = getGoalsByUser(user.id);
    } else if (user.role === 'mentor') {
      goals = getGoalsByMentor(user.id);
    } else if (user.role === 'hr') {
      goals = getAllGoals();
    } else {
      goals = getGoalsByUser(user.id);
    }
    
    // 为每个目标添加任务统计
    const goalsWithStats = goals.map(goal => {
      const goalTasks = getTasksByGoal(goal.id);
      const completedTasks = goalTasks.filter(t => t.status === 'completed');
      
      return {
        ...goal,
        tasks: goalTasks,
        task_count: goalTasks.length,
        completed_count: completedTasks.length
      };
    });
    
    res.json({ goals: goalsWithStats });
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ error: '获取目标列表失败' });
  }
}

export function getGoal(req, res) {
  try {
    const goal = getGoalById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({ error: '目标不存在' });
    }
    
    const goalTasks = getTasksByGoal(goal.id);
    const completedTasks = goalTasks.filter(t => t.status === 'completed');
    
    res.json({ 
      goal: {
        ...goal,
        tasks: goalTasks,
        task_count: goalTasks.length,
        completed_count: completedTasks.length
      }
    });
  } catch (error) {
    console.error('Get goal error:', error);
    res.status(500).json({ error: '获取目标详情失败' });
  }
}

export function create(req, res) {
  try {
    const user = req.user;
    const { title, description, deadline } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: '目标标题不能为空' });
    }
    
    const goalData = {
      title,
      description: description || '',
      deadline: deadline || null,
      user_id: user.role === 'intern' ? user.id : req.body.user_id,
      mentor_id: user.role === 'mentor' ? user.id : req.body.mentor_id
    };
    
    const goal = createGoal(goalData);
    
    res.status(201).json({ 
      message: '目标创建成功',
      goal 
    });
  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({ error: '创建目标失败' });
  }
}

export function update(req, res) {
  try {
    const goalId = req.params.id;
    const updates = req.body;
    
    // 移除不允许更新的字段
    delete updates.id;
    delete updates.created_at;
    
    const updatedGoal = updateGoal(goalId, updates);
    
    if (!updatedGoal) {
      return res.status(404).json({ error: '目标不存在' });
    }
    
    res.json({ 
      message: '目标更新成功',
      goal: updatedGoal
    });
  } catch (error) {
    console.error('Update goal error:', error);
    res.status(500).json({ error: '更新目标失败' });
  }
}

export function remove(req, res) {
  try {
    const goalId = req.params.id;
    const deleted = deleteGoal(goalId);
    
    if (!deleted) {
      return res.status(404).json({ error: '目标不存在' });
    }
    
    res.json({ message: '目标删除成功' });
  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({ error: '删除目标失败' });
  }
}
