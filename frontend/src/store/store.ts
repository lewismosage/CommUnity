import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import groupReducer from './slices/groupSlice';
import messageReducer from './slices/messageSlice';
import notificationReducer from './slices/notificationSlice';
import postReducer from './slices/postSlice';
import profileReducer from './slices/profileSlice';
import searchReducer from './slices/searchSlice';
import toastReducer from './slices/toastSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    groups: groupReducer,
    messages: messageReducer,
    notifications: notificationReducer,
    posts: postReducer,
    profile: profileReducer,
    search: searchReducer,
    toast: toastReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 