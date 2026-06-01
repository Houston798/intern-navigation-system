import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const onboardingService = {
  async getStatus() {
    const response = await axios.get('/api/onboarding/status', {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async getGuide() {
    const response = await axios.get('/api/onboarding/guide', {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async completeStep(step: number) {
    const response = await axios.post(`/api/onboarding/step/${step}`, {}, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async reset() {
    const response = await axios.post('/api/onboarding/reset', {}, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};
