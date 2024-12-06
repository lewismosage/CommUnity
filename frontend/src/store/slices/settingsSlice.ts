import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import settingsService from '../../services/settingsService';
import { addToast } from './toastSlice';

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  notifications_enabled: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  location_sharing: boolean;
  two_factor_enabled: boolean;
  [key: string]: boolean | string;
}

export interface SettingsState {
  settings: Settings | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null
};

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await settingsService.getSettings();
      return settings;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch settings');
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (data: Partial<Settings>, { dispatch, rejectWithValue }) => {
    try {
      const settings = await settingsService.updateSettings(data);
      dispatch(addToast({ type: 'success', message: 'Settings updated successfully' }));
      return settings;
    } catch (error: any) {
      dispatch(addToast({ type: 'error', message: error.response?.data?.message || 'Failed to update settings' }));
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'settings/deleteAccount',
  async (password: string, { dispatch, rejectWithValue }) => {
    try {
      await settingsService.deleteAccount(password);
      return true;
    } catch (error: any) {
      dispatch(addToast({ type: 'error', message: error.response?.data?.message || 'Failed to delete account' }));
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      });
  }
});

export default settingsSlice.reducer; 