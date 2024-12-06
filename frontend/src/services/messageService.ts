import axios from 'axios';
import { API_URL } from '../config';

export const MessageService = {
  async getConversations() {
    const response = await axios.get(`${API_URL}/conversations`);
    return response.data;
  },

  async getConversation(id: string) {
    const response = await axios.get(`${API_URL}/conversations/${id}`);
    return response.data;
  },

  async sendMessage(conversationId: string, content: string) {
    const response = await axios.post(`${API_URL}/messages`, {
      conversationId,
      content,
    });
    return response.data;
  },

  async createConversation(userId: string) {
    const response = await axios.post(`${API_URL}/conversations`, {
      userId,
    });
    return response.data;
  },
}; 