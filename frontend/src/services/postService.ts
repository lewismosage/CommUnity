import axios from 'axios';
import { API_URL } from '../config';

export const PostService = {
  async getPosts() {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  async createPost(data: { content: string }) {
    const response = await axios.post(`${API_URL}/posts`, data);
    return response.data;
  },

  async likePost(postId: string) {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`);
    return response.data;
  },

  async commentOnPost(postId: string, content: string) {
    const response = await axios.post(`${API_URL}/posts/${postId}/comments`, { content });
    return response.data;
  },
}; 