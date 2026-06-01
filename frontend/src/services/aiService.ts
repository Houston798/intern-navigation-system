import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const aiService = {
  async chat(message: string, temperature?: number, maxTokens?: number) {
    const response = await axios.post('/api/ai/chat', 
      { message, temperature, maxTokens },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async getHistory() {
    const response = await axios.get('/api/ai/history', {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async clearHistory() {
    const response = await axios.delete('/api/ai/chat', {
      headers: getAuthHeader()
    });
    return response.data;
  }
};
