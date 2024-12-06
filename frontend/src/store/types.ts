import { AuthState } from './slices/authSlice';
import { SettingsState } from './slices/settingsSlice';

export interface RootState {
    auth: AuthState;
    settings: SettingsState;
    // ... other state slices
} 