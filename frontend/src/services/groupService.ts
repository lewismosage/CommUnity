import api from './api';
import { Group } from '../types';

export const GroupService = {
  async getGroups() {
    const response = await api.get('/groups');
    return response.data;
  },

  async getGroup(id: string) {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  },

  async createGroup(data: Partial<Group>) {
    const response = await api.post('/groups', data);
    return response.data;
  },

  async joinGroup(groupId: string) {
    const response = await api.post(`/groups/${groupId}/join`);
    return response.data;
  },

  async leaveGroup(groupId: string) {
    const response = await api.post(`/groups/${groupId}/leave`);
    return response.data;
  },
}; 