import axios from 'axios';

const API_BASE = '/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(data: {
    email: string;
    password: string;
    role: string;
    name: string;
    department: string;
    mbti?: string;
    intern_type?: string;
    experience?: string;
    mentor_key?: string;
    hr_key?: string;
  }) {
    const response = await axios.post(`${API_BASE}/auth/register`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async getProfile() {
    const response = await axios.get(`${API_BASE}/auth/profile`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async updateProfile(data: any) {
    const response = await axios.put(`${API_BASE}/auth/profile`, data, {
      headers: getAuthHeader()
    });
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
