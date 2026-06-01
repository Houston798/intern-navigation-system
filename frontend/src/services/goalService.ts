import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const goalService = {
  async getGoals() {
    const response = await axios.get('/api/goals', { headers: getAuthHeader() });
    return response.data;
  },

  async getGoal(id: string) {
    const response = await axios.get(`/api/goals/${id}`, { headers: getAuthHeader() });
    return response.data;
  },

  async createGoal(data: {
    title: string;
    description?: string;
    deadline?: string;
    user_id?: string;
  }) {
    const response = await axios.post('/api/goals', data, { headers: getAuthHeader() });
    return response.data;
  },

  async updateGoal(id: string, data: any) {
    const response = await axios.put(`/api/goals/${id}`, data, { headers: getAuthHeader() });
    return response.data;
  },

  async deleteGoal(id: string) {
    const response = await axios.delete(`/api/goals/${id}`, { headers: getAuthHeader() });
    return response.data;
  }
};

export const taskService = {
  async getTasks(params?: { goal_id?: string; user_id?: string }) {
    const response = await axios.get('/api/tasks', { 
      params,
      headers: getAuthHeader() 
    });
    return response.data;
  },

  async getTask(id: string) {
    const response = await axios.get(`/api/tasks/${id}`, { headers: getAuthHeader() });
    return response.data;
  },

  async createTask(data: {
    title: string;
    description?: string;
    goal_id?: string;
    deadline?: string;
    status?: string;
  }) {
    const response = await axios.post('/api/tasks', data, { headers: getAuthHeader() });
    return response.data;
  },

  async updateTask(id: string, data: any) {
    const response = await axios.put(`/api/tasks/${id}`, data, { headers: getAuthHeader() });
    return response.data;
  },

  async deleteTask(id: string) {
    const response = await axios.delete(`/api/tasks/${id}`, { headers: getAuthHeader() });
    return response.data;
  },

  async toggleTaskStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const response = await axios.put(`/api/tasks/${id}`, { status: newStatus }, { 
      headers: getAuthHeader() 
    });
    return response.data;
  }
};
