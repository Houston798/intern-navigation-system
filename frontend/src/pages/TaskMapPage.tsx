import { useState, useEffect } from 'react';
import { FaPlus, FaCheck, FaClock, FaTarget, FaTrash } from 'react-icons/fa';
import { goalService, taskService } from '../../services/goalService';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  deadline?: string;
  created_at: string;
  completion_date?: string;
}

interface Goal {
  id: string;
  title: string;
  description?: string;
  status: string;
  deadline?: string;
  progress: number;
  task_count: number;
  completed_count: number;
  tasks: Task[];
}

export default function TaskMapPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');
  const [showAddTask, setShowAddTask] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await goalService.getGoals();
      setGoals(data.goals || []);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || '加载目标失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    if (!newGoalTitle.trim()) return;
    
    try {
      await goalService.createGoal({
        title: newGoalTitle,
        description: newGoalDesc
      });
      setNewGoalTitle('');
      setNewGoalDesc('');
      setShowCreateGoal(false);
      await loadGoals();
    } catch (err: any) {
      setError(err.response?.data?.error || '创建目标失败');
    }
  };

  const handleAddTask = async (goalId: string) => {
    if (!newTaskTitle.trim()) return;
    
    try {
      await taskService.createTask({
        title: newTaskTitle,
        goal_id: goalId
      });
      setNewTaskTitle('');
      setShowAddTask(null);
      await loadGoals();
    } catch (err: any) {
      setError(err.response?.data?.error || '添加任务失败');
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      await taskService.toggleTaskStatus(task.id, task.status);
      await loadGoals();
    } catch (err: any) {
      setError(err.response?.data?.error || '更新任务失败');
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!window.confirm('确定要删除这个目标吗？')) return;
    
    try {
      await goalService.deleteGoal(goalId);
      await loadGoals();
    } catch (err: any) {
      setError(err.response?.data?.error || '删除目标失败');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in_progress': return 'bg-primary';
      default: return 'bg-border';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in_progress': return '进行中';
      default: return '待开始';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-secondary">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <FaTarget className="text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              任务地图
            </span>
          </h1>
          <p className="text-text-secondary mt-1">
            管理您的工作目标，追踪任务进度
          </p>
        </div>
        <button
          onClick={() => setShowCreateGoal(true)}
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
        >
          <FaPlus />
          <span>新建目标</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Create Goal Modal */}
      {showCreateGoal && (
        <div className="bg-surface rounded-2xl p-6 border border-border">
          <h3 className="font-semibold mb-4">创建新目标</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">目标标题 *</label>
              <input
                type="text"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                placeholder="例如：掌握React基础知识"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">目标描述</label>
              <textarea
                value={newGoalDesc}
                onChange={(e) => setNewGoalDesc(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none resize-none"
                rows={3}
                placeholder="详细描述这个目标..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreateGoal(false)}
                className="px-6 py-2 bg-surface border border-border rounded-xl hover:border-primary transition"
              >
                取消
              </button>
              <button
                onClick={handleCreateGoal}
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold"
              >
                创建目标
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="bg-surface rounded-2xl p-12 border border-border text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold mb-2">暂无工作目标</h2>
          <p className="text-text-secondary mb-6">
            创建您的第一个工作目标，开始规划和追踪任务
          </p>
          <button
            onClick={() => setShowCreateGoal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold"
          >
            创建第一个目标
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-surface rounded-2xl p-6 border border-border">
              {/* Goal Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                  {goal.description && (
                    <p className="text-text-secondary text-sm mb-2">{goal.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <FaCheck className="text-success" />
                      {goal.completed_count}/{goal.task_count} 任务
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(goal.status)} text-white`}>
                      {getStatusText(goal.status)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-text-secondary hover:text-error transition p-2"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>进度</span>
                  <span className="font-semibold">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2 mb-4">
                {goal.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-background rounded-lg group"
                  >
                    <button
                      onClick={() => handleToggleTask(task)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                        task.status === 'completed'
                          ? 'bg-success border-success'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {task.status === 'completed' && (
                        <FaCheck className="text-white text-xs" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={task.status === 'completed' ? 'line-through text-text-secondary' : ''}>
                        {task.title}
                      </p>
                      {task.deadline && (
                        <span className="text-xs text-text-secondary flex items-center gap-1">
                          <FaClock />
                          截止：{new Date(task.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Task */}
              {showAddTask === goal.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="输入任务标题..."
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:border-primary outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask(goal.id)}
                  />
                  <button
                    onClick={() => handleAddTask(goal.id)}
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                  >
                    添加
                  </button>
                  <button
                    onClick={() => {
                      setShowAddTask(null);
                      setNewTaskTitle('');
                    }}
                    className="px-4 py-2 bg-surface border border-border rounded-lg"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddTask(goal.id)}
                  className="w-full py-2 border border-dashed border-border rounded-lg text-text-secondary hover:border-primary hover:text-primary transition flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  <span>添加任务</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
