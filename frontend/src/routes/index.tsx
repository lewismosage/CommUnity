import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Events from '../pages/Events';
import Groups from '../pages/Groups';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Messages from '../pages/Messages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes - require authentication */}
      <Route 
        path="/create-event" 
        element={
          <ProtectedRoute requireAuth={true}>
            <Events />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create-group" 
        element={
          <ProtectedRoute requireAuth={true}>
            <Groups />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/messages" 
        element={
          <ProtectedRoute requireAuth>
            <Messages />
          </ProtectedRoute>
        } 
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}; 