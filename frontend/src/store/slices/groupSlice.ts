import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';
import { Group } from '../../types';

interface GroupState {
  groups: Group[];
  currentGroup: Group | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null,
  loading: false,
  error: null,
};

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async () => {
    const response = await axios.get(`${API_URL}/groups`);
    return response.data;
  }
);

export const fetchGroupById = createAsyncThunk(
  'groups/fetchGroupById',
  async (groupId: string) => {
    const response = await axios.get(`${API_URL}/groups/${groupId}`);
    return response.data;
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData: Omit<Group, 'id' | 'members' | 'memberCount' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post(`${API_URL}/groups`, groupData);
    return response.data;
  }
);

export const joinGroup = createAsyncThunk(
  'groups/joinGroup',
  async (groupId: string) => {
    const response = await axios.post(`${API_URL}/groups/${groupId}/join`);
    return response.data;
  }
);

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch groups';
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.currentGroup = action.payload;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.unshift(action.payload);
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        const updatedGroup = action.payload;
        state.groups = state.groups.map(group =>
          group.id === updatedGroup.id ? updatedGroup : group
        );
        if (state.currentGroup?.id === updatedGroup.id) {
          state.currentGroup = updatedGroup;
        }
      });
  },
});

export default groupSlice.reducer; 