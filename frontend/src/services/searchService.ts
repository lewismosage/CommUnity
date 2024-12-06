import axios from 'axios';
import { API_URL } from '../config';
import { SearchType } from '../types/search';

export const SearchService = {
  async search(query: string, type?: SearchType) {
    const params = new URLSearchParams({ query });
    if (type && type !== 'all') {
      params.append('type', type);
    }
    
    const response = await axios.get(`${API_URL}/search?${params.toString()}`);
    return response.data;
  },
};

export default SearchService; 