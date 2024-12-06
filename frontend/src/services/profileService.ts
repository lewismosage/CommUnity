import api from './api';

interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  interests?: string[];
}

const profileService = {
  async getProfile(username: string) {
    try {
      console.log(`Fetching profile for ${username}`);
      const response = await api.get(`/api/profiles/${username}`);
      console.log('Profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  async updateProfile(userId: string, data: ProfileUpdateData) {
    try {
      console.log('Updating profile:', { userId, data });
      const response = await api.put(`/api/profiles/${userId}`, data);
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  async getUserPosts(username: string) {
    try {
      const response = await api.get(`/api/profiles/${username}/posts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserEvents(username: string) {
    try {
      const response = await api.get(`/api/profiles/${username}/events`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserGroups(username: string) {
    try {
      const response = await api.get(`/api/profiles/${username}/groups`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default profileService; 