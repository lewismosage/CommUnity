import api from './api';
import { Settings } from '../store/slices/settingsSlice';

const settingsService = {
  async getSettings() {
    try {
      const response = await api.get('/api/settings');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateSettings(data: Partial<Settings>) {
    try {
      const response = await api.put('/api/settings', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteAccount(password: string) {
    try {
      const response = await api.post('/api/settings/account/delete', { password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default settingsService; 