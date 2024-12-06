import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SearchService } from '../../services/searchService';
import { SearchState, SearchType } from '../../types/search';

const initialState: SearchState = {
  type: 'all',
  query: '',
  results: {
    users: [],
    events: [],
    groups: [],
  },
  loading: false,
  error: null,
};

interface SearchParams {
  query: string;
  type?: SearchType;
}

export const search = createAsyncThunk(
  'search/performSearch',
  async ({ query, type }: SearchParams) => {
    return await SearchService.search(query, type);
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchType: (state, action) => {
      state.type = action.payload;
    },
    clearResults: (state) => {
      state.results = initialState.results;
      state.query = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(search.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { setSearchType, clearResults } = searchSlice.actions;
export default searchSlice.reducer; 