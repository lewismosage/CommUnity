import axios from 'axios';
import { API_URL } from '../config';

export const NotificationService = {
  async getNotifications() {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  },

  async markAsRead(notificationId: string) {
    const response = await axios.patch(`${API_URL}/notifications/${notificationId}/read`);
    return response.data;
  },

  async markAllAsRead() {
    const response = await axios.patch(`${API_URL}/notifications/read-all`);
    return response.data;
  },
}; 