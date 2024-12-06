import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService from '../../services/profileService';
import { addToast } from './toastSlice';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  organizer: {
    id: string;
    name: string;
  };
  capacity: number;
  attendees: number;
  date: string;
  image?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

interface ProfileState {
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    location: string;
    interests: string[];
    joinedDate: string;
    profileStats: {
      posts: number;
      events: number;
      groups: number;
      connections: number;
    };
  } | null;
  posts: any[];
  events: Event[];
  groups: Group[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  posts: [],
  events: [],
  groups: [],
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (username: string, { rejectWithValue }) => {
    try {
      const data = await profileService.getProfile(username);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ userId, data }: { userId: string; data: any }, { dispatch, rejectWithValue }) => {
    try {
      const response = await profileService.updateProfile(userId, data);
      dispatch(addToast({ type: 'success', message: 'Profile updated successfully' }));
      return response;
    } catch (error: any) {
      dispatch(addToast({ type: 'error', message: error.response?.data?.message || 'Failed to update profile' }));
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchUserEvents = createAsyncThunk(
  'profile/fetchUserEvents',
  async (userId: string, { rejectWithValue }) => {
    try {
      const data = await profileService.getUserEvents(userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user events');
    }
  }
);

export const fetchUserGroups = createAsyncThunk(
  'profile/fetchUserGroups',
  async (userId: string, { rejectWithValue }) => {
    try {
      const data = await profileService.getUserGroups(userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user groups');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An error occurred';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile = { ...state.profile, ...action.payload };
        }
      })
      .addCase(fetchUserEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An error occurred';
      })
      .addCase(fetchUserGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchUserGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An error occurred';
      });
  },
});

export default profileSlice.reducer; 